"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from 'next/image';

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [seasonal, setSeasonal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const trendingResponse = await fetch('https://api.jikan.moe/v4/top/anime?limit=5');
        if (!trendingResponse.ok) throw new Error('Failed to load trending anime');
        const trendingData = await trendingResponse.json();
        setTrending(trendingData.data);

        await new Promise(resolve => setTimeout(resolve, 1000));

        const popularResponse = await fetch('https://api.jikan.moe/v4/top/anime?limit=10');
        if (!popularResponse.ok) throw new Error('Failed to load popular anime');
        const popularData = await popularResponse.json();
        setPopular(popularData.data);

        await new Promise(resolve => setTimeout(resolve, 1000));

        const seasonalResponse = await fetch('https://api.jikan.moe/v4/seasons/now');
        if (!seasonalResponse.ok) throw new Error('Failed to load seasonal anime');
        const seasonalData = await seasonalResponse.json();
        setSeasonal(seasonalData.data);

      } catch (error) {
        console.error('Error loading data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % trending.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [trending.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % trending.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + trending.length) % trending.length);
  };

  const AnimeCard = ({ anime }) => (
    <Card className="w-[250px] flex-shrink-0">
      <CardContent className="p-0">
        <div className="relative h-[350px] group overflow-hidden">
          <div className="relative w-full h-full transform transition-transform duration-300 group-hover:scale-110">
            <Image
              src={anime.images?.jpg?.large_image_url || "/api/placeholder/250/350"}
              alt={anime.title}
              fill
              sizes="250px"
              className="object-cover rounded-t-lg"
              priority={false}
              quality={100}
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <h3 className="text-white font-semibold line-clamp-2">{anime.title}</h3>
            <p className="text-white/80 text-sm">Rating: {anime.score || 'N/A'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="container mx-auto p-4 space-y-8">
        <Skeleton className="w-full h-[400px] rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-[350px] rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>An error occurred: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-sm underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Carousel */}
      {trending.length > 0 && (
        <div className="relative h-[500px] rounded-lg overflow-hidden">
          <div className="relative w-full h-full">
            {trending.map((anime, index) => (
              <div
                key={anime.mal_id}
                className={`absolute w-full h-full transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={anime.images?.jpg?.large_image_url || "/api/placeholder/1200/500"}
                    alt={anime.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={true}
                    quality={100}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h1 className="text-5xl font-bold text-white mb-4">{anime.title}</h1>
                    <p className="text-white/90 text-lg max-w-3xl leading-relaxed">
                      {anime.synopsis ? anime.synopsis.substring(0, 200) + '...' : 'Description not available'}
                    </p>
                    <div className="mt-4 flex space-x-4">
                      <p className="text-white/90">
                        <span className="font-semibold">Rating:</span> {anime.score}/10
                      </p>
                      <p className="text-white/90">
                        <span className="font-semibold">Episodes:</span> {anime.episodes || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Carousel Controls */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
            onClick={nextSlide}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {trending.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Anime Categories */}
      <Tabs defaultValue="popular" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="seasonal">New Releases</TabsTrigger>
        </TabsList>

        <TabsContent value="popular">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-4 pb-4">
              {popular.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>

        <TabsContent value="seasonal">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-4 pb-4">
              {seasonal.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
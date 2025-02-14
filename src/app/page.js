"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Trophy, TrendingUp, Calendar, Play } from "lucide-react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [seasonal, setSeasonal] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
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

        await new Promise(resolve => setTimeout(resolve, 1000));

        const upcomingResponse = await fetch('https://api.jikan.moe/v4/seasons/upcoming');
        if (!upcomingResponse.ok) throw new Error('Failed to load upcoming anime');
        const upcomingData = await upcomingResponse.json();
        setUpcoming(upcomingData.data.slice(0, 10));

        await new Promise(resolve => setTimeout(resolve, 1000));

        const moviesResponse = await fetch('https://api.jikan.moe/v4/top/anime?type=movie&limit=10');
        if (!moviesResponse.ok) throw new Error('Failed to load top movies');
        const moviesData = await moviesResponse.json();
        setTopMovies(moviesData.data);

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

  const AnimeCard = ({ anime, priority = false }) => (
    <Card
      className="w-[250px] flex-shrink-0 cursor-pointer transform transition-all duration-300 hover:scale-105"
      onClick={() => router.push(`/animes/anime/${anime.mal_id}`)}
    >
      <CardContent className="p-0">
        <div className="relative h-[350px] group overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={anime.images?.jpg?.large_image_url || "/api/placeholder/250/350"}
              alt={anime.title}
              fill
              sizes="250px"
              className="object-cover rounded-t-lg"
              priority={priority}
              quality={100}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <h3 className="text-white font-semibold line-clamp-2">{anime.title}</h3>
            <div className="flex items-center space-x-2 mt-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-white/90 text-sm">{anime.score || 'N/A'}</span>
              {anime.episodes && (
                <span className="text-white/70 text-sm">• {anime.episodes} eps</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const SectionTitle = ({ icon: Icon, title }) => (
    <div className="flex items-center space-x-2 mb-4">
      <Icon className="w-6 h-6 text-primary" />
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
  );

  if (loading) {
    return (
      <div className="container mx-auto p-4 space-y-8">
        <Skeleton className="w-full h-[500px] rounded-lg" />
        <div className="space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="w-48 h-8" />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[...Array(5)].map((_, j) => (
                  <Skeleton key={j} className="h-[350px] rounded-lg" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-lg">
          <p>An error occurred: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-red-300 hover:text-red-100 underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="space-y-12 pb-12">
        {/* Hero Carousel */}
        {trending.length > 0 && (
          <div className="relative h-[600px]">
            <div className="relative w-full h-full">
              {trending.map((anime, index) => (
                <div
                  key={`trending-${anime.mal_id}-${index}`}
                  className={`absolute w-full h-full transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  onClick={() => router.push(`/animes/${anime.mal_id}`)}
                >
                  <div className="relative w-full h-full cursor-pointer">
                    <Image
                      src={anime.images?.jpg?.large_image_url || "/api/placeholder/1200/600"}
                      alt={anime.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      priority={true}
                      quality={100}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 container mx-auto">
                      <h1 className="text-6xl font-bold text-white mb-4">{anime.title}</h1>
                      <p className="text-white/90 text-xl max-w-3xl leading-relaxed mb-6">
                        {anime.synopsis ? anime.synopsis.substring(0, 200) + '...' : 'Description not available'}
                      </p>
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <Star className="w-6 h-6 text-yellow-400" />
                          <span className="text-white/90 text-lg">{anime.score}/10</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Play className="w-6 h-6 text-white/90" />
                          <span className="text-white/90 text-lg">{anime.episodes || 'N/A'} Episodes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

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

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {trending.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'
                    }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 space-y-12">
          {/* Popular Anime */}
          <section>
            <SectionTitle icon={Trophy} title="Most Popular" />
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-4 pb-4">
                {popular.map((anime, index) => (
                  <AnimeCard
                    key={`popular-${anime.mal_id}-${index}`}
                    anime={anime}
                    priority
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>

          {/* Currently Airing */}
          <section>
            <SectionTitle icon={TrendingUp} title="Currently Airing" />
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-4 pb-4">
                {seasonal.map((anime, index) => (
                  <AnimeCard
                    key={`seasonal-${anime.mal_id}-${index}`}
                    anime={anime}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>

          {/* Top Movies */}
          <section>
            <SectionTitle icon={Play} title="Top Anime Movies" />
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-4 pb-4">
                {topMovies.map((anime, index) => (
                  <AnimeCard
                    key={`movie-${anime.mal_id}-${index}`}
                    anime={anime}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>

          {/* Upcoming Releases */}
          <section>
            <SectionTitle icon={Calendar} title="Upcoming Releases" />
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-4 pb-4">
                {upcoming.map((anime, index) => (
                  <AnimeCard
                    key={`upcoming-${anime.mal_id}-${index}`}
                    anime={anime}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>
        </div>
      </div>
    </div>
  );
}
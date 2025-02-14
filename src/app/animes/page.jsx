"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star } from 'lucide-react';

export default function Animes() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState('alpha');

  useEffect(() => {
    fetchAnimes();
  }, [currentPage, sortOrder]);

  const fetchAnimes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let url = `https://api.jikan.moe/v4/anime?page=${currentPage}&limit=24`;
      
      if (searchQuery) {
        url += `&q=${searchQuery}`;
      }
      
      if (sortOrder === 'popular') {
        url += '&order_by=popularity&sort=asc';
      } else if (sortOrder === 'newest') {
        url += '&order_by=start_date&sort=desc';
      } else {
        url += '&order_by=title&sort=asc';
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch animes');
      const data = await response.json();
      setAnimes(data.data);
      setTotalPages(Math.ceil(data.pagination.items.total / 24));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchAnimes();
  };

  const AnimeCard = ({ anime }) => (
    <Link href={`/animes/anime/${anime.mal_id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="relative h-[350px] group overflow-hidden">
            <div className="relative w-full h-full transform transition-transform duration-300 group-hover:scale-110">
              <Image
                src={anime.images?.jpg?.large_image_url || "/api/placeholder/200/300"}
                alt={anime.title}
                fill
                className="object-cover rounded-t-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
    </Link>
  );



  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>Error: {error}</p>
          <button onClick={fetchAnimes} className="mt-2 text-sm underline">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearch} className="w-full md:w-96">
          <Input
            type="search"
            placeholder="Search animes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alpha">Alphabetical</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-[300px] rounded-lg mb-2"></div>
              <div className="bg-gray-200 h-6 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {animes.map((anime, index) => (
              <AnimeCard key={`${anime.mal_id}-${index}`} anime={anime} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-6">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              Previous
            </Button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
            </div>

            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
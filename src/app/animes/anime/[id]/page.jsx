"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';
import { ArrowLeft, Star, Users, Film, Trophy, Calendar, Play } from 'lucide-react';

export default function Anime() {
  const params = useParams();
  const [anime, setAnime] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const animeResponse = await fetch(`https://api.jikan.moe/v4/anime/${params.id}`);
        if (!animeResponse.ok) throw new Error('Failed to fetch anime details');
        const animeData = await animeResponse.json();
        setAnime(animeData.data);

        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const charactersResponse = await fetch(`https://api.jikan.moe/v4/anime/${params.id}/characters`);
        if (!charactersResponse.ok) throw new Error('Failed to fetch characters');
        const charactersData = await charactersResponse.json();
        setCharacters(charactersData.data);

        await new Promise(resolve => setTimeout(resolve, 1000));

        const staffResponse = await fetch(`https://api.jikan.moe/v4/anime/${params.id}/staff`);
        if (!staffResponse.ok) throw new Error('Failed to fetch staff');
        const staffData = await staffResponse.json();
        setStaff(staffData.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  const StatCard = ({ icon: Icon, label, value }) => (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-gray-400" />
        <p className="text-sm text-gray-400">{label}</p>
      </div>
      <p className="font-semibold text-white">{value}</p>
    </div>
  );

  const CharacterCard = ({ character }) => (
    <Card className="h-full bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors">
      <CardContent className="p-0">
        <div className="relative h-[200px]">
          <Image
            src={character.character.images?.jpg?.image_url || "/api/placeholder/150/200"}
            alt={character.character.name}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={100}
          />
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-gray-100 line-clamp-1">{character.character.name}</h4>
          <p className="text-sm text-gray-400">{character.role}</p>
          {character.voice_actors && character.voice_actors[0] && (
            <p className="text-sm text-gray-500 mt-1">
              VA: {character.voice_actors[0].person.name}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const StaffCard = ({ person, role }) => (
    <Card className="h-full bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors">
      <CardContent className="p-0">
        <div className="relative h-[150px]">
          <Image
            src={person.images?.jpg?.image_url || "/api/placeholder/150/150"}
            alt={person.name}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={100}
          />
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-gray-100 line-clamp-1">{person.name}</h4>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-8">
          <Skeleton className="w-full md:w-[300px] h-[400px] bg-gray-800" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-12 w-3/4 bg-gray-800" />
            <Skeleton className="h-6 w-1/2 bg-gray-800" />
            <Skeleton className="h-32 bg-gray-800" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-lg">
          <p>Error: {error}</p>
          <Link href="/animes" className="mt-2 text-sm text-red-300 hover:text-red-100 underline block">
            Return to anime list
          </Link>
        </div>
      </div>
    );
  }

  if (!anime) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto p-4">
        <Link href="/animes">
          <Button variant="ghost" className="mb-6 text-gray-300 hover:text-white hover:bg-gray-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to list
          </Button>
        </Link>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-[300px] flex-shrink-0 space-y-4">
            <Card className="overflow-hidden bg-gray-800 border-gray-700">
              <CardContent className="p-0">
                <div className="relative h-[400px]">
                  <Image
                    src={anime.images?.jpg?.large_image_url || "/api/placeholder/300/400"}
                    alt={anime.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                    priority
                    quality={100}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Alternative Titles</h3>
              {anime.title_english && (
                <p className="text-sm text-gray-400">English: {anime.title_english}</p>
              )}
              {anime.title_japanese && (
                <p className="text-sm text-gray-400">Japanese: {anime.title_japanese}</p>
              )}
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Information</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-400">Type: <span className="text-white">{anime.type}</span></p>
                <p className="text-gray-400">Episodes: <span className="text-white">{anime.episodes || 'Unknown'}</span></p>
                <p className="text-gray-400">Status: <span className="text-white">{anime.status}</span></p>
                <p className="text-gray-400">Aired: <span className="text-white">{anime.aired?.string}</span></p>
                <p className="text-gray-400">Duration: <span className="text-white">{anime.duration}</span></p>
                <p className="text-gray-400">Rating: <span className="text-white">{anime.rating}</span></p>
                <p className="text-gray-400">Season: <span className="text-white">{anime.season} {anime.year}</span></p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-white">{anime.title}</h1>
              <div className="flex flex-wrap gap-2">
                {anime.genres?.map((genre) => (
                  <span key={genre.mal_id} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={Star} label="Score" value={anime.score || 'N/A'} />
              <StatCard icon={Trophy} label="Rank" value={`#${anime.rank || 'N/A'}`} />
              <StatCard icon={Users} label="Members" value={anime.members?.toLocaleString() || 'N/A'} />
              <StatCard icon={Film} label="Episodes" value={anime.episodes || 'N/A'} />
            </div>

            <Tabs defaultValue="synopsis" className="w-full">
              <TabsList className="bg-gray-800 border-b border-gray-700">
                <TabsTrigger value="synopsis" className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700">Synopsis</TabsTrigger>
                <TabsTrigger value="characters" className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700">Characters</TabsTrigger>
                <TabsTrigger value="staff" className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700">Staff</TabsTrigger>
                <TabsTrigger value="details" className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700">Details</TabsTrigger>
              </TabsList>

              <TabsContent value="synopsis" className="space-y-4 mt-4">
                <p className="text-gray-300 leading-relaxed">{anime.synopsis}</p>
                {anime.background && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2 text-white">Background</h3>
                    <p className="text-gray-300 leading-relaxed">{anime.background}</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="characters" className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {characters.slice(0, 8).map((char) => (
                    <CharacterCard key={char.character.mal_id} character={char} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="staff" className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {staff.map((member) => (
                    <StaffCard 
                      key={`${member.person.mal_id}-${member.positions.join('-')}`}
                      person={member.person}
                      role={member.positions.join(', ')}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-6 mt-4">
              {anime.trailer && anime.trailer.url && (
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
                      <Play className="w-5 h-5 mr-2" />
                      Trailer
                    </h2>
                    <div className="aspect-video w-full">
                      <iframe
                        src={anime.trailer.embed_url}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg"
                      />
                    </div>
                    {anime.trailer.url && (
                      <a
                        href={anime.trailer.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Watch on YouTube
                      </a>
                    )}
                  </div>
                )}
                {anime.studios && anime.studios.length > 0 && (
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2 text-white">Studios</h2>
                    <div className="flex flex-wrap gap-2">
                      {anime.studios.map((studio) => (
                        <span
                          key={studio.mal_id}
                          className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                        >
                          {studio.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {anime.producers && anime.producers.length > 0 && (
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2 text-white">Producers</h2>
                    <div className="flex flex-wrap gap-2">
                      {anime.producers.map((producer) => (
                        <span
                          key={producer.mal_id}
                          className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                        >
                          {producer.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {anime.licensors && anime.licensors.length > 0 && (
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2 text-white">Licensors</h2>
                    <div className="flex flex-wrap gap-2">
                      {anime.licensors.map((licensor) => (
                        <span
                          key={licensor.mal_id}
                          className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                        >
                          {licensor.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-gray-800 p-4 rounded-lg">
                  {anime.source && (
                    <div className="mb-4">
                      <h2 className="text-xl font-semibold mb-2 text-white">Source Material</h2>
                      <p className="text-gray-300">{anime.source}</p>
                    </div>
                  )}

                  {anime.broadcast && (
                    <div className="mb-4">
                      <h2 className="text-xl font-semibold mb-2 text-white">Broadcast Schedule</h2>
                      <p className="text-gray-300">{anime.broadcast.string}</p>
                    </div>
                  )}

                  {anime.aired && (
                    <div className="mb-4">
                      <h2 className="text-xl font-semibold mb-2 text-white">Air Period</h2>
                      <p className="text-gray-300">
                        From {new Date(anime.aired.from).toLocaleDateString()} 
                        {anime.aired.to ? ` to ${new Date(anime.aired.to).toLocaleDateString()}` : ' (Ongoing)'}
                      </p>
                    </div>
                  )}

                  {anime.rating && (
                    <div className="mb-4">
                      <h2 className="text-xl font-semibold mb-2 text-white">Age Rating</h2>
                      <p className="text-gray-300">{anime.rating}</p>
                    </div>
                  )}

                  {anime.popularity && (
                    <div className="mb-4">
                      <h2 className="text-xl font-semibold mb-2 text-white">Popularity</h2>
                      <p className="text-gray-300">#{anime.popularity} Most Popular</p>
                    </div>
                  )}

                  {anime.favorites && (
                    <div className="mb-4">
                      <h2 className="text-xl font-semibold mb-2 text-white">Favorites</h2>
                      <p className="text-gray-300">{anime.favorites.toLocaleString()} users</p>
                    </div>
                  )}

                  {anime.season && anime.year && (
                    <div>
                      <h2 className="text-xl font-semibold mb-2 text-white">Season</h2>
                      <p className="text-gray-300 capitalize">{anime.season} {anime.year}</p>
                    </div>
                  )}
                </div>

                {anime.streaming && anime.streaming.length > 0 && (
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2 text-white">Streaming Platforms</h2>
                    <div className="flex flex-col gap-2">
                      {anime.streaming.map((platform, index) => (
                        <a
                          key={index}
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          {platform.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
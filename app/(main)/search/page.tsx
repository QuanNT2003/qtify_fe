"use client";

import { useSearchParams } from "next/navigation";
import { SongListItem } from "@/components/song-list-item";
import { AlbumCard } from "@/components/album-card";
import { ArtistCard } from "@/components/artist-card";
import { Search, Music, Disc, User, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { songService } from "@/app/api/services/song.service";
import { albumService } from "@/app/api/services/album.service";
import { artistService } from "@/app/api/services/artist.service";
import { Song, Album, Artist } from "@/app/api/types";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const category = searchParams.get("category");

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    songs: Song[];
    albums: Album[];
    artists: Artist[];
  }>({
    songs: [],
    albums: [],
    artists: [],
  });

  const title = query
    ? `Results for "${query}"`
    : category
      ? `Best of ${category}`
      : "Search results";

  useEffect(() => {
    const fetchResults = async () => {
      if (!query && !category) return;

      setIsLoading(true);
      try {
        const [songsRes, albumsRes, artistsRes] = await Promise.all([
          songService.getSongs({ title: query || "", per_page: 10 }),
          albumService.getAlbums({ title: query || "", per_page: 6 }),
          artistService.getArtists({ name: query || "", per_page: 4 }),
        ]);

        setResults({
          songs: songsRes.data,
          albums: albumsRes.data,
          artists: artistsRes.data,
        });
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query, category]);

  const hasResults =
    results.songs.length > 0 ||
    results.albums.length > 0 ||
    results.artists.length > 0;

  return (
    <div className="flex flex-col gap-8 p-8 max-w-7xl mx-auto w-full">
      <div className="space-y-2">
        <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
          <Search className="h-8 w-8 text-primary" />
          {title}
        </h1>
        <p className="text-muted-foreground font-medium">
          {isLoading
            ? "Searching..."
            : hasResults
              ? "Found matches in songs, albums, and artists."
              : "No results found."}
        </p>
      </div>

      {isLoading ? (
        <div className="flex h-[400px] w-full items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary/30" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Top Result / Artists */}
            {results.artists.length > 0 && (
              <div className="lg:col-span-4 space-y-6">
                <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
                  <User className="h-5 w-5 text-primary" />
                  <h2>Artists</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-1">
                  {results.artists.map((artist) => (
                    <ArtistCard
                      key={artist.id}
                      id={artist.id}
                      name={artist.name}
                      avatar_url={artist.avatar_url}
                      verified={artist.verified}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Songs */}
            {results.songs.length > 0 && (
              <div
                className={`${results.artists.length > 0 ? "lg:col-span-8" : "lg:col-span-12"} space-y-6`}
              >
                <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
                  <Music className="h-5 w-5 text-primary" />
                  <h2>Songs</h2>
                </div>
                <div className="space-y-1 rounded-xl border border-border/40 bg-card/50 p-2 backdrop-blur-sm">
                  {results.songs.map((song, index) => (
                    <SongListItem
                      key={song.id}
                      index={index}
                      song={song}
                      artistName={song.artist?.name || "Unknown"}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Albums */}
          {results.albums.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
                <Disc className="h-5 w-5 text-primary" />
                <h2>Albums</h2>
              </div>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {results.albums.map((album) => (
                  <AlbumCard
                    key={album.id}
                    albumId={album.id}
                    title={album.title}
                    artist={album.artist?.name || "Unknown"}
                    cover={album.cover_image_url || "/placeholder-album.png"}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

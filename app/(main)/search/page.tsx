"use client";

import { useSearchParams } from "next/navigation";
import { SongListItem } from "@/components/song-list-item";
import { AlbumCard } from "@/components/album-card";
import { ArtistCard } from "@/components/artist-card";
import { Search, Music, Disc, User } from "lucide-react";
import React from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const category = searchParams.get("category");

  const title = query
    ? `Results for "${query}"`
    : category
      ? `Best of ${category}`
      : "Search results";

  // Mock data for search results
  const results = {
    songs: [
      {
        id: "1",
        title: "Die With A Smile",
        artist: "Lady Gaga, Bruno Mars",
        duration: "4:11",
      },
      { id: "2", title: "APT.", artist: "ROSE, Bruno Mars", duration: "2:50" },
      {
        id: "3",
        title: "Beautiful Things",
        artist: "Benson Boone",
        duration: "3:00",
      },
    ],
    albums: [
      {
        title: "V-Pop Hits",
        artist: "Various Artists",
        cover:
          "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
        id: "1",
      },
      {
        title: "Sky Tour",
        artist: "Sơn Tùng M-TP",
        cover:
          "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
        id: "2",
      },
    ],
    artists: [
      {
        id: "1",
        name: "Sơn Tùng M-TP",
        avatar:
          "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300&h=300&fit=crop",
        listeners: "2.3M monthly listeners",
      },
      {
        id: "2",
        name: "Bruno Mars",
        avatar:
          "https://images.unsplash.com/photo-1520127871002-14baa9dc21f4?w=300&h=300&fit=crop",
        listeners: "85M monthly listeners",
      },
    ],
  };

  return (
    <div className="flex flex-col gap-8 p-8 max-w-7xl mx-auto w-full">
      <div className="space-y-2">
        <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
          <Search className="h-8 w-8 text-primary" />
          {title}
        </h1>
        <p className="text-muted-foreground font-medium">
          Found matches in songs, albums, and artists.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Top Result / Artists */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <User className="h-5 w-5 text-primary" />
            <h2>Artists</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-1">
            {results.artists.map((artist) => (
              <ArtistCard key={artist.id} {...artist} />
            ))}
          </div>
        </div>

        {/* Songs */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <Music className="h-5 w-5 text-primary" />
            <h2>Songs</h2>
          </div>
          <div className="space-y-1 rounded-xl border border-border/40 bg-card/50 p-2 backdrop-blur-sm">
            {results.songs.map((song, index) => (
              <SongListItem
                key={song.id}
                index={index}
                title={song.title}
                artist={song.artist}
                duration={song.duration}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Albums */}
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
              artist={album.artist}
              cover={album.cover}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

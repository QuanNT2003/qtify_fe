"use client";

import { SongListItem } from "@/components/song-list-item";
import { Button } from "@/components/ui/button";
import { Play, Heart, Clock } from "lucide-react";
import { Song } from "@/app/api/types";
import { AuthGuard } from "@/components/auth-guard";

export default function LikedSongsPage() {
  const songs = [
    {
      title: "Die With A Smile",
      artist: { name: "Lady Gaga, Bruno Mars" },
      duration: 251,
      id: "1",
    },
    {
      title: "APT.",
      artist: { name: "ROSE, Bruno Mars" },
      duration: 170,
      id: "2",
    },
    {
      title: "Beautiful Things",
      artist: { name: "Benson Boone" },
      duration: 180,
      id: "3",
    },
    {
      title: "Birds of a Feather",
      artist: { name: "Billie Eilish" },
      duration: 210,
      id: "4",
    },
    {
      title: "Espresso",
      artist: { name: "Sabrina Carpenter" },
      duration: 172,
      id: "5",
    },
    {
      title: "Not Like Us",
      artist: { name: "Kendrick Lamar" },
      duration: 274,
      id: "6",
    },
  ];

  return (
    <AuthGuard>
      <div className="flex flex-col">
        {/* Hero Section */}
        <div className="relative flex flex-col items-start gap-6 px-8 py-10 md:flex-row md:items-end md:gap-8 bg-linear-to-b from-indigo-700 to-background/50 backdrop-blur-sm">
          <div className="relative aspect-square w-48 shrink-0 overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(79,70,229,0.3)] md:w-60 bg-linear-to-br from-indigo-600 via-indigo-500 to-blue-400 flex items-center justify-center group">
            <Heart className="h-24 w-24 text-white fill-current transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-black uppercase tracking-[0.2em] text-indigo-300">
              Playlist
            </span>
            <h1 className="text-5xl font-black tracking-tighter md:text-7xl lg:text-8xl text-white drop-shadow-md">
              Liked Songs
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm font-bold text-white/90">
              <span>Guest User</span>
              <span className="text-white/30">•</span>
              <span>128 songs</span>
            </div>
          </div>
        </div>

        <div className="px-8 py-8 space-y-10">
          {/* Controls */}
          <div className="flex items-center space-x-8">
            <Button
              size="icon"
              className="h-16 w-16 rounded-full shadow-2xl transition-transform hover:scale-105 active:scale-95 bg-indigo-600 hover:bg-indigo-500"
            >
              <Play className="h-8 w-8 fill-current translate-x-0.5" />
            </Button>
          </div>

          {/* Track List Header */}
          <div className="border-b border-border/40 pb-4">
            <div className="grid grid-cols-[48px_1fr_auto] items-center gap-4 px-4 text-xs font-black uppercase tracking-widest text-muted-foreground">
              <div className="text-center">#</div>
              <div>Title</div>
              <div className="flex items-center gap-2 pr-4">
                <Clock className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Tracks */}
          <div className="space-y-1 pb-12">
            {songs.map((song, index) => (
              <SongListItem
                key={song.id}
                index={index}
                song={song as unknown as Song}
              />
            ))}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

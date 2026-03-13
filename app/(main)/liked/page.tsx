"use client";

import { useEffect, useState } from "react";
import { SongListItem } from "@/components/song-list-item";
import { Button } from "@/components/ui/button";
import { Play, Heart, Clock, Loader2, Music2 } from "lucide-react";
import { Song } from "@/app/api/types";
import { AuthGuard } from "@/components/auth-guard";
import { useAuth } from "@/context/auth-context";
import { userLikeService } from "@/app/api/services/user-like.service";

export default function LikedSongsPage() {
  const { user } = useAuth();
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchLikedSongs = async () => {
        setIsLoading(true);
        try {
          // Use token-based endpoint — backend returns is_liked: true on each song
          const result = await userLikeService.getMyLikedSongs();
          const likedSongs = result
            .map((item) => item.song)
            .filter((song): song is Song => !!song);
          setSongs(likedSongs);
        } catch (error) {
          console.error("Failed to fetch liked songs:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchLikedSongs();
    }
  }, [user]);

  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen">
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
              <span>{user?.full_name || user?.username || "Người dùng"}</span>
              <span className="text-white/30">•</span>
              <span>{songs.length} songs</span>
            </div>
          </div>
        </div>

        <div className="px-8 py-8 space-y-10">
          {/* Controls */}
          <div className="flex items-center space-x-8">
            <Button
              size="icon"
              disabled={songs.length === 0}
              className="h-16 w-16 rounded-full shadow-2xl transition-transform hover:scale-105 active:scale-95 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50"
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

          {/* Tracks Content */}
          <div className="pb-12">
            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
              </div>
            ) : songs.length > 0 ? (
              <div className="space-y-1">
                {songs.map((song, index) => (
                  <SongListItem
                    key={song.id}
                    index={index}
                    song={song}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground gap-4">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <Music2 className="h-8 w-8 opacity-20" />
                </div>
                <p className="font-bold tracking-tight">Chưa có bài hát nào được yêu thích</p>
                <Button variant="outline" className="rounded-full font-bold">Tìm kiếm bài hát</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

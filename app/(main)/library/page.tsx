"use client";

import { PlaylistCard } from "@/components/playlist-card";
import { Button } from "@/components/ui/button";
import { Plus, Heart, Loader2 } from "lucide-react";
import Link from "next/link";
import { AuthGuard } from "@/components/auth-guard";
import { useEffect, useCallback, useState } from "react";
import { playlistService } from "@/app/api/services/playlist.service";
import { Playlist } from "@/app/api/types";
import { CreatePlaylistModal } from "@/components/create-playlist-modal";

const DEFAULT_COVER = "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&h=600&fit=crop";

export default function LibraryPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlaylists = useCallback(async () => {
    try {
      const result = await playlistService.getPlaylists();
      setPlaylists(result.data);
    } catch (error) {
      console.error("Failed to fetch playlists:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  return (
    <AuthGuard>
      <div className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight">Your Library</h1>
            <p className="text-muted-foreground font-medium">
              Manage your personal collection and playlists.
            </p>
          </div>
          <CreatePlaylistModal onSuccess={fetchPlaylists}>
            <Button
              size="lg"
              className="rounded-full gap-2 px-6 h-12 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="h-5 w-5" />
              <span className="font-bold">Create Playlist</span>
            </Button>
          </CreatePlaylistModal>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {/* Liked Songs Special Card */}
          <Link
            href="/liked"
            className="group relative col-span-1 flex flex-col justify-end overflow-hidden rounded-2xl bg-linear-to-br from-indigo-600 via-indigo-500 to-blue-400 p-6 shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] sm:col-span-2 aspect-[4/3] md:min-h-[220px]"
          >
            <div className="absolute top-6 right-6 h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center text-white rotate-12 transition-transform group-hover:rotate-0 group-hover:scale-110 shadow-lg">
              <Heart className="h-8 w-8 fill-current" />
            </div>
            <div className="relative z-10 space-y-1">
              <h2 className="text-4xl font-black text-white tracking-tight">
                Liked Songs
              </h2>
              <div className="flex items-center gap-2 text-white/90 font-bold">
                <span>128 songs</span>
              </div>
            </div>
            {/* Decorative background element */}
            <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-white/10 blur-3xl transition-transform group-hover:scale-150" />
          </Link>

          {/* User Playlists */}
          {isLoading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : (
            playlists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                id={playlist.id}
                title={playlist.title}
                owner="You" // Simple for now
                cover={DEFAULT_COVER}
              />
            ))
          )}
        </div>
      </div>
    </AuthGuard>
  );
}

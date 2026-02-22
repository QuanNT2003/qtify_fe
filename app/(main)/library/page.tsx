import { PlaylistCard } from "@/components/playlist-card";
import { Button } from "@/components/ui/button";
import { Plus, Heart } from "lucide-react";
import Link from "next/link";

const playlists = [
  {
    id: "1",
    title: "V-Pop Hits",
    owner: "Guest User",
    cover:
      "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&h=600&fit=crop",
  },
  {
    id: "2",
    title: "Chill Lofi Study",
    owner: "Guest User",
    cover:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=600&fit=crop",
  },
  {
    id: "3",
    title: "Hip Hop Mix 2024",
    owner: "Guest User",
    cover:
      "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=600&h=600&fit=crop",
  },
];

const songs = [
  {
    title: "Die With A Smile",
    plays: "250,000,000",
    duration: "4:11",
    id: "1",
  },
  { title: "APT.", plays: "180,000,000", duration: "2:50", id: "2" },
  {
    title: "Beautiful Things",
    plays: "500,000,000",
    duration: "3:00",
    id: "3",
  },
  {
    title: "Birds of a Feather",
    plays: "420,000,000",
    duration: "3:30",
    id: "4",
  },
  { title: "Espresso", plays: "600,000,000", duration: "2:52", id: "5" },
  { title: "Not Like Us", plays: "350,000,000", duration: "4:34", id: "6" },
];

export default function LibraryPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight">Your Library</h1>
          <p className="text-muted-foreground font-medium">
            Manage your personal collection and playlists.
          </p>
        </div>
        <Button
          size="lg"
          className="rounded-full gap-2 px-6 h-12 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="h-5 w-5" />
          <span className="font-bold">Create Playlist</span>
        </Button>
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
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            id={playlist.id}
            title={playlist.title}
            owner={playlist.owner}
            cover={playlist.cover}
          />
        ))}
      </div>
    </div>
  );
}

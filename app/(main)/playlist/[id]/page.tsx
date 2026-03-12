import { SongListItem } from "@/components/song-list-item";
import { Button } from "@/components/ui/button";
import { Play, MoreHorizontal, Heart, Clock, ListMusic } from "lucide-react";
import Image from "next/image";
import { Song } from "@/app/api/types";
import { AuthGuard } from "@/components/auth-guard";

export default function PlaylistDetailPage() {
  const playlist = {
    title: "V-Pop Hits",
    owner: "Guest User",
    description: "The best of V-Pop right now. Updated daily.",
    songCount: "15 songs",
    duration: "about 55 min",
    cover:
      "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&h=600&fit=crop",
  };

  const songs = [
    {
      title: "Making My Way",
      artist: { name: "Sơn Tùng M-TP" },
      duration: 225,
      id: "1",
    },
    {
      title: "Chúng Ta Của Hiện Tại",
      artist: { name: "Sơn Tùng M-TP" },
      duration: 301,
      id: "2",
    },
    {
      title: "Muộn Rồi Mà Sao Còn",
      artist: { name: "Sơn Tùng M-TP" },
      duration: 275,
      id: "3",
    },
    {
      title: "Có Chắc Yêu Là Đây",
      artist: { name: "Sơn Tùng M-TP" },
      duration: 202,
      id: "4",
    },
    {
      title: "Lạc Trôi",
      artist: { name: "Sơn Tùng M-TP" },
      duration: 232,
      id: "5",
    },
    {
      title: "Hãy Trao Cho Anh",
      artist: { name: "Sơn Tùng M-TP" },
      duration: 245,
      id: "6",
    },
  ];

  return (
    <AuthGuard>
      <div className="flex flex-col">
        {/* Hero Section */}
        <div className="relative flex flex-col items-start gap-6 px-8 py-10 md:flex-row md:items-end md:gap-8 bg-linear-to-b from-primary/30 to-background/50 backdrop-blur-sm">
          <div className="relative aspect-square w-48 shrink-0 overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] md:w-60 group">
            <Image
              src={playlist.cover}
              alt={playlist.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
              <ListMusic className="h-16 w-16 text-white/40" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-black uppercase tracking-[0.2em] text-primary">
              Playlist
            </span>
            <h1 className="text-5xl font-black tracking-tighter md:text-7xl lg:text-8xl drop-shadow-sm">
              {playlist.title}
            </h1>
            <p className="text-muted-foreground font-medium max-w-2xl line-clamp-2">
              {playlist.description}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm font-bold">
              <span className="text-foreground">{playlist.owner}</span>
              <span className="text-muted-foreground/30">•</span>
              <span>{playlist.songCount}</span>
              <span className="text-muted-foreground/30">•</span>
              <span className="text-muted-foreground">{playlist.duration}</span>
            </div>
          </div>
        </div>

        <div className="px-8 py-8 space-y-10">
          {/* Controls */}
          <div className="flex items-center space-x-8">
            <Button
              size="icon"
              className="h-16 w-16 rounded-full shadow-2xl transition-transform hover:scale-105 active:scale-95 bg-primary hover:bg-primary/90"
            >
              <Play className="h-8 w-8 fill-current translate-x-0.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 text-muted-foreground hover:text-primary transition-colors"
            >
              <Heart className="h-10 w-10 transition-transform active:scale-125 hover:fill-primary" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 text-muted-foreground hover:bg-accent/50 rounded-full"
            >
              <MoreHorizontal className="h-8 w-8" />
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

import { AlbumCard } from "@/components/album-card";
import { Button } from "@/components/ui/button";
import { Play, MoreHorizontal, Heart, Clock, ListMusic } from "lucide-react";
import Image from "next/image";
import { SongListItem } from "@/components/song-list-item";
import Link from "next/link";

export default function AlbumDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const album = {
    title: "V-Pop Hits",
    artist: "Sơn Tùng M-TP",
    artistId: "1",
    year: "2024",
    songCount: "15 songs",
    duration: "about 55 min",
    cover:
      "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&h=600&fit=crop",
  };

  const songs = [
    { title: "Making My Way", plays: "45,000,000", duration: "3:45", id: "1" },
    {
      title: "Chúng Ta Của Hiện Tại",
      plays: "120,000,000",
      duration: "5:01",
      id: "2",
    },
    {
      title: "Muộn Rồi Mà Sao Còn",
      plays: "98,000,000",
      duration: "4:35",
      id: "3",
    },
    {
      title: "Có Chắc Yêu Là Đây",
      plays: "85,000,000",
      duration: "3:22",
      id: "4",
    },
    { title: "Lạc Trôi", plays: "150,000,000", duration: "3:52", id: "5" },
    {
      title: "Hãy Trao Cho Anh",
      plays: "200,000,000",
      duration: "4:05",
      id: "6",
    },
  ];

  const moreAlbums = [
    {
      title: "Sky Tour",
      artist: album.artist,
      cover:
        "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
    },
    {
      title: "m-tp M-TP",
      artist: album.artist,
      cover:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    },
    {
      title: "Chúng Ta Của Tương Lai",
      artist: album.artist,
      cover:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
    },
    {
      title: "Nơi Này Có Anh",
      artist: album.artist,
      cover:
        "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300&h=300&fit=crop",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative flex flex-col items-start gap-6 px-8 py-10 md:flex-row md:items-end md:gap-8 bg-linear-to-b from-primary/20 to-background">
        <div className="relative aspect-square w-48 shrink-0 overflow-hidden rounded-lg shadow-2xl md:w-60">
          <Image
            src={album.cover}
            alt={album.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold uppercase tracking-wider">
            Album
          </span>
          <h1 className="text-4xl font-black tracking-tighter md:text-6xl lg:text-7xl">
            {album.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
            <Link
              href={`/artist/${album.artistId}`}
              className="hover:underline font-bold"
            >
              {album.artist}
            </Link>
            <span className="text-muted-foreground">•</span>
            <span>{album.year}</span>
            <span className="text-muted-foreground">•</span>
            <span>{album.songCount}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{album.duration}</span>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 space-y-8">
        {/* Controls */}
        <div className="flex items-center space-x-6">
          <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
            <Play className="h-6 w-6 fill-current" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary"
          >
            <Heart className="h-8 w-8" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <MoreHorizontal className="h-8 w-8" />
          </Button>
        </div>

        {/* Track List Header */}
        <div className="border-b border-border/50 pb-2">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <div className="w-8 text-center">#</div>
            <div>Title</div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Tracks */}
        <div className="space-y-1">
          {songs.map((song, index) => (
            <SongListItem
              key={song.id}
              index={index}
              title={song.title}
              plays={song.plays}
              duration={song.duration}
            />
          ))}
        </div>

        {/* More by Artist */}
        <section className="pt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold tracking-tight">
              More by {album.artist}
            </h2>
            <Link
              href={`/artist/${album.artistId}`}
              className="text-sm font-bold text-muted-foreground hover:underline"
            >
              Show all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {moreAlbums.map((moreAlbum) => (
              <AlbumCard
                key={moreAlbum.title}
                title={moreAlbum.title}
                artist={moreAlbum.artist}
                cover={moreAlbum.cover}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

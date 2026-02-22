import { AlbumCard } from "@/components/album-card";
import { Button } from "@/components/ui/button";
import { Play, MoreHorizontal, BadgeCheck } from "lucide-react";
import Image from "next/image";
import { SongListItem } from "@/components/song-list-item";

export default function ArtistDetailPage() {
  // ... (previous logic for artist, popularSongs, albums stays same)
  const artist = {
    name: "Sơn Tùng M-TP",
    listeners: "2,345,678 monthly listeners",
    cover:
      "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=1200&h=400&fit=crop",
    avatar:
      "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300&h=300&fit=crop",
  };

  const popularSongs = [
    { title: "Making My Way", artist: artist.name, duration: "3:45", id: "1" },
    {
      title: "Chúng Ta Của Hiện Tại",
      artist: artist.name,
      duration: "5:01",
      id: "2",
    },
    {
      title: "Muộn Rồi Mà Sao Còn",
      artist: artist.name,
      duration: "4:35",
      id: "3",
    },
    {
      title: "Có Chắc Yêu Là Đây",
      artist: artist.name,
      duration: "3:22",
      id: "4",
    },
    { title: "Lạc Trôi", artist: artist.name, duration: "3:52", id: "5" },
  ];

  const albums = [
    {
      title: "Sky Tour",
      artist: artist.name,
      cover:
        "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
    },
    {
      title: "m-tp M-TP",
      artist: artist.name,
      cover:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    },
    {
      title: "Chạm Khẽ Tim Anh Một Chút Thôi",
      artist: artist.name,
      cover:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <Image
          src={artist.cover}
          alt={artist.name}
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background to-transparent" />
        <div className="absolute bottom-6 left-8 flex items-end space-x-6">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-background shadow-xl md:h-32 md:w-32">
            <Image
              src={artist.avatar}
              alt={artist.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="mb-2 space-y-1">
            <div className="flex items-center space-x-2 text-primary">
              <BadgeCheck className="h-5 w-5 fill-current" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Verified Artist
              </span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter md:text-7xl">
              {artist.name}
            </h1>
            <p className="text-sm font-medium text-muted-foreground">
              {artist.listeners}
            </p>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 space-y-8">
        {/* Controls */}
        <div className="flex items-center space-x-4">
          <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
            <Play className="h-6 w-6 fill-current" />
          </Button>
          <Button
            variant="outline"
            className="rounded-full px-8 font-bold border-muted-foreground/30"
          >
            Follow
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-6 w-6" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Popular Tracks */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Popular</h2>
            <div className="space-y-1">
              {popularSongs.map((song, index) => (
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

          {/* Discography Preview */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Discography</h2>
            <div className="grid grid-cols-1 gap-4">
              {albums.slice(0, 2).map((album) => (
                <AlbumCard
                  key={album.title}
                  title={album.title}
                  artist={album.artist}
                  cover={album.cover}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

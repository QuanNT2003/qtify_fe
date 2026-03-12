import { AlbumCard } from "@/components/album-card";
import { Button } from "@/components/ui/button";
import { Play, MoreHorizontal, Heart, Clock } from "lucide-react";
import Image from "next/image";
import { SongListItem } from "@/components/song-list-item";
import Link from "next/link";
import { albumService } from "@/app/api/services/album.service";
import { formatDuration } from "@/lib/utils";
import { notFound } from "next/navigation";

import { Album } from "@/app/api/types";

export default async function AlbumDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let album: Album;

  try {
    album = await albumService.getAlbumById(id);
  } catch (error) {
    console.error("Failed to fetch album:", error);
    return notFound();
  }

  if (!album) {
    return notFound();
  }

  let moreAlbums: Album[] = [];
  try {
    const moreAlbumsResponse = await albumService.getAlbums({
      artist_ids: album.artist_id,
      per_page: 5,
    });
    moreAlbums = moreAlbumsResponse.data.filter((a) => a.id !== id).slice(0, 4);
  } catch (error) {
    console.error("Failed to fetch more albums:", error);
  }

  const year = new Date(album.release_date).getFullYear();
  const songCount = album.songs?.length || 0;
  const totalDurationSeconds =
    album.songs?.reduce((acc, song) => acc + song.duration, 0) || 0;
  const totalDurationFormatted = formatDuration(totalDurationSeconds);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative flex flex-col items-start gap-6 px-8 py-10 md:flex-row md:items-end md:gap-8 bg-linear-to-b from-primary/20 to-background">
        <div className="relative aspect-square w-48 shrink-0 overflow-hidden rounded-lg shadow-2xl md:w-60">
          <Image
            src={album.cover_image_url || "/placeholder-album.png"}
            alt={album.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-bold uppercase tracking-wider">
            {album.type}
          </span>
          <h1 className="text-4xl font-black tracking-tighter md:text-6xl lg:text-7xl">
            {album.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
            <Link
              href={`/artist/${album.artist_id}`}
              className="hover:underline font-bold"
            >
              {album.artist?.name || "Unknown Artist"}
            </Link>
            <span className="text-muted-foreground">•</span>
            <span>{year}</span>
            <span className="text-muted-foreground">•</span>
            <span>{songCount} songs</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {totalDurationFormatted}
            </span>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 space-y-8">
        {/* Controls ... */}
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

        {/* Track List Header ... */}
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
          {album.songs?.map((song, index) => (
            <SongListItem
              key={song.id}
              index={index}
              song={song}
              artistName={album.artist?.name || "Unknown Artist"}
            />
          ))}
        </div>

        {/* More by Artist */}
        {moreAlbums.length > 0 && (
          <section className="pt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold tracking-tight">
                More by {album.artist?.name}
              </h2>
              <Link
                href={`/artist/${album.artist_id}`}
                className="text-sm font-bold text-muted-foreground hover:underline"
              >
                Show all
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {moreAlbums.map((moreAlbum) => (
                <AlbumCard
                  key={moreAlbum.id}
                  title={moreAlbum.title}
                  artist={album.artist?.name || "Unknown Artist"}
                  cover={moreAlbum.cover_image_url || "/placeholder-album.png"}
                  albumId={moreAlbum.id}
                  artistId={moreAlbum.artist_id}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

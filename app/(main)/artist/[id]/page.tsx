import { AlbumCard } from "@/components/album-card";
import { Button } from "@/components/ui/button";
import { Play, MoreHorizontal, BadgeCheck } from "lucide-react";
import Image from "next/image";
import { SongListItem } from "@/components/song-list-item";
import { artistService } from "@/lib/api/services/artist.service";
import { songService } from "@/lib/api/services/song.service";
import { albumService } from "@/lib/api/services/album.service";
import { notFound } from "next/navigation";
import { formatDuration } from "@/lib/utils";
import { Artist, Album, Song } from "@/lib/api/types";

export default async function ArtistDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let artist: Artist;
  let popularSongs: Song[] = [];
  let albums: Album[] = [];

  try {
    const [artistData, songsResponse, albumsResponse] = await Promise.all([
      artistService.getArtistById(id),
      songService.getSongs({ artist_ids: id, per_page: 5 }),
      albumService.getAlbums({ artist_ids: id, per_page: 6 }),
    ]);

    artist = artistData;
    popularSongs = songsResponse.data;
    albums = albumsResponse.data;
  } catch (error) {
    console.error("Failed to fetch artist details:", error);
    return notFound();
  }

  if (!artist) return notFound();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <Image
          src={artist.avatar_url || "/placeholder-artist-banner.png"}
          alt={artist.name}
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background to-transparent" />
        <div className="absolute bottom-6 left-8 flex items-end space-x-6">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-background shadow-xl md:h-32 md:w-32">
            <Image
              src={artist.avatar_url || "/placeholder-artist.png"}
              alt={artist.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="mb-2 space-y-1">
            {artist.verified && (
              <div className="flex items-center space-x-2 text-primary">
                <BadgeCheck className="h-5 w-5 fill-current" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Verified Artist
                </span>
              </div>
            )}
            <h1 className="text-5xl font-black tracking-tighter md:text-7xl">
              {artist.name}
            </h1>
            <p className="text-sm font-medium text-muted-foreground whitespace-pre-line">
              {artist.bio || "No bio available."}
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
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Popular Tracks */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Popular</h2>
            <div className="space-y-1">
              {popularSongs.length > 0 ? (
                popularSongs.map((song, index) => (
                  <SongListItem
                    key={song.id}
                    index={index}
                    title={song.title}
                    artist={artist.name}
                    duration={formatDuration(song.duration)}
                  />
                ))
              ) : (
                <p className="text-muted-foreground italic">No songs found.</p>
              )}
            </div>
          </div>

          {/* Discography Preview */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Discography</h2>
            <div className="grid grid-cols-1 gap-4">
              {albums.length > 0 ? (
                albums
                  .slice(0, 3)
                  .map((album) => (
                    <AlbumCard
                      key={album.id}
                      title={album.title}
                      artist={artist.name}
                      cover={album.cover_image_url || "/placeholder-album.png"}
                      albumId={album.id}
                      artistId={artist.id}
                    />
                  ))
              ) : (
                <p className="text-muted-foreground italic">No albums found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

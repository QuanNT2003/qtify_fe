import { AlbumCard } from "@/components/album-card";
import { CategoryCard } from "@/components/category-card";
import { ArtistCard } from "@/components/artist-card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Play, MoreHorizontal, ChevronRight } from "lucide-react";
import { genreService } from "@/lib/api/services/genre.service";
import { albumService } from "@/lib/api/services/album.service";
import { artistService } from "@/lib/api/services/artist.service";
import { getGenreColor } from "@/lib/utils";
import { Album, Genre, Artist } from "@/lib/api/types";
import Link from "next/link";

export default async function Home() {
  let genres: Genre[] = [];
  let albums: Album[] = [];
  let artists: Artist[] = [];
  try {
    const [genresResponse, albumsResponse, artistsResponse] = await Promise.all(
      [
        genreService.getGenres({ per_page: 4 }),
        albumService.getAlbums({ per_page: 5 }),
        artistService.getArtists({ per_page: 5 }),
      ],
    );
    genres = genresResponse.data;
    albums = albumsResponse.data;
    artists = artistsResponse.data;
  } catch (error) {
    console.error("Failed to fetch data for home:", error);
  }

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Listen Now
            </h2>
            <p className="text-sm text-muted-foreground">
              Top picks for you. Updated daily.
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {albums.map((album) => (
            <AlbumCard
              key={album.id}
              title={album.title}
              artist={album.artist?.name || "Unknown Artist"}
              cover={album.cover_image_url || "/placeholder-album.png"}
              albumId={album.id}
              artistId={album.artist_id}
            />
          ))}
        </div>
      </section>

      {artists.length > 0 && (
        <section>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Featured Artists
              </h2>
              <p className="text-sm text-muted-foreground">
                Popular personalities you might like.
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {artists.map((artist) => (
              <ArtistCard
                key={artist.id}
                id={artist.id}
                name={artist.name}
                avatar_url={artist.avatar_url}
                verified={artist.verified}
              />
            ))}
          </div>
        </section>
      )}

      {genres.length > 0 && (
        <section>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Browse by Genre
              </h2>
              <p className="text-sm text-muted-foreground">
                Explore music from your favorite categories.
              </p>
            </div>
            <Link
              href="/explore"
              className="group flex items-center text-sm font-medium text-primary hover:underline"
            >
              See All
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {genres.map((genre) => (
              <CategoryCard
                key={genre.id}
                title={genre.name}
                color={getGenreColor(genre.name)}
              />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Made for You
            </h2>
            <p className="text-sm text-muted-foreground">
              Your personal playlists based on your history.
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* ... existing playlists content ... */}
          <div className="flex items-center justify-between rounded-lg border border-border/50 bg-card p-4 transition-colors hover:bg-accent/50">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 overflow-hidden rounded-md bg-primary/10 flex items-center justify-center">
                <Play className="h-8 w-8 text-primary fill-primary" />
              </div>
              <div>
                <h3 className="font-medium">On Repeat</h3>
                <p className="text-sm text-muted-foreground">
                  The songs you love most right now.
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border/50 bg-card p-4 transition-colors hover:bg-accent/50">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 overflow-hidden rounded-md bg-secondary/10 flex items-center justify-center">
                <PlusCircle className="h-8 w-8 text-secondary" />
              </div>
              <div>
                <h3 className="font-medium">Discovery Weekly</h3>
                <p className="text-sm text-muted-foreground">
                  Fresh music updated every Monday.
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

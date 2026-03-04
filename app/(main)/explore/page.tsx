import { AlbumCard } from "@/components/album-card";
import { CategoryCard } from "@/components/category-card";
import { genreService } from "@/lib/api/services/genre.service";
import { getGenreColor } from "@/lib/utils";
import { Genre } from "@/lib/api/types";

const featuredAlbums = [
  {
    title: "V-Pop Hits",
    artist: "Various Artists",
    cover:
      "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
  },
  {
    title: "Chill Lofi Study",
    artist: "Lofi Girl",
    cover:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
  },
];

export default async function ExplorePage() {
  let genres: Genre[] = [];
  try {
    const response = await genreService.getGenres({ per_page: 20 });
    genres = response.data;
  } catch (error) {
    console.error("Failed to fetch genres:", error);
  }

  return (
    <div className="space-y-8 pb-8">
      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Browse All</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {genres.length > 0 ? (
            genres.map((genre) => (
              <CategoryCard
                key={genre.id}
                title={genre.name}
                color={getGenreColor(genre.name)}
              />
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-muted-foreground">
              No categories available or failed to load.
            </div>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-4">
          Recommended for You
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {featuredAlbums.map((album) => (
            <AlbumCard
              key={album.title}
              title={album.title}
              artist={album.artist}
              cover={album.cover}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

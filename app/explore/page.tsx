import { AlbumCard } from "@/components/album-card";
import { CategoryCard } from "@/components/category-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const categories = [
  { title: "Pop", color: "#E13300" },
  { title: "Hip-Hop", color: "#BC5900" },
  { title: "Dance", color: "#D84000" },
  { title: "Indie", color: "#E91429" },
  { title: "Chill", color: "#777777" },
  { title: "Rock", color: "#E8115B" },
  { title: "K-Pop", color: "#148A08" },
  { title: "Jazz", color: "#7D4B32" },
];

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

export default function ExplorePage() {
  return (
    <div className="space-y-8 pb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="What do you want to listen to?"
          className="h-12 w-full max-w-md pl-10 bg-muted/50 border-none focus-visible:ring-primary"
        />
      </div>

      <section>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Browse All</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              color={category.color}
            />
          ))}
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

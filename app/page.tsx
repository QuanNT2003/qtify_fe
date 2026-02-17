import { Button } from "@/components/ui/button";
import { PlusCircle, Play, MoreHorizontal } from "lucide-react";
import Image from "next/image";

const albums = [
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
  {
    title: "Top 50 Global",
    artist: "Spotify",
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
  },
  {
    title: "Piano Relax",
    artist: "Soul Music",
    cover:
      "https://images.unsplash.com/photo-1520529611424-807082390a2c?w=300&h=300&fit=crop",
  },
  {
    title: "Hip Hop Mix 2024",
    artist: "Various Artists",
    cover:
      "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300&h=300&fit=crop",
  },
];

export default function Home() {
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
            <div
              key={album.title}
              className="group relative space-y-3 overflow-hidden rounded-md border border-border/50 bg-card p-3 transition-colors hover:bg-accent/50"
            >
              <div className="relative aspect-square overflow-hidden rounded-md">
                <Image
                  src={album.cover}
                  alt={album.title}
                  fill
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-12 w-12 rounded-full shadow-lg"
                  >
                    <Play className="h-6 w-6 fill-current" />
                  </Button>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <h3 className="font-medium leading-none">{album.title}</h3>
                <p className="text-xs text-muted-foreground">{album.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

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

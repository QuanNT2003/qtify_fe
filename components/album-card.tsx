import Image from "next/image";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AlbumCardProps {
  title: string;
  artist: string;
  cover: string;
}

export function AlbumCard({ title, artist, cover }: AlbumCardProps) {
  return (
    <div className="group relative space-y-3 overflow-hidden rounded-md border border-border/50 bg-card p-3 transition-colors hover:bg-accent/50">
      <div className="relative aspect-square overflow-hidden rounded-md">
        <Image
          src={cover}
          alt={title}
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
        <h3 className="font-medium leading-none">{title}</h3>
        <p className="text-xs text-muted-foreground">{artist}</p>
      </div>
    </div>
  );
}

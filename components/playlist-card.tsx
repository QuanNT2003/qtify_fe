import Image from "next/image";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PlaylistCardProps {
  title: string;
  owner: string;
  cover: string;
  id: string;
}

export function PlaylistCard({ title, owner, cover, id }: PlaylistCardProps) {
  return (
    <div className="group relative space-y-3 overflow-hidden rounded-xl border border-border/50 bg-card p-3 transition-all hover:bg-accent/50 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Link href={`/playlist/${id}`}>
          <Image
            src={cover}
            alt={title}
            fill
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-2xl scale-90 transition-transform duration-300 group-hover:scale-100 bg-primary hover:bg-primary/90"
          >
            <Play className="h-7 w-7 fill-current" />
          </Button>
        </div>
      </div>
      <div className="space-y-1 px-1">
        <Link href={`/playlist/${id}`}>
          <h3 className="font-bold leading-none tracking-tight hover:underline line-clamp-1">
            {title}
          </h3>
        </Link>
        <p className="text-xs font-medium text-muted-foreground">By {owner}</p>
      </div>
    </div>
  );
}

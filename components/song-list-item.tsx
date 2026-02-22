import { Play, Heart } from "lucide-react";

interface SongListItemProps {
  index: number;
  title: string;
  artist: string;
  duration: string;
}

export function SongListItem({
  index,
  title,
  artist,
  duration,
}: SongListItemProps) {
  return (
    <div className="group flex items-center justify-between rounded-md p-2 transition-colors hover:bg-accent/50">
      <div className="flex items-center space-x-4">
        <span className="w-4 text-center text-sm text-muted-foreground group-hover:hidden">
          {index + 1}
        </span>
        <Play className="hidden h-4 w-4 text-primary group-hover:block" />
        <div className="h-10 w-10 overflow-hidden rounded bg-muted/50">
          {/* Placeholder for song thumbnail if needed */}
        </div>
        <div>
          <h3 className="text-sm font-medium leading-none">{title}</h3>
          <p className="text-xs text-muted-foreground">{artist}</p>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <Heart className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        <span className="text-xs text-muted-foreground font-mono">
          {duration}
        </span>
      </div>
    </div>
  );
}

import React from "react";
import { Play, Music2, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useMusic } from "@/context/music-context";

interface Song {
  title: string;
  artist: string;
}

interface SongItemProps {
  song: Song;
  isActive?: boolean;
  index?: number;
  variant?: "side" | "tab";
  className?: string;
}

export const SongItem = ({
  song,
  isActive: propIsActive,
  index,
  variant = "tab",
  className,
}: SongItemProps) => {
  const { playSong, currentSong } = useMusic();

  const isActive = propIsActive || currentSong?.title === song.title;

  if (variant === "side") {
    return (
      <div
        onClick={() => playSong(song)}
        className={cn(
          "flex cursor-pointer items-center gap-3 p-2 mx-2 rounded-md hover:bg-muted/50 transition-colors group cursor-pointer",
          isActive && "bg-primary/10",
          className,
        )}
      >
        <div className="relative h-10 w-10 shrink-0 rounded overflow-hidden shadow-sm">
          <div className="absolute inset-0 flex items-center justify-center bg-primary/10 group-hover:bg-black/40 transition-colors">
            <Music2
              className={cn(
                "h-5 w-5 text-primary",
                isActive ? "visible" : "group-hover:hidden",
              )}
            />
            <Play
              className={cn(
                "h-4 w-4 text-white hidden group-hover:block fill-current",
              )}
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "text-sm font-medium truncate",
              isActive ? "text-primary" : "text-foreground",
            )}
          >
            {song.title}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {song.artist}
          </p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  // "tab" variant (expanded view)
  return (
    <div
      onClick={() => playSong(song)}
      className={cn(
        "flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group",
        isActive && "bg-muted/30",
        className,
      )}
    >
      <div className="w-6 flex items-center justify-center">
        {index !== undefined && (
          <span className="text-sm text-muted-foreground group-hover:hidden">
            {index + 1}
          </span>
        )}
        <Play className="h-4 w-4 fill-current text-muted-foreground hidden group-hover:block" />
      </div>

      <div className="h-10 w-10 rounded bg-muted overflow-hidden shrink-0">
        <div className="w-full h-full flex items-center justify-center bg-primary/10">
          <Music2 className="h-5 w-5 text-primary" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className={cn("font-medium truncate", isActive && "text-primary")}>
          {song.title}
        </p>
        <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
      </div>

      <div className="text-xs text-muted-foreground font-mono">3:45</div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );
};

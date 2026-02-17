import React from "react";
import { Maximize2 } from "lucide-react";
import Image from "next/image";

interface PlayerSongInfoProps {
  title: string;
  artist: string;
  cover: string;
  onExpand: () => void;
}

export const PlayerSongInfo = ({
  title,
  artist,
  cover,
  onExpand,
}: PlayerSongInfoProps) => {
  return (
    <div className="flex items-center gap-3 min-w-0 flex-1 md:flex-none md:w-1/4">
      <div
        className="relative h-12 w-12 shrink-0 rounded-md overflow-hidden bg-muted group cursor-pointer"
        onClick={onExpand}
      >
        <Image
          src={cover}
          alt={title}
          width={48}
          height={48}
          className="h-full w-full object-cover transition-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <Maximize2 className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="min-w-0" onClick={onExpand}>
        <h4 className="font-medium text-sm truncate hover:underline cursor-pointer">
          {title}
        </h4>
        <p className="text-xs text-muted-foreground truncate hover:underline cursor-pointer">
          {artist}
        </p>
      </div>
    </div>
  );
};

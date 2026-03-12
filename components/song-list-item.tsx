"use client";

import { Play, Heart, Music2 } from "lucide-react";
import { useMusic } from "@/context/music-context";
import { Song } from "@/lib/api/types";
import { formatDuration } from "@/lib/utils";
import Image from "next/image";

interface SongListItemProps {
  index: number;
  song: Song;
  /** Override the displayed artist name (e.g. from parent album/artist context) */
  artistName?: string;
}

export function SongListItem({ index, song, artistName }: SongListItemProps) {
  const { playSong, currentSong } = useMusic();

  const displayArtist =
    artistName ||
    song.artist?.name ||
    song.featured_artists?.[0]?.artist?.name ||
    "Unknown Artist";

  const isActive = currentSong?.title === song.title;

  return (
    <div
      onClick={() =>
        playSong({
          title: song.title,
          artist: displayArtist,
          cover:
            song.album?.cover_image_url ||
            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60",
          file_url: song.file_url,
          lyrics: song.lyrics,
        })
      }
      className={`group cursor-pointer flex items-center justify-between rounded-md p-2 transition-colors hover:bg-accent/50 ${isActive ? "bg-primary/10" : ""}`}
    >
      <div className="flex items-center space-x-4">
        <span
          className={`w-4 text-center text-sm transition-all ${isActive ? "hidden" : "text-muted-foreground group-hover:hidden"}`}
        >
          {index + 1}
        </span>
        <Play
          className={`h-4 w-4 text-primary ${isActive ? "block fill-current" : "hidden group-hover:block"}`}
        />
        <div className="h-10 w-10 overflow-hidden rounded bg-muted/50 shrink-0 relative">
          {song.album?.cover_image_url ? (
            <Image
              src={song.album.cover_image_url}
              alt={song.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10">
              <Music2 className="h-4 w-4 text-primary" />
            </div>
          )}
        </div>
        <div>
          <h3
            className={`text-sm font-medium leading-none ${isActive ? "text-primary" : ""}`}
          >
            {song.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {displayArtist}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <Heart className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        <span className="text-xs text-muted-foreground font-mono">
          {formatDuration(song.duration)}
        </span>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useRef, useEffect } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { ListMusic } from "lucide-react";
import { cn } from "@/lib/utils";
import { PlayerSongInfo } from "./music-player/PlayerSongInfo";
import { PlayerControls } from "./music-player/PlayerControls";
import { PlayerVolume } from "./music-player/PlayerVolume";
import { PlayerExpanded } from "./music-player/PlayerExpanded";
import { PlayerPlaylistSide } from "./music-player/PlayerPlaylistSide";
import { Button } from "@/components/ui/button";
import { useMusic } from "@/context/music-context";

const MusicPlayer = () => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    setIsPlaying,
    volume,
    setVolume,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    seekTo,
    registerSeek,
    registerVolumeChange,
  } = useMusic();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Register seek and volume handlers so context can call them
  useEffect(() => {
    registerSeek((time) => {
      if (audioRef.current) {
        audioRef.current.currentTime = time;
      }
    });
    registerVolumeChange((vol) => {
      if (audioRef.current) {
        audioRef.current.volume = vol / 100;
      }
    });
  }, [registerSeek, registerVolumeChange]);

  // Sync play/pause with audio element
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((e) => {
          console.error("Playback failed:", e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong?.file_url, setIsPlaying]);

  // Sync volume on mount and change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  if (!currentSong) return null;

  const playlist = [
    { title: "Shape of You", artist: "Ed Sheeran" },
    { title: "Blinding Lights", artist: "The Weeknd" },
    { title: "Flowers", artist: "Miley Cyrus" },
    { title: "As It Was", artist: "Harry Styles" },
    { title: "Stay", artist: "The Kid LAROI & Justin Bieber" },
    { title: "Shape of You", artist: "Ed Sheeran" },
    { title: "Blinding Lights", artist: "The Weeknd" },
    { title: "Flowers", artist: "Miley Cyrus" },
    { title: "As It Was", artist: "Harry Styles" },
    { title: "Stay", artist: "The Kid LAROI & Justin Bieber" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border px-4 py-3 md:px-6">
      <audio
        ref={audioRef}
        src={currentSong.file_url}
        onTimeUpdate={() => {
          if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4">
        {/* Song Info (Mini) */}
        <PlayerSongInfo
          title={currentSong.title}
          artist={currentSong.artist}
          cover={currentSong.cover}
          onExpand={() => setIsExpanded(true)}
        />

        {/* Playback Controls (Mini) */}
        <PlayerControls
          isPlaying={isPlaying}
          onPlayPause={togglePlay}
          currentTime={currentTime}
          duration={duration}
          onSeek={seekTo}
        />

        {/* Volume & Sidebar Toggle & Fullscreen Trigger (Mini) */}
        <div className="hidden md:flex items-center justify-end gap-3 flex-1 md:w-1/4">
          <PlayerVolume
            onExpand={() => setIsExpanded(true)}
            volume={volume}
            onVolumeChange={setVolume}
          />

          <div className="flex items-center gap-2 border-l pl-3 border-border">
            <Sheet open={isPlaylistOpen} onOpenChange={setIsPlaylistOpen}>
              <SheetTrigger asChild>
                <Button
                  variant={isPlaylistOpen ? "secondary" : "ghost"}
                  size="icon"
                  className={cn(
                    "h-8 w-8 transition-colors",
                    isPlaylistOpen
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <ListMusic className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <PlayerPlaylistSide playlist={playlist} />
            </Sheet>
          </div>

          <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
            <PlayerExpanded
              currentSong={currentSong}
              playlist={playlist}
              isPlaying={isPlaying}
              onPlayPause={togglePlay}
            />
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;

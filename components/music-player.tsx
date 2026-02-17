"use client";

import React, { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { PlayerSongInfo } from "./music-player/PlayerSongInfo";
import { PlayerControls } from "./music-player/PlayerControls";
import { PlayerVolume } from "./music-player/PlayerVolume";
import { PlayerExpanded } from "./music-player/PlayerExpanded";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock data for demonstration
  const currentSong = {
    title: "Shape of You",
    artist: "Ed Sheeran",
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    lyrics:
      "The club isn't the best place to find a lover\nSo the bar is where I go\nMe and my friends at the table doing shots\nDrinking fast and then we talk slow\nCome over and start up a conversation with just me\nAnd trust me I'll give it a chance now\nTake my hand, stop, put Van the Man on the jukebox\nAnd then we start to dance, and now I'm singing like...",
  };

  const playlist = [
    { title: "Shape of You", artist: "Ed Sheeran" },
    { title: "Blinding Lights", artist: "The Weeknd" },
    { title: "Flowers", artist: "Miley Cyrus" },
    { title: "As It Was", artist: "Harry Styles" },
    { title: "Stay", artist: "The Kid LAROI & Justin Bieber" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border px-4 py-3 md:px-6">
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
          onPlayPause={() => setIsPlaying(!isPlaying)}
        />

        {/* Volume & Fullscreen Trigger (Mini) */}
        <div className="hidden md:flex items-center justify-end gap-3 flex-1 md:w-1/4">
          <PlayerVolume onExpand={() => setIsExpanded(true)} />

          <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
            <PlayerExpanded
              currentSong={currentSong}
              playlist={playlist}
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying(!isPlaying)}
            />
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;

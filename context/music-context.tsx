"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

export interface Song {
  title: string;
  artist: string;
  cover: string;
  file_url?: string;
  duration?: string;
  lyrics?: string;
}

interface MusicContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  playSong: (song: Partial<Song> & Pick<Song, "title" | "artist">) => void;
  togglePlay: () => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentSong: (song: Song | null) => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  seekTo: (time: number) => void;
  onSeekTo: ((time: number) => void) | null;
  registerSeek: (fn: (time: number) => void) => void;
  onVolumeChange: ((volume: number) => void) | null;
  registerVolumeChange: (fn: (volume: number) => void) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3";

const MOCK_FILE_URL =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>({
    title: "Shape of You",
    artist: "Ed Sheeran",
    cover: DEFAULT_COVER,
    file_url: MOCK_FILE_URL,
    lyrics:
      "The club isn't the best place to find a lover\nSo the bar is where I go\nMe and my friends at the table doing shots\nDrinking fast and then we talk slow\nCome over and start up a conversation with just me\nAnd trust me I'll give it a chance now\nTake my hand, stop, put Van the Man on the jukebox\nAnd then we start to dance, and now I'm singing like...",
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // These refs hold callbacks registered by MusicPlayer (which owns the <audio> element)
  const [onSeekTo, setOnSeekTo] = useState<((time: number) => void) | null>(null);
  const [onVolumeChange, setOnVolumeChange] = useState<((volume: number) => void) | null>(null);

  const playSong = (song: Partial<Song> & Pick<Song, "title" | "artist">) => {
    setCurrentSong({
      title: song.title,
      artist: song.artist,
      cover: song.cover || DEFAULT_COVER,
      file_url: song.file_url || MOCK_FILE_URL,
      duration: song.duration,
      lyrics: song.lyrics || "Lời bài hát đang được cập nhật...",
    });
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const seekTo = useCallback(
    (time: number) => {
      setCurrentTime(time);
      onSeekTo?.(time);
    },
    [onSeekTo],
  );

  const handleVolumeChange = useCallback(
    (vol: number) => {
      setVolume(vol);
      onVolumeChange?.(vol);
    },
    [onVolumeChange],
  );

  const registerSeek = useCallback((fn: (time: number) => void) => {
    setOnSeekTo(() => fn);
  }, []);

  const registerVolumeChange = useCallback((fn: (volume: number) => void) => {
    setOnVolumeChange(() => fn);
  }, []);

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isPlaying,
        volume,
        currentTime,
        duration,
        playSong,
        togglePlay,
        setIsPlaying,
        setCurrentSong,
        setVolume: handleVolumeChange,
        setCurrentTime,
        setDuration,
        seekTo,
        onSeekTo,
        registerSeek,
        onVolumeChange,
        registerVolumeChange,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};

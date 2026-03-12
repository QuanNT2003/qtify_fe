import React from "react";
import { SkipBack, SkipForward, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { useMusic } from "@/context/music-context";

const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

interface PlayerInfoTabProps {
  title: string;
  artist: string;
  cover: string;
  isPlaying: boolean;
  onPlayPause: () => void;
}

export const PlayerInfoTab = ({
  title,
  artist,
  cover,
  isPlaying,
  onPlayPause,
}: PlayerInfoTabProps) => {
  const { currentTime, duration, seekTo } = useMusic();
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <TabsContent
      value="info"
      className="h-full m-0 data-[state=active]:flex flex-col md:flex-row items-center justify-center gap-12 overflow-y-auto"
    >
      <div className="relative w-full max-w-[300px] md:max-w-[450px] aspect-square rounded-xl overflow-hidden shadow-2xl shadow-primary/20">
        <Image
          src={cover}
          alt={title}
          fill
          className="w-full h-full object-cover"
          priority
        />
      </div>
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6 max-w-md">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-2 tracking-tight">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground font-medium">{artist}</p>
        </div>
        <div className="w-full space-y-2">
          <Slider
            value={[progress]}
            max={100}
            step={0.1}
            className="w-full"
            onValueChange={([val]) => {
              if (duration > 0) seekTo((val / 100) * duration);
            }}
          />
          <div className="flex justify-between text-sm text-muted-foreground font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full"
          >
            <SkipBack className="h-8 w-8 fill-current" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-20 w-20 rounded-full bg-foreground text-background hover:scale-105 transition-transform"
            onClick={onPlayPause}
          >
            {isPlaying ? (
              <Pause className="h-10 w-10 fill-current" />
            ) : (
              <Play className="h-10 w-10 fill-current ml-1" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full"
          >
            <SkipForward className="h-8 w-8 fill-current" />
          </Button>
        </div>
      </div>
    </TabsContent>
  );
};

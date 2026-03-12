import React from "react";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onSkipBack?: () => void;
  onSkipForward?: () => void;
  showProgress?: boolean;
  currentTime?: number;
  duration?: number;
  onSeek?: (time: number) => void;
}

const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export const PlayerControls = ({
  isPlaying,
  onPlayPause,
  onSkipBack,
  onSkipForward,
  showProgress = true,
  currentTime = 0,
  duration = 0,
  onSeek,
}: PlayerControlsProps) => {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex flex-col items-center gap-1 flex-1 max-w-xl w-full">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex text-muted-foreground hover:text-foreground"
          onClick={onSkipBack}
        >
          <SkipBack className="h-5 w-5 fill-current" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full h-10 w-10 bg-foreground text-background hover:scale-105 transition-transform"
          onClick={onPlayPause}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 fill-current" />
          ) : (
            <Play className="h-5 w-5 fill-current ml-0.5" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
          onClick={onSkipForward}
        >
          <SkipForward className="h-5 w-5 fill-current" />
        </Button>
      </div>
      {showProgress && (
        <div className="hidden md:flex items-center gap-2 w-full text-[10px] text-muted-foreground">
          <span className="w-8 text-right">{formatTime(currentTime)}</span>
          <Slider
            value={[progress]}
            max={100}
            step={0.1}
            className="flex-1"
            onValueChange={([val]) => {
              if (onSeek && duration > 0) {
                onSeek((val / 100) * duration);
              }
            }}
          />
          <span className="w-8">{formatTime(duration)}</span>
        </div>
      )}
    </div>
  );
};

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
}

export const PlayerControls = ({
  isPlaying,
  onPlayPause,
  onSkipBack,
  onSkipForward,
  showProgress = true,
}: PlayerControlsProps) => {
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
          <span>1:23</span>
          <Slider defaultValue={[33]} max={100} step={1} className="flex-1" />
          <span>3:54</span>
        </div>
      )}
    </div>
  );
};

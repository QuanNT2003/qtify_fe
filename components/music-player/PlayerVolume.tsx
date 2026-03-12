import React from "react";
import { Volume2, VolumeX, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface PlayerVolumeProps {
  onExpand: () => void;
  volume?: number;
  onVolumeChange?: (volume: number) => void;
}

export const PlayerVolume = ({
  onExpand,
  volume = 80,
  onVolumeChange,
}: PlayerVolumeProps) => {
  return (
    <div className="hidden md:flex items-center justify-end gap-3 flex-1 md:w-1/4">
      <div className="flex items-center gap-2 w-32">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 shrink-0 text-muted-foreground hover:text-foreground p-0"
          onClick={() => onVolumeChange?.(volume === 0 ? 80 : 0)}
        >
          {volume === 0 ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
        <Slider
          value={[volume]}
          max={100}
          step={1}
          onValueChange={([val]) => onVolumeChange?.(val)}
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-foreground"
        onClick={onExpand}
      >
        <Maximize2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

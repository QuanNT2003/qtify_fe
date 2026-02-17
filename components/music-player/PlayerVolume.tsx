import React from "react";
import { Volume2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface PlayerVolumeProps {
  onExpand: () => void;
}

export const PlayerVolume = ({ onExpand }: PlayerVolumeProps) => {
  return (
    <div className="hidden md:flex items-center justify-end gap-3 flex-1 md:w-1/4">
      <div className="flex items-center gap-2 w-32">
        <Volume2 className="h-4 w-4 text-muted-foreground" />
        <Slider defaultValue={[80]} max={100} step={1} />
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

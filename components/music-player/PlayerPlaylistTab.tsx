import React from "react";
import { Play, Music2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";

interface Song {
  title: string;
  artist: string;
}

interface PlayerPlaylistTabProps {
  playlist: Song[];
}

import { SongItem } from "./SongItem";

export const PlayerPlaylistTab = ({ playlist }: PlayerPlaylistTabProps) => {
  return (
    <TabsContent
      value="playlist"
      className="h-full m-0 data-[state=active]:flex flex-col max-w-2xl mx-auto"
    >
      <ScrollArea className="h-full w-full">
        <div className="space-y-1 py-4">
          <h3 className="text-sm font-semibold text-muted-foreground px-4 mb-4 uppercase tracking-wider">
            Tiếp theo
          </h3>
          {playlist.map((song, i) => (
            <SongItem
              key={i}
              song={song}
              isActive={i === 0}
              index={i}
              variant="tab"
            />
          ))}
        </div>
      </ScrollArea>
    </TabsContent>
  );
};

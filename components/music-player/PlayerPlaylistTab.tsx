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
            <div
              key={i}
              className={`flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group ${i === 0 ? "bg-muted/30" : ""}`}
            >
              <div className="text-sm text-muted-foreground w-4 text-right group-hover:hidden">
                {i + 1}
              </div>
              <div className="hidden group-hover:block text-muted-foreground w-4">
                <Play className="h-4 w-4 fill-current" />
              </div>
              <div className="h-10 w-10 rounded bg-muted overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-primary/10">
                  <Music2 className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`font-medium truncate ${i === 0 ? "text-primary" : ""}`}
                >
                  {song.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {song.artist}
                </p>
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                3:45
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </TabsContent>
  );
};

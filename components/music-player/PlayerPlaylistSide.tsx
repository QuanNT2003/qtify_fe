import React from "react";
import {
  Music2,
  Play,
  History,
  MoreHorizontal,
  AlarmClock,
} from "lucide-react";
import { SheetContent, SheetHeader } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Song {
  title: string;
  artist: string;
}

interface PlayerPlaylistSideProps {
  playlist: Song[];
  className?: string;
}

import { SongItem } from "./SongItem";

export const PlayerPlaylistSide = ({
  playlist,
  className,
}: PlayerPlaylistSideProps) => {
  return (
    <SheetContent
      side="right"
      className={cn(
        "w-[400px] sm:w-[400px] p-0 flex flex-col border-l border-border bg-background/95 backdrop-blur-xl",
        className,
      )}
    >
      <SheetHeader className="p-4 flex flex-row items-center justify-between border-b shrink-0">
        <Tabs defaultValue="playlist" className="w-full">
          <div className="flex items-center justify-between gap-4">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="playlist" className="text-xs h-7 px-3">
                Danh sách phát
              </TabsTrigger>
              <TabsTrigger value="recent" className="text-xs h-7 px-3">
                Nghe gần đây
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-muted/50 hover:bg-muted"
              >
                <AlarmClock className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-muted/50 hover:bg-muted"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent
            value="playlist"
            className="mt-4 m-0 flex-1 overflow-hidden"
          >
            <ScrollArea className="h-[calc(100vh-120px)] w-full pr-4">
              <div className="space-y-1">
                {playlist.map((song, i) => (
                  <SongItem
                    key={i}
                    song={song}
                    isActive={i === 0}
                    variant="side"
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="recent" className="mt-4 m-0">
            <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
              <History className="h-10 w-10 mb-2 opacity-20" />
              <p className="text-sm">Không có bài hát nào</p>
            </div>
          </TabsContent>
        </Tabs>
      </SheetHeader>
    </SheetContent>
  );
};

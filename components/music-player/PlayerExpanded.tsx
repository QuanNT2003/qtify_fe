import React from "react";
import { Music2, AlignLeft, ListMusic } from "lucide-react";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayerInfoTab } from "./PlayerInfoTab";
import { PlayerLyricsTab } from "./PlayerLyricsTab";
import { PlayerPlaylistTab } from "./PlayerPlaylistTab";

interface Song {
  title: string;
  artist: string;
  cover: string;
  lyrics: string;
}

interface PlayerExpandedProps {
  currentSong: Song;
  playlist: { title: string; artist: string }[];
  isPlaying: boolean;
  onPlayPause: () => void;
}

export const PlayerExpanded = ({
  currentSong,
  playlist,
  isPlaying,
  onPlayPause,
}: PlayerExpandedProps) => {
  return (
    <DialogContent className="max-w-[100vw] h-screen p-0 border-none rounded-none bg-background/95 backdrop-blur-2xl">
      <DialogTitle className="sr-only">Music Player</DialogTitle>
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="info" className="h-full flex flex-col">
            <div className="flex justify-center border-b border-border py-4">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="info" className="gap-2">
                  <Music2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Thông tin</span>
                </TabsTrigger>
                <TabsTrigger value="lyrics" className="gap-2">
                  <AlignLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Lời bài hát</span>
                </TabsTrigger>
                <TabsTrigger value="playlist" className="gap-2">
                  <ListMusic className="h-4 w-4" />
                  <span className="hidden sm:inline">Danh sách phát</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-hidden p-6 md:p-12">
              <PlayerInfoTab
                title={currentSong.title}
                artist={currentSong.artist}
                cover={currentSong.cover}
                isPlaying={isPlaying}
                onPlayPause={onPlayPause}
              />
              <PlayerLyricsTab lyrics={currentSong.lyrics} />
              <PlayerPlaylistTab playlist={playlist} />
            </div>
          </Tabs>
        </div>
      </div>
    </DialogContent>
  );
};

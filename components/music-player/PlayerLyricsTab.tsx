import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";

interface PlayerLyricsTabProps {
  lyrics: string;
}

export const PlayerLyricsTab = ({ lyrics }: PlayerLyricsTabProps) => {
  return (
    <TabsContent
      value="lyrics"
      className="h-full m-0 data-[state=active]:flex flex-col items-center justify-center max-w-2xl mx-auto"
    >
      <ScrollArea className="h-full w-full pr-4">
        <div className="space-y-6 py-12">
          {lyrics.split("\n").map((line, i) => (
            <p
              key={i}
              className="text-2xl md:text-4xl font-bold text-muted-foreground hover:text-foreground transition-colors cursor-default leading-tight"
            >
              {line}
            </p>
          ))}
        </div>
      </ScrollArea>
    </TabsContent>
  );
};

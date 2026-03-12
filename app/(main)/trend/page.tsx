import { SongListItem } from "@/components/song-list-item";
import { Button } from "@/components/ui/button";
import { Play, TrendingUp, Clock } from "lucide-react";
import { Song } from "@//app/api/types";

export default function TrendPage() {
  // Mocking 100 songs for the trend page
  const trendingSongs = Array.from({ length: 100 }, (_, i) => ({
    id: `${i + 1}`,
    title:
      [
        "Die With A Smile",
        "APT.",
        "Beautiful Things",
        "Birds of a Feather",
        "Espresso",
        "Not Like Us",
        "Making My Way",
        "Chúng Ta Của Hiện Tại",
        "Lạc Trôi",
        "Hãy Trao Cho Anh",
      ][i % 10] + (i > 9 ? ` (Remix ${Math.floor(i / 10)})` : ""),

    artist_id: "mock",
    album_id: "mock",
    duration: [251, 170, 180, 210, 172, 274, 225, 301, 232, 245][i % 10],
    play_count: 0,
    file_url: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    artist: {
      id: "mock",
      name: [
        "Lady Gaga, Bruno Mars",
        "ROSE, Bruno Mars",
        "Benson Boone",
        "Billie Eilish",
        "Sabrina Carpenter",
        "Kendrick Lamar",
        "Sơn Tùng M-TP",
        "Sơn Tùng M-TP",
        "Sơn Tùng M-TP",
        "Sơn Tùng M-TP",
      ][i % 10],
      verified: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  }));

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative flex flex-col items-start gap-6 px-8 py-10 md:flex-row md:items-end md:gap-8 bg-linear-to-b from-rose-600 via-orange-500 to-background/50 backdrop-blur-sm overflow-hidden">
        {/* Animated background element */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-orange-400/20 blur-3xl animate-pulse" />

        <div className="relative aspect-square w-48 shrink-0 overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(244,63,94,0.4)] md:w-60 bg-linear-to-br from-rose-500 to-orange-400 flex items-center justify-center group">
          <TrendingUp className="h-24 w-24 text-white transition-transform duration-700 group-hover:scale-125" />
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="relative flex flex-col gap-2 z-10">
          <span className="text-sm font-black uppercase tracking-[0.3em] text-rose-100/80 drop-shadow-sm">
            Top Chart
          </span>
          <h1 className="text-5xl font-black tracking-tighter md:text-7xl lg:text-8xl text-white drop-shadow-2xl">
            Trend Global
          </h1>
          <p className="text-white/80 font-bold max-w-2xl drop-shadow-sm">
            The top 100 most played songs in the world right now. Updated every
            hour.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm font-bold text-white">
            <span>Global</span>
            <span className="text-white/30">•</span>
            <span>100 songs</span>
            <span className="text-white/30">•</span>
            <span>Updated 5 mins ago</span>
          </div>
        </div>
      </div>

      <div className="px-8 py-8 space-y-10">
        {/* Controls */}
        <div className="flex items-center space-x-8">
          <Button
            size="icon"
            className="h-16 w-16 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 bg-rose-600 hover:bg-rose-500 border-none"
          >
            <Play className="h-8 w-8 fill-current translate-x-0.5 text-white" />
          </Button>
        </div>

        {/* Track List Header */}
        <div className="border-b border-border/40 pb-4">
          <div className="grid grid-cols-[48px_1fr_auto] items-center gap-4 px-4 text-xs font-black uppercase tracking-widest text-muted-foreground">
            <div className="text-center">#</div>
            <div>Title</div>
            <div className="flex items-center gap-2 pr-4">
              <Clock className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Tracks */}
        <div className="space-y-1 pb-12">
          {trendingSongs.map((song, index) => (
            <div key={song.id} className="relative group/rank">
              {/* Dynamic Rank Coloring for Top 3 */}
              {index < 3 && (
                <div
                  className={`absolute -left-2 top-1/2 -translate-y-1/2 h-8 w-1 rounded-full ${
                    index === 0
                      ? "bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"
                      : index === 1
                        ? "bg-slate-300 shadow-[0_0_10px_rgba(203,213,225,0.5)]"
                        : "bg-amber-600 shadow-[0_0_10px_rgba(180,83,9,0.5)]"
                  }`}
                />
              )}
              <SongListItem index={index} song={song as unknown as Song} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

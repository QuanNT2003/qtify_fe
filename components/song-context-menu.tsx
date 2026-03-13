"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { 
  Music2, 
  Mic2, 
  Ban, 
  Heart, 
  PlusCircle, 
  PlayCircle, 
  Radio, 
  Plus, 
  Link2, 
  Share2, 
  Search,
  CheckCircle2,
  Loader2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { playlistService } from "@/app/api/services/playlist.service";
import { playlistSongService } from "@/app/api/services/playlist-song.service";
import { Song, Playlist } from "@/app/api/types";
import { CreatePlaylistModal } from "./create-playlist-modal";
import { useAuth } from "@/context/auth-context";
import { userLikeService } from "@/app/api/services/user-like.service";
import { toast } from "sonner";

interface SongContextMenuProps {
  song: Song;
  displayArtist: string;
  children: React.ReactNode;
}

export function SongContextMenu({
  song,
  displayArtist,
  children,
}: SongContextMenuProps) {
  const [open, setOpen] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [addingToId, setAddingToId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  useEffect(() => {
    if (open && user && song.id) {
       userLikeService.getUserLikedSongs(user.id).then((likes) => {
        setIsLiked(likes.some((like) => like.song_id === song.id));
      });
    }
  }, [open, user, song.id]);

  useEffect(() => {
    if (open) {
      const fetchPlaylists = async () => {
        setIsLoading(true);
        try {
          const result = await playlistService.getPlaylists();
          setPlaylists(result.data);
        } catch (error) {
          console.error("Failed to fetch playlists:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPlaylists();
    }
  }, [open]);

  const filteredPlaylists = useMemo(() => {
    return playlists.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [playlists, searchQuery]);

  const handleAddToPlaylist = async (playlistId: string) => {
    setAddingToId(playlistId);
    try {
      await playlistSongService.addSongToPlaylist({
        playlist_id: playlistId,
        song_id: song.id,
      });
      setSuccessId(playlistId);
      setTimeout(() => setSuccessId(null), 2000);
    } catch (error) {
      console.error("Failed to add song to playlist:", error);
    } finally {
      setAddingToId(null);
    }
  };

  const toggleLike = async () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để yêu thích bài hát");
      return;
    }

    setIsLikeLoading(true);
    try {
      if (isLiked) {
        await userLikeService.unlikeSong(user.id, song.id);
        setIsLiked(false);
        toast.success("Đã xóa khỏi thư viện");
      } else {
        await userLikeService.likeSong({ user_id: user.id, song_id: song.id });
        setIsLiked(true);
        toast.success("Đã thêm vào thư viện");
      }
    } catch (error) {
      console.error("Like error:", error);
      toast.error("Đã xảy ra lỗi, vui lòng thử lại sau");
    } finally {
      setIsLikeLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          sideOffset={8}
          className="w-72 max-h-[calc(100vh-40px)] bg-[#1a1b2e]/95 backdrop-blur-xl border-[#2a2b3e] p-1.5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-y-auto custom-scrollbar"
        >
          {/* Header */}
          <div className="flex items-center gap-3 p-3 pb-3">
            <div className="h-10 w-10 rounded-lg overflow-hidden bg-[#2a2b3e] shrink-0 relative shadow-inner">
              {song.album?.cover_image_url ? (
                <Image
                  src={song.album.cover_image_url}
                  alt={song.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/20">
                  <Music2 className="h-4 w-4 text-primary" />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <h4 className="text-[13px] font-black truncate leading-tight tracking-tight text-white">{song.title}</h4>
              <p className="text-[10px] text-muted-foreground/80 font-bold truncate mt-0.5 capitalize">{displayArtist}</p>
              <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground/60 uppercase font-black tracking-widest mt-1">
                <div className="flex items-center gap-1">
                  <Heart className="h-2.5 w-2.5 fill-muted-foreground/40 stroke-none" />
                  <span>88K</span>
                </div>
                <span className="opacity-30">•</span>
                <div className="flex items-center gap-1">
                  <Radio className="h-2.5 w-2.5" />
                  <span>3.4M</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 gap-1.5 px-3 pb-2">
            <Button variant="secondary" size="sm" className="h-8 rounded-lg bg-[#2a2b3e]/60 hover:bg-[#3a3b4e] border-none flex items-center gap-2 group">
              <Mic2 className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-[11px] font-bold">Lời bài hát</span>
            </Button>
            <Button variant="secondary" size="sm" className="h-8 rounded-lg bg-[#2a2b3e]/60 hover:bg-[#3a3b4e] border-none flex items-center gap-2 group">
              <Ban className="h-3.5 w-3.5 text-muted-foreground group-hover:text-destructive transition-colors" />
              <span className="text-[11px] font-bold">Chặn</span>
            </Button>
          </div>

          <DropdownMenuSeparator className="bg-border/50 mx-1" />

          {/* Main Actions */}
          <div className="py-1 px-1">
            <DropdownMenuItem 
              className="flex items-center justify-between rounded-xl px-3 py-2.5 cursor-pointer focus:bg-[#3a3b4e]/50 group"
              onClick={toggleLike}
              disabled={isLikeLoading}
            >
              <div className="flex items-center gap-3">
                <Heart className={`h-4 w-4 ${isLiked ? "text-primary fill-primary" : "text-muted-foreground group-hover:text-primary transition-colors"}`} />
                <span className={`text-sm font-bold opacity-90 group-hover:opacity-100 ${isLiked ? "italic" : ""}`}>
                  {isLiked ? "Xóa khỏi thư viện" : "Yêu thích bài hát"}
                </span>
              </div>
              {isLikeLoading && <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />}
            </DropdownMenuItem>
            
            <DropdownMenuItem className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer focus:bg-[#3a3b4e]/50 group">
              <PlusCircle className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-bold opacity-90 group-hover:opacity-100">Thêm vào danh sách phát</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer focus:bg-[#3a3b4e]/50 group">
              <PlayCircle className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-bold opacity-90 group-hover:opacity-100">Phát tiếp theo</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer focus:bg-[#3a3b4e]/50 group">
              <Radio className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-bold opacity-90 group-hover:opacity-100">Phát nội dung tương tự</span>
            </DropdownMenuItem>

            {/* Add to Playlist Submenu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer focus:bg-[#3a3b4e]/50 group data-[state=open]:bg-[#3a3b4e]/50">
                <Plus className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold opacity-90 group-hover:opacity-100">Thêm vào playlist</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent 
                  className="w-64 bg-[#1a1b2e]/98 border-[#2a2b3e] p-1.5 rounded-2xl shadow-2xl z-51"
                  sideOffset={-4}
                  alignOffset={0}
                >
                  <div className="p-2 pb-1.5 relative">
                    <Search className="absolute left-4 top-4 h-3.5 w-3.5 text-muted-foreground/50" />
                    <Input 
                      placeholder="Tìm playlist" 
                      className="h-8 pl-8 rounded-full bg-[#2a2b3e]/40 border-none text-[11px] placeholder:italic focus-visible:ring-1 focus-visible:ring-primary/20"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="max-h-64 overflow-y-auto custom-scrollbar">
                    <DropdownMenuItem 
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer focus:bg-primary/10 group"
                      onClick={() => setIsCreateModalOpen(true)}
                    >
                      <div className="h-8 w-8 bg-primary/20 rounded flex items-center justify-center">
                        <Plus className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-bold text-primary group-hover:translate-x-0.5 transition-transform">Tạo playlist mới</span>
                    </DropdownMenuItem>

                    {isLoading ? (
                      <div className="p-4 flex justify-center">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      </div>
                    ) : (
                      filteredPlaylists.map((playlist) => (
                        <DropdownMenuItem 
                          key={playlist.id} 
                          className="flex items-center justify-between rounded-xl px-3 py-2.5 cursor-pointer focus:bg-[#3a3b4e]/50 group"
                          onClick={() => handleAddToPlaylist(playlist.id)}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <Music2 className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors shrink-0" />
                            <span className="text-sm font-bold opacity-80 group-hover:opacity-100 truncate">{playlist.title}</span>
                          </div>
                          {addingToId === playlist.id && (
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                          )}
                          {successId === playlist.id && (
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500 animate-in zoom-in-50 duration-300" />
                          )}
                        </DropdownMenuItem>
                      ))
                    )}
                  </div>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuItem className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer focus:bg-[#3a3b4e]/50 group">
              <Link2 className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-bold opacity-90 group-hover:opacity-100">Sao chép link</span>
            </DropdownMenuItem>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer focus:bg-[#3a3b4e]/50 group data-[state=open]:bg-[#3a3b4e]/50">
                <Share2 className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm font-bold opacity-90 group-hover:opacity-100">Chia sẻ</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="w-48 bg-[#1a1b2e]/98 border-[#2a2b3e] p-1.5 rounded-xl shadow-2xl z-51">
                   <DropdownMenuItem className="rounded-lg py-2">Facebook</DropdownMenuItem>
                   <DropdownMenuItem className="rounded-lg py-2">X (Twitter)</DropdownMenuItem>
                   <DropdownMenuItem className="rounded-lg py-2">Zalo</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </div>

          <div className="p-3 pt-1 mb-1">
             <p className="text-[9px] uppercase font-black text-center text-muted-foreground/30 px-4 leading-relaxed">Cung cấp bởi NCT Corporation</p>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreatePlaylistModal 
        open={isCreateModalOpen} 
        onOpenChange={setIsCreateModalOpen}
        onSuccess={() => {
          // Re-fetch playlists
          playlistService.getPlaylists().then(result => setPlaylists(result.data));
        }}
      >
        {null}
      </CreatePlaylistModal>
    </>
  );
}

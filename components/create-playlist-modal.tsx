"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { playlistService } from "@/app/api/services/playlist.service";
import { Loader2 } from "lucide-react";

interface CreatePlaylistModalProps {
  children: React.ReactNode;
  onSuccess?: () => void;
}

export function CreatePlaylistModal({
  children,
  onSuccess,
}: CreatePlaylistModalProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    is_public: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsLoading(true);
    try {
      await playlistService.createPlaylist({
        title: formData.title,
        description: formData.description || undefined,
        is_public: formData.is_public,
      });
      setOpen(false);
      setFormData({ title: "", description: "", is_public: true });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Failed to create playlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">Create New Playlist</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Title
            </label>
            <Input
              id="title"
              placeholder="Give your playlist a title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-accent/50 border-transparent focus:border-primary h-12 rounded-xl"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Description (Optional)
            </label>
            <textarea
              id="description"
              placeholder="Add an optional description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="flex min-h-[100px] w-full rounded-xl border border-transparent bg-accent/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:border-primary transition-colors"
            />
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-accent/30">
            <div className="space-y-0.5">
              <label className="text-sm font-bold">Public Playlist</label>
              <p className="text-xs text-muted-foreground">Anyone can listen to this playlist</p>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, is_public: !formData.is_public })}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                formData.is_public ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                  formData.is_public ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <DialogFooter className="pt-4">
            <Button
              type="submit"
              disabled={isLoading || !formData.title.trim()}
              className="w-full h-12 rounded-xl font-bold text-lg shadow-lg shadow-primary/20"
            >
              {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              Create Playlist
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

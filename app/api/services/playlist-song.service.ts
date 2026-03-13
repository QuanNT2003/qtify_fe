import { apiFetch } from "../base";
import { PlaylistSong, CreatePlaylistSongDto, UpdateOrderDto } from "../types";

export const playlistSongService = {
  addSongToPlaylist: async (data: CreatePlaylistSongDto): Promise<PlaylistSong> => {
    return apiFetch<PlaylistSong>("/playlist-song", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  getSongsInPlaylist: async (playlistId: string): Promise<PlaylistSong[]> => {
    return apiFetch<PlaylistSong[]>(`/playlist-song/playlist/${playlistId}`);
  },

  updateSongOrder: async (
    playlistId: string,
    songId: string,
    data: UpdateOrderDto,
  ): Promise<PlaylistSong> => {
    return apiFetch<PlaylistSong>(`/playlist-song/${playlistId}/${songId}/order`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  removeSongFromPlaylist: async (
    playlistId: string,
    songId: string,
  ): Promise<void> => {
    return apiFetch<void>(`/playlist-song/${playlistId}/${songId}`, {
      method: "DELETE",
    });
  },
};

import { apiFetch } from "../base";
import { Playlist, GetPlaylistsParams, PaginatedResult, CreatePlaylistDto, UpdatePlaylistDto } from "../types";

export const playlistService = {
  getPlaylists: async (
    params: GetPlaylistsParams = {},
  ): Promise<PaginatedResult<Playlist>> => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.per_page)
      queryParams.append("per_page", params.per_page.toString());

    const queryString = queryParams.toString();
    const endpoint = `/playlist${queryString ? `?${queryString}` : ""}`;

    return apiFetch<PaginatedResult<Playlist>>(endpoint);
  },

  getPlaylistById: async (id: string): Promise<Playlist> => {
    return apiFetch<Playlist>(`/playlist/${id}`);
  },

  createPlaylist: async (data: CreatePlaylistDto): Promise<Playlist> => {
    return apiFetch<Playlist>("/playlist", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  updatePlaylist: async (id: string, data: UpdatePlaylistDto): Promise<Playlist> => {
    return apiFetch<Playlist>(`/playlist/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  deletePlaylist: async (id: string): Promise<void> => {
    return apiFetch<void>(`/playlist/${id}`, {
      method: "DELETE",
    });
  },
};

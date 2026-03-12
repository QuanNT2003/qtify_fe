import { apiFetch } from "../base";
import { Song, GetSongsParams, PaginatedResult } from "../types";

export const songService = {
  getSongs: async (
    params: GetSongsParams = {},
  ): Promise<PaginatedResult<Song>> => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.per_page)
      queryParams.append("per_page", params.per_page.toString());
    if (params.title) queryParams.append("title", params.title);

    if (params.artist_ids) {
      queryParams.append(
        "artist_ids",
        Array.isArray(params.artist_ids)
          ? params.artist_ids.join(",")
          : params.artist_ids,
      );
    }

    if (params.genre_ids) {
      queryParams.append(
        "genre_ids",
        Array.isArray(params.genre_ids)
          ? params.genre_ids.join(",")
          : params.genre_ids,
      );
    }

    if (params.album_ids) {
      queryParams.append(
        "album_ids",
        Array.isArray(params.album_ids)
          ? params.album_ids.join(",")
          : params.album_ids,
      );
    }

    const queryString = queryParams.toString();
    const endpoint = `/song${queryString ? `?${queryString}` : ""}`;

    return apiFetch<PaginatedResult<Song>>(endpoint);
  },

  getSongById: async (id: string): Promise<Song> => {
    return apiFetch<Song>(`/song/${id}`);
  },

  createSong: async (formData: FormData): Promise<Song> => {
    return apiFetch<Song>("/song", {
      method: "POST",
      body: formData,
      headers: {},
    });
  },

  updateSong: async (id: string, formData: FormData): Promise<Song> => {
    return apiFetch<Song>(`/song/${id}`, {
      method: "PATCH",
      body: formData,
      headers: {},
    });
  },

  deleteSong: async (id: string): Promise<void> => {
    return apiFetch<void>(`/song/${id}`, {
      method: "DELETE",
    });
  },

  uploadAudio: async (id: string, file: File): Promise<Song> => {
    const formData = new FormData();
    formData.append("file", file);

    return apiFetch<Song>(`/song/${id}/audio`, {
      method: "POST",
      body: formData,
      headers: {},
    });
  },
};

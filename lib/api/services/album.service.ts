import { apiFetch } from "../base";
import { Album, GetAlbumsParams, PaginatedResult } from "../types";

export const albumService = {
  getAlbums: async (
    params: GetAlbumsParams = {},
  ): Promise<PaginatedResult<Album>> => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.per_page)
      queryParams.append("per_page", params.per_page.toString());
    if (params.title) queryParams.append("title", params.title);
    if (params.artist_id) queryParams.append("artist_id", params.artist_id);

    const queryString = queryParams.toString();
    const endpoint = `/album${queryString ? `?${queryString}` : ""}`;

    return apiFetch<PaginatedResult<Album>>(endpoint);
  },

  getAlbumById: async (id: string): Promise<Album> => {
    return apiFetch<Album>(`/album/${id}`);
  },

  createAlbum: async (formData: FormData): Promise<Album> => {
    return apiFetch<Album>("/album", {
      method: "POST",
      body: formData,
      // For multipart/form-data, we should not set Content-Type header manually
      // because the browser will set it with the correct boundary.
      headers: {},
    });
  },

  updateAlbum: async (id: string, formData: FormData): Promise<Album> => {
    return apiFetch<Album>(`/album/${id}`, {
      method: "PATCH",
      body: formData,
      headers: {},
    });
  },

  deleteAlbum: async (id: string): Promise<void> => {
    return apiFetch<void>(`/album/${id}`, {
      method: "DELETE",
    });
  },

  uploadCover: async (id: string, file: File): Promise<Album> => {
    const formData = new FormData();
    formData.append("file", file);

    return apiFetch<Album>(`/album/${id}/cover`, {
      method: "POST",
      body: formData,
      headers: {},
    });
  },
};

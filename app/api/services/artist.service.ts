import { apiFetch } from "../base";
import { Artist, GetArtistsParams, PaginatedResult } from "../types";

export const artistService = {
  getArtists: async (
    params: GetArtistsParams = {},
  ): Promise<PaginatedResult<Artist>> => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.per_page)
      queryParams.append("per_page", params.per_page.toString());
    if (params.name) queryParams.append("name", params.name);

    const queryString = queryParams.toString();
    const endpoint = `/artist${queryString ? `?${queryString}` : ""}`;

    return apiFetch<PaginatedResult<Artist>>(endpoint);
  },

  getArtistById: async (id: string): Promise<Artist> => {
    return apiFetch<Artist>(`/artist/${id}`);
  },

  createArtist: async (formData: FormData): Promise<Artist> => {
    return apiFetch<Artist>("/artist", {
      method: "POST",
      body: formData,
      headers: {},
    });
  },

  updateArtist: async (id: string, formData: FormData): Promise<Artist> => {
    return apiFetch<Artist>(`/artist/${id}`, {
      method: "PATCH",
      body: formData,
      headers: {},
    });
  },

  deleteArtist: async (id: string): Promise<void> => {
    return apiFetch<void>(`/artist/${id}`, {
      method: "DELETE",
    });
  },

  uploadAvatar: async (id: string, file: File): Promise<Artist> => {
    const formData = new FormData();
    formData.append("file", file);

    return apiFetch<Artist>(`/artist/${id}/avatar`, {
      method: "POST",
      body: formData,
      headers: {},
    });
  },
};

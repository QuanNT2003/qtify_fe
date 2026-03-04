import { apiFetch } from "../base";
import { Genre, GetGenresParams, PaginatedResult } from "../types";

export const genreService = {
  getGenres: async (
    params: GetGenresParams = {},
  ): Promise<PaginatedResult<Genre>> => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.per_page)
      queryParams.append("per_page", params.per_page.toString());
    if (params.name) queryParams.append("name", params.name);

    const queryString = queryParams.toString();
    const endpoint = `/genre${queryString ? `?${queryString}` : ""}`;

    return apiFetch<PaginatedResult<Genre>>(endpoint);
  },

  getGenreById: async (id: string): Promise<Genre> => {
    return apiFetch<Genre>(`/genre/${id}`);
  },

  createGenre: async (name: string, description?: string): Promise<Genre> => {
    return apiFetch<Genre>("/genre", {
      method: "POST",
      body: JSON.stringify({ name, description }),
    });
  },

  updateGenre: async (
    id: string,
    data: Partial<{ name: string; description: string }>,
  ): Promise<Genre> => {
    return apiFetch<Genre>(`/genre/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  deleteGenre: async (id: string): Promise<void> => {
    return apiFetch<void>(`/genre/${id}`, {
      method: "DELETE",
    });
  },
};

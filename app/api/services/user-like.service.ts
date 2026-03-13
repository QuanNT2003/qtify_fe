import { baseApi } from "../base";
import { UserLike, CreateUserLikeDto } from "../types";

export const userLikeService = {
  /** Like a song */
  likeSong: (data: CreateUserLikeDto) =>
    baseApi.post<UserLike>("/user-like", data),

  /** Unlike a song by userId + songId (admin/direct route) */
  unlikeSong: (userId: string, songId: string) =>
    baseApi.delete<void>(`/user-like/${userId}/${songId}`),

  /** Unlike a song using the current user's token */
  unlikeMySong: (songId: string) =>
    baseApi.delete<void>(`/user-like/me/${songId}`),

  /** Get liked songs of the currently authenticated user (uses token, returns is_liked: true on each song) */
  getMyLikedSongs: () => baseApi.get<UserLike[]>("/user-like/me"),

  /** Get liked songs by userId param */
  getUserLikedSongs: (userId: string) =>
    baseApi.get<UserLike[]>(`/user-like/user/${userId}`),

  getSongLikes: (songId: string) =>
    baseApi.get<UserLike[]>(`/user-like/song/${songId}`),
};

import { baseApi } from "../base";
import { UserLike, CreateUserLikeDto } from "../types";

export const userLikeService = {
  likeSong: (data: CreateUserLikeDto) => 
    baseApi.post<UserLike>("/user-like", data),

  unlikeSong: (userId: string, songId: string) => 
    baseApi.delete<void>(`/user-like/${userId}/${songId}`),

  getUserLikedSongs: (userId: string) => 
    baseApi.get<UserLike[]>(`/user-like/user/${userId}`),
    
  getSongLikes: (songId: string) =>
    baseApi.get<UserLike[]>(`/user-like/song/${songId}`),
};

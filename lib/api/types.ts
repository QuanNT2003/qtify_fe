export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}

export interface PaginationMeta {
  page: number;
  per_page: number;
  total: number;
  total_page: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: PaginationMeta;
}

export interface Genre {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface GetGenresParams {
  page?: number;
  per_page?: number;
  name?: string;
}

export enum AlbumType {
  SINGLE = "SINGLE",
  ALBUM = "ALBUM",
  EP = "EP",
}

export interface Artist {
  id: string;
  name: string;
  bio?: string;
  profile_image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Song {
  id: string;
  title: string;
  artist_id: string;
  album_id?: string;
  duration: number;
  audio_url: string;
  lyrics?: string;
  created_at: string;
  updated_at: string;
  artist?: Artist;
}

export interface Album {
  id: string;
  title: string;
  artist_id: string;
  release_date: string;
  cover_image_url?: string;
  type: AlbumType;
  created_at: string;
  updated_at: string;
  artist?: Artist;
  songs?: Song[];
}

export interface GetAlbumsParams {
  page?: number;
  per_page?: number;
  title?: string;
  artist_id?: string;
}

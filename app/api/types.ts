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
  avatar_url?: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface GetArtistsParams {
  page?: number;
  per_page?: number;
  name?: string;
}

export interface SongArtist {
  song_id: string;
  artist_id: string;
  role: string;
  artist: Artist;
}

export interface SongGenre {
  song_id: string;
  genre_id: string;
  genre: Genre;
}

export interface Song {
  id: string;
  title: string;
  artist_id: string;
  album_id?: string;
  duration: number;
  file_url: string;
  lyrics?: string;
  play_count: number;
  track_number?: number;
  created_at: string;
  updated_at: string;
  artist?: Artist;
  featured_artists?: SongArtist[];
  genres?: SongGenre[];
  album?: Album;
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
  artist_ids?: string | string[];
}

export interface GetSongsParams {
  page?: number;
  per_page?: number;
  title?: string;
  artist_ids?: string | string[];
  genre_ids?: string | string[];
  album_ids?: string | string[];
}

export interface Playlist {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  songs?: PlaylistSong[];
}

export interface PlaylistSong {
  playlist_id: string;
  song_id: string;
  added_at: string;
  song: Song;
}

export interface GetPlaylistsParams {
  page?: number;
  per_page?: number;
}

export interface CreatePlaylistDto {
  title: string;
  description?: string;
  is_public?: boolean;
}

export type UpdatePlaylistDto = Partial<CreatePlaylistDto>;

export interface CreatePlaylistSongDto {
  playlist_id: string;
  song_id: string;
}

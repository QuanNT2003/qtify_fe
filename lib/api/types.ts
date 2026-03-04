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

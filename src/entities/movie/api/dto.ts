export interface TmdbGenreDto {
  id: number;
  name: string;
}

export interface TmdbGenresResponseDto {
  genres: TmdbGenreDto[];
}

export interface TmdbMovieDto {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  overview: string;
}

export interface TmdbPaginatedResponseDto<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

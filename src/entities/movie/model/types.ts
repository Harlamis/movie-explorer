export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  releaseYear: string;
  rating: number;
  // Genres store ready for render strings because we don't need their IDs here
  genres: string[];
  overview: string;
}

export interface MoviesPageResult {
  movies: Movie[];
  page: number;
  totalPages: number;
  totalResults: number;
}

// We use the same sorting query naming as the API itself so we won't have to map them in repository layer
export type MovieSortBy =
  | "popularity.desc"
  | "vote_average.desc"
  | "primary_release_date.desc"
  | "popularity.asc"
  | "vote_average.asc"
  | "primary_release_date.asc";

export interface MoviesFilterParams {
  page: number;
  query?: string;
  genreId?: number;
  sortBy: MovieSortBy;
}

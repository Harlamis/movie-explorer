import type { Genre, Movie, MoviesPageResult } from "../model/types";
import type {
  TmdbGenreDto,
  TmdbMovieDto,
  TmdbPaginatedResponseDto,
} from "./dto";

const TMDB_IMAGE_BASE_URL =
  import.meta.env.VITE_TMDB_IMAGE_URL || "https://image.tmdb.org/t/p";
const POSTER_SIZE = "w500";
const FALLBACK_POSTER_URL =
  "https://placehold.co/500x750/18181b/a1a1aa?text=No+Poster";

export const mapGenresToMap = (genres: TmdbGenreDto[]): Map<number, string> => {
  return new Map(genres.map((genre) => [genre.id, genre.name]));
};

export const mapGenreDtoToDomain = (dto: TmdbGenreDto): Genre => {
  return {
    id: dto.id,
    name: dto.name,
  };
};

export const mapMovieDtoToDomain = (
  dto: TmdbMovieDto,
  genresMap: Map<number, string>,
): Movie => {
  const posterPath = dto.poster_path
    ? `${TMDB_IMAGE_BASE_URL}/${POSTER_SIZE}${dto.poster_path}`
    : FALLBACK_POSTER_URL;
  // We use type predicate to tell the compiler that name is of <string> type and not of <string | undefined>
  const genres = dto.genre_ids
    .map((id) => genresMap.get(id))
    .filter((name): name is string => Boolean(name));
  return {
    id: dto.id,
    title: dto.title,
    posterUrl: posterPath,
    // We only need a year so we slice release date
    releaseYear: dto.release_date?.slice(0, 4) || "N/A",
    rating: Number(dto.vote_average.toFixed(1)),
    genres: genres,
    overview: dto.overview || "No description available.",
  };
};

export const mapMoviesPageDtoToDomain = (
  dto: TmdbPaginatedResponseDto<TmdbMovieDto>,
  genresMap: Map<number, string>,
): MoviesPageResult => {
  return {
    movies: dto.results.map((movieDto) =>
      mapMovieDtoToDomain(movieDto, genresMap),
    ),
    page: dto.page,
    // TMDB does not allow more than 500 pages on free plan
    totalPages: Math.min(dto.total_pages, 500),
    totalResults: dto.total_results,
  };
};

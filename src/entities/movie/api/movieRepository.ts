import { tmdbClient, type HttpClient } from "@/shared/api";
import type {
  Genre,
  MoviesFilterParams,
  MoviesPageResult,
} from "../model/types";
import type {
  TmdbGenresResponseDto,
  TmdbMovieDto,
  TmdbPaginatedResponseDto,
} from "./dto";
import {
  mapGenreDtoToDomain,
  mapGenresToMap,
  mapMoviesPageDtoToDomain,
} from "./movieMappers";

export interface MovieRepository {
  getGenres: () => Promise<Genre[]>;
  getMovies: (filterParams: MoviesFilterParams) => Promise<MoviesPageResult>;
}

// Here we needed to abstract from httpClient initialization, or just declare httpClient as of AxiosInstance type but that would be implementation details leak
export const createMovieRepository = (
  httpClient: HttpClient = tmdbClient,
): MovieRepository => {
  let genresMapPromise: Promise<Map<number, string>> | null = null;
  const getGenresMap = () => {
    if (!genresMapPromise) {
      genresMapPromise = httpClient
        .get<TmdbGenresResponseDto>("/genre/movie/list")
        .then((res) => mapGenresToMap(res.data.genres))
        .catch((err) => {
          genresMapPromise = null;
          throw err;
        });
    }
    return genresMapPromise;
  };
  const getGenres = async () => {
    const { data } =
      await httpClient.get<TmdbGenresResponseDto>("/genre/movie/list");
    return data.genres.map((g) => mapGenreDtoToDomain(g));
  };

  const getMovies = async (params: MoviesFilterParams) => {
    const query = params.query?.trim();
    const moviesPromise = httpClient.get<
      TmdbPaginatedResponseDto<TmdbMovieDto>
    >(query ? "/search/movie" : "/discover/movie", {
      params: query
        ? {
            query,
            page: params.page,
          }
        : {
            page: params.page,
            sort_by: params.sortBy,
            with_genres: params.genreId,
          },
    });
    const [moviesResponse, genresMap] = await Promise.all([
      moviesPromise,
      getGenresMap(),
    ]);
    const result = mapMoviesPageDtoToDomain(moviesResponse.data, genresMap);
    if (query && params.genreId) {
        const genre = genresMap.get(params.genreId);
        result.movies = genre
          ? result.movies.filter((movie) => movie.genres.includes(genre))
            : result.movies;
    }
  };
};

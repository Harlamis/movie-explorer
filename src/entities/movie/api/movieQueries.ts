import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { MoviesFilterParams } from "../model/types";
import { movieRepository } from "./movieRepository";

export const movieKeys = {
  all: ["movies"] as const,
  genres: () => [...movieKeys.all, "genres"] as const,
  lists: () => [...movieKeys.all, "list"] as const,
  list: (params: MoviesFilterParams) => [...movieKeys.lists(), params] as const,
};

export const useGenresQuery = () =>
  useQuery({
    queryKey: movieKeys.genres(),
    queryFn: movieRepository.getGenres,
    staleTime: Infinity,
  });

export const useMoviesQuery = (params: MoviesFilterParams) =>
  useQuery({
    queryKey: movieKeys.list(params),
    queryFn: () => movieRepository.getMovies(params),
    placeholderData: keepPreviousData,
  });

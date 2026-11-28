import {
  MOVIE_SORT_OPTIONS,
  type MoviesFilterParams,
  type MovieSortBy,
} from "@/entities/movie";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

const isMovieSortBy = (value: string | null): value is MovieSortBy => {
  return (MOVIE_SORT_OPTIONS as readonly string[]).includes(value ?? "");
};

export interface UseMovieFilterParamsReturn {
  params: MoviesFilterParams;
  setQuery: (query: string) => void;
  setGenreId: (id: number | undefined) => void;
  setSortBy: (sortBy: MovieSortBy) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

export const useMovieFilterParams = (): UseMovieFilterParamsReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => {
    const query = searchParams.get("query")?.trim() || undefined;

    const parsedGenreId = Number(searchParams.get("genre"));
    const genreId =
      Number.isInteger(parsedGenreId) && parsedGenreId > 0
        ? parsedGenreId
        : undefined;

    const parsedSortBy = searchParams.get("sort");
    const sortBy = isMovieSortBy(parsedSortBy)
      ? parsedSortBy
      : "popularity.desc";

    const parsedPage = Number(searchParams.get("page"));
    const page =
      Number.isInteger(parsedPage) && parsedPage >= 1 ? parsedPage : 1;
    return { query, genreId, sortBy, page };
  }, [searchParams]);

  const setQuery = useCallback(
    (query: string) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        const trimmed = query.trim();
        if (trimmed) {
          next.set("query", trimmed);
        } else next.delete("query");
        next.delete("page");
        return next;
      });
    },
    [setSearchParams],
    );
    
    const setGenreId = useCallback()
};

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { httpClient } from "@/lib/axios";
import { ApiPaginatedResponse, Movie, MovieDetails } from "@/types/api-response";

export const useMovieDetails = (id: string) => {
  return useQuery({
    queryKey: ["movie", "details", id],
    queryFn: async () => {
      const res = await httpClient.get<MovieDetails>(`/api/movies/${id}?append_to_response=credits,images,recommendations,videos`);
      return res.data;
    },
  });
}

export const useMovies = (filteredGenres: string[]) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["movies", filteredGenres],
    queryFn: async ({ pageParam = 1, queryKey }) => {
      const genres = queryKey[1] as string[];
      const res = await httpClient.get<ApiPaginatedResponse<Movie>>(
        `/api/movies?page=${pageParam}&with_genres=${genres.join("|")}`,
      );
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page + 1 <= lastPage.total_pages) return lastPage.page + 1;
    },
  });
}

export const useTopRatedMovies = () => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["movies", "toprated"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await httpClient.get<ApiPaginatedResponse<Movie>>(
        `/api/movies/discover/toprated?page=${pageParam}`,
      );
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page + 1 <= lastPage.total_pages) return lastPage.page + 1;
    },
  });
}

export const useTrendingMovies = () => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["movies", "trending"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await httpClient.get<ApiPaginatedResponse<Movie>>(
        `/api/movies/discover/trending?page=${pageParam}`,
      );
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page + 1 <= lastPage.total_pages) return lastPage.page + 1;
    },
  });
}

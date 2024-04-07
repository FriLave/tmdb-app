import { useInfiniteQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { httpClient } from "@/lib/axios";
import { ApiPaginatedResponse, Serie, SeriesDetail } from "@/types/api-response";


export const useSeriesDetails = (id: string) => {
  return useSuspenseQuery({
    queryKey: ["series", "details", id],
    queryFn: async () => {
      const res = await httpClient.get<SeriesDetail>(`/api/tv/${id}?append_to_response=credits,images,recommendations,videos`);
      return res.data;
    },
  });
}

export const useSeries = (filteredGenres: string[]) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["series", filteredGenres],
    queryFn: async ({ pageParam = 1, queryKey }) => {
      const genres = queryKey[1] as string[];
      const res = await httpClient.get<ApiPaginatedResponse<Serie>>(
        `/api/tv?page=${pageParam}&with_genres=${genres.join("|")}`,
      );
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page + 1 <= lastPage.total_pages) return lastPage.page + 1;
    },
  });
}


export const useTopRatedSeries = () => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["series", "toprated"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await httpClient<ApiPaginatedResponse<Serie>>(
        `/api/tv/discover/toprated?page=${pageParam}`,
      );
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page + 1 <= lastPage.total_pages) return lastPage.page + 1;
    },
  });
}

export const useTrendingSeries = () => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["series", "trending"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await httpClient.get<ApiPaginatedResponse<Serie>>(
        `/api/tv/discover/trending?page=${pageParam}`,
      );
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page + 1 <= lastPage.total_pages) return lastPage.page + 1;
    },
  });
}

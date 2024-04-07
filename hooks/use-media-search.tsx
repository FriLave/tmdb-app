import { useInfiniteQuery } from "@tanstack/react-query";
import { httpClient } from "@/lib/axios";
import { ApiPaginatedResponse, Movie, Serie } from "@/types/api-response";

export const useMediaSearch = (query: string | null) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["search", query],
    queryFn: async ({ pageParam = 1, queryKey }) => {
      const query = queryKey[1] as string;
      const res = await httpClient.get<ApiPaginatedResponse<Movie | Serie>>(
        `/api/search?page=${pageParam}&query=${query}`,
      );
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page + 1 <= lastPage.total_pages) return lastPage.page + 1;
    },
  });
}

import { httpClient } from "@/lib/axios";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { ApiPaginatedResponse, Movie, Serie } from "@/types/api-response";

export const useMediaLiked = () => {
  return useSuspenseInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["media", "likes"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await httpClient.get<ApiPaginatedResponse<Movie | Serie>>(
        `/api/media/liked?page=${pageParam}`,
      );
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page + 1 <= lastPage.total_pages) return lastPage.page + 1;
    },
  });
}

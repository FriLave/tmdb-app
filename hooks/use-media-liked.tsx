import { httpClient } from "@/lib/axios";
import { useMutation, useQueryClient, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { ApiPaginatedResponse, Movie, Serie } from "@/types/api-response";
import { toast } from "@/components/ui/use-toast";

export const useMediaLiked = () => {
  return useSuspenseInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["media", "likes"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await httpClient.get<ApiPaginatedResponse<Movie | Serie>>(
        `/api/media/likes?page=${pageParam}`,
      );
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page + 1 <= lastPage.total_pages) return lastPage.page + 1;
    },
  });
}

export const useMutationMediaLike = (mediaId: number, mediaType: "movie" | "tv") => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await httpClient.patch(`/api/media/${id}/like`, {
        media_type: mediaType,
      });
    },
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["media", "likes"] });
      toast({
        title: "Succès",
        description: "Votre like a été pris en compte",
      });
    },
  });
}

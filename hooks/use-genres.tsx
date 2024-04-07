import { useSuspenseQuery } from "@tanstack/react-query";
import { Genre } from "@/types/api-response";
import { httpClient } from "@/lib/axios";

export const useGenres = (mediaType: 'tv' | 'movies') => {
  return useSuspenseQuery({
    queryKey: ["genres", mediaType],
    queryFn: async () => {
      const res = await httpClient.get<Genre[]>(`/api/${mediaType}/genres`);
      return res.data;
    },
  });
};

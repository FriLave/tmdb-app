import { useSuspenseQuery } from "@tanstack/react-query";
import { httpClient } from "@/lib/axios";
import { Movie, Serie } from "@/types/api-response";

export const useMediaRecommended = () => {
  return useSuspenseQuery({
    queryKey: ["media", "recommendations"],
    queryFn: async () => {
      const res = await httpClient.get<(Movie | Serie)[]>(`/api/media/recommendations`);
      return res.data;
    },
  });
}

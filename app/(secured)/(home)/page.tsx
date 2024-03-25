"use client";

import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/lib/axios";
import { ApiPaginatedResponse, Movie, Serie } from "@/types/api-response";
import { MediaList } from "@/components/media-list";
import React from "react";

export default function Home() {
  const { data: movies, isLoading: isMoviesLoading } = useQuery({
    queryKey: ["movies", "toprated"],
    queryFn: async () => {
      const res = await httpClient<ApiPaginatedResponse<Movie>>(
        "/api/movies/discover/toprated",
      );
      return res.data;
    },
  });

  const { data: tv, isLoading: isTvLoading } = useQuery({
    queryKey: ["tv", "toprated"],
    queryFn: async () => {
      const res = await httpClient<ApiPaginatedResponse<Serie>>(
        "/api/tv/discover/toprated",
      );
      return res.data;
    },
  });

  return (
    <div className={"flex flex-col gap-4 sm:gap-8"}>
      <MediaList
        title={"Films"}
        description={"Découvrez de nombreux films"}
        noDataMessage={"Aucun film trouvé"}
        separator={true}
        medias={movies?.results?.map((movie) => ({
          id: movie.id,
          href: `/movies/${movie.id}`,
          src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          title: movie.title,
          description: movie.release_date.split("-")[0],
        }))}
        isLoading={isMoviesLoading}
      />
      <MediaList
        title={"Series"}
        description={"Découvrez de nombreuses séries"}
        noDataMessage={"Aucune série trouvé"}
        separator={true}
        medias={tv?.results?.map((tv) => ({
          id: tv.id,
          href: `/series/${tv.id}`,
          src: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
          title: tv.name,
          description: tv.first_air_date.split("-")[0],
        }))}
        isLoading={isTvLoading}
      />
    </div>
  );
}

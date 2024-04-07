"use client";

import { MediaList } from "../../../../components/media-list";
import React from "react";
import { useTopRatedMovies, useTrendingMovies } from "../../../../hooks/use-movies";
import { useTopRatedSeries, useTrendingSeries } from "@/hooks/use-series";

export default function Home() {
  const { data: trendingMovies } = useTrendingMovies()
  const { data: trendingSeries } = useTrendingSeries()


  const { data: movies } = useTopRatedMovies()
  const { data: series } = useTopRatedSeries()


  return (
    <div className={"flex flex-col gap-4 sm:gap-8"}>
      <MediaList
        title={"Films en tendance cette semaine"}
        description={"Découvrez de nombreux films"}
        noDataMessage={"Aucun film trouvé"}
        seeMoreLink={"/movies/trending"}
        separator={true}
        medias={trendingMovies?.pages[0].results?.map((movie) => ({
          id: movie.id,
          href: `/movies/${movie.id}`,
          src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          title: movie.title,
          description: movie.release_date.split("-")[0],
        }))}
      />
      <MediaList
        title={"Series en tendance cette semaine"}
        description={"Découvrez de nombreuses séries"}
        noDataMessage={"Aucune série trouvé"}
        seeMoreLink={"/series/trending"}
        separator={true}
        medias={trendingSeries?.pages[0].results?.map((tv) => ({
          id: tv.id,
          href: `/series/${tv.id}`,
          src: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
          title: tv.name,
          description: tv.first_air_date.split("-")[0],
        }))}
      />
      <MediaList
        title={"Films les mieux notés"}
        description={"Découvrez de nombreux films"}
        noDataMessage={"Aucun film trouvé"}
        seeMoreLink={"/movies/toprated"}
        separator={true}
        medias={movies?.pages[0].results?.map((movie) => ({
          id: movie.id,
          href: `/movies/${movie.id}`,
          src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          title: movie.title,
          description: movie.release_date.split("-")[0],
        }))}
      />
      <MediaList
        title={"Series les mieux notées"}
        description={"Découvrez de nombreuses séries"}
        noDataMessage={"Aucune série trouvé"}
        seeMoreLink={"/series/toprated"}
        separator={true}
        medias={series?.pages[0].results?.map((tv) => ({
          id: tv.id,
          href: `/series/${tv.id}`,
          src: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
          title: tv.name,
          description: tv.first_air_date.split("-")[0],
        }))}
      />
    </div>
  );
}

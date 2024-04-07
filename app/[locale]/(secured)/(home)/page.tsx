"use client";

import { MediaList } from "../../../../components/media-list";
import React from "react";
import { useTopRatedMovies, useTrendingMovies } from "../../../../hooks/use-movies";
import { useTopRatedSeries, useTrendingSeries } from "@/hooks/use-series";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");

  const { data: trendingMovies } = useTrendingMovies()
  const { data: trendingSeries } = useTrendingSeries()


  const { data: movies } = useTopRatedMovies()
  const { data: series } = useTopRatedSeries()


  return (
    <div className={"flex flex-col gap-4 sm:gap-8"}>
      <MediaList
        title={t("Movies.Trending.title")}
        description={t("Movies.Trending.description")}
        noDataMessage={t("Movies.empty")}
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
        title={t("Series.Trending.title")}
        description={t("Series.Trending.description")}
        noDataMessage={t("Series.empty")}
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
        title={t("Movies.MostRated.title")}
        description={t("Movies.MostRated.description")}
        noDataMessage={t("Movies.empty")}
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
        title={t("Series.MostRated.title")}
        description={t("Series.MostRated.description")}
        noDataMessage={t("Series.empty")}
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

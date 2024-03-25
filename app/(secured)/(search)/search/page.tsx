"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { ApiPaginatedResponse, Movie, Serie } from "@/types/api-response";
import { MediaCard } from "@/components/media-card";
import { httpClient } from "@/lib/axios";
import { InfiniteScrollLayout } from "@/components/infinite-scroll-layout";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
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

  return (
    <div className={"flex flex-col gap-4"}>
      <h1 className={"text-2xl"}>
        Résulats de recherche pour <strong>{query}</strong>...
      </h1>
      <InfiniteScrollLayout
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      >
        <div
          className={
            "grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-7"
          }
        >
          {data?.pages?.map((page, i) => (
            <React.Fragment key={i}>
              {page?.results?.map((media) => {
                const isMovie = (media as Movie).title !== undefined;
                const title = isMovie
                  ? (media as Movie).title
                  : (media as Serie).name;
                const releaseDate = isMovie
                  ? (media as Movie).release_date
                  : (media as Serie).first_air_date;
                const href = isMovie
                  ? `/movies/${media.id}`
                  : `/series/${media.id}`;

                return (
                  <MediaCard
                    key={media.id}
                    href={href}
                    src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
                    title={title}
                    description={releaseDate.split("-")[0]}
                    className="w-full"
                    aspectRatio="portrait"
                    width={250}
                    height={330}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </InfiniteScrollLayout>
    </div>
  );
}

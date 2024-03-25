"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { ApiPaginatedResponse, Serie } from "@/types/api-response";
import { MediaCard } from "@/components/media-card";
import { httpClient } from "@/lib/axios";
import { InfiniteScrollLayout } from "@/components/infinite-scroll-layout";

export default function Series() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      initialPageParam: 1,
      queryKey: ["series"],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await httpClient.get<ApiPaginatedResponse<Serie>>(
          `/api/tv?page=${pageParam}`,
        );
        return res.data;
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.page + 1 <= lastPage.total_pages) return lastPage.page + 1;
      },
    });

  return (
    <div className={"flex"}>
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
          {data?.pages?.map((page: ApiPaginatedResponse<Serie>, i) => (
            <React.Fragment key={i}>
              {page.results.map((series) => (
                <MediaCard
                  key={series.id}
                  href={`/series/${series.id}`}
                  src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                  title={series.name}
                  description={series.first_air_date.split("-")[0]}
                  className="w-full"
                  aspectRatio="portrait"
                  width={250}
                  height={330}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </InfiniteScrollLayout>
    </div>
  );
}

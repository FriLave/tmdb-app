"use client";

import React from "react";
import { InfiniteMediaGrid } from "@/components/infinite-media-grid";
import { useTrendingMovies } from "@/hooks/use-movies";

export default function MoviesTrending() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useTrendingMovies()

  return (
    <InfiniteMediaGrid
      data={data}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
}

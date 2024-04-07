"use client";

import React from "react";
import { InfiniteMediaGrid } from "@/components/infinite-media-grid";
import { useTopRatedMovies } from "@/hooks/use-movies";

export default function MoviesTopRated() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useTopRatedMovies()

  return (
    <InfiniteMediaGrid
      data={data}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
}

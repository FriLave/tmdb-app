"use client";

import React from "react";
import { MediaGrid } from "@/components/media-grid";
import { useTrendingMovies } from "@/hooks/use-movies";

export default function MoviesTrending() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useTrendingMovies()

  return (
    <MediaGrid
      data={data}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
}

"use client";

import React from "react";
import { MediaGrid } from "@/components/media-grid";
import { useTopRatedMovies } from "@/hooks/use-movies";

export default function MoviesTopRated() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useTopRatedMovies()

  return (
    <MediaGrid
      data={data}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
}

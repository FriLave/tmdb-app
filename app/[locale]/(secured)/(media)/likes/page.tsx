"use client";

import React from "react";
import { InfiniteMediaGrid } from "@/components/infinite-media-grid";
import { useMediaLiked } from "@/hooks/use-media-liked";

export default function MoviesTrending() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useMediaLiked()

  return (
    <InfiniteMediaGrid
      data={data}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
}

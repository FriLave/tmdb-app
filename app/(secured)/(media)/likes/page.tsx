"use client";

import React from "react";
import { MediaGrid } from "@/components/media-grid";
import { useMediaLiked } from "@/hooks/use-media-liked";

export default function MoviesTrending() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useMediaLiked()

  return (
    <MediaGrid
      data={data}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
}

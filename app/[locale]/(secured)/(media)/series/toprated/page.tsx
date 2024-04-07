"use client";

import React from "react";
import { useTopRatedSeries } from "@/hooks/use-series";
import { InfiniteMediaGrid } from "@/components/infinite-media-grid";

export const dynamic = 'force-dynamic'

export default function SeriesTopRated() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useTopRatedSeries()

  return (
    <InfiniteMediaGrid
      data={data}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
}

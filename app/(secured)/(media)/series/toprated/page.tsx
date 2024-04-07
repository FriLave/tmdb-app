"use client";

import React from "react";
import { useTopRatedSeries } from "@/hooks/use-series";
import { MediaGrid } from "@/components/media-grid";

export const dynamic = 'force-dynamic'

export default function SeriesTopRated() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useTopRatedSeries()

  return (
    <MediaGrid
      data={data}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
}

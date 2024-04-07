"use client";

import React from "react";
import { MediaGrid } from "@/components/media-grid";
import { useTrendingSeries } from "@/hooks/use-series";

export const dynamic = 'force-dynamic'

export default function SeriesTrending() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useTrendingSeries()

  return (
    <MediaGrid
      data={data}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
}

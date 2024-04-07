"use client";

import React, { useState } from "react";
import { MoviesFilterSheet } from "@/components/movies-filter-sheet";
import { useSeries } from "@/hooks/use-series";
import { useGenres } from "@/hooks/use-genres";
import { InfiniteMediaGrid } from "@/components/infinite-media-grid";

export const dynamic = 'force-dynamic'

export default function Series() {
  const [filteredGenres, setFilteredGenres] = useState<string[]>([]);

  const { data: genres } = useGenres('tv')
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useSeries(filteredGenres)

  return (
    <div className={"flex flex-col gap-4  md:flex-row"}>
      <div className="flex flex-1 justify-end">
        <MoviesFilterSheet
          filteredGenres={filteredGenres}
          setFilteredGenres={setFilteredGenres}
          genres={genres}
        />
      </div>
      <InfiniteMediaGrid
        data={data}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
}

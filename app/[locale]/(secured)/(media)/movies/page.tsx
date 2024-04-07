"use client";

import React, { useState } from "react";
import { MoviesFilterSheet } from "@/components/movies-filter-sheet";
import { useGenres } from "@/hooks/use-genres";
import { useMovies } from "@/hooks/use-movies";
import { MediaGrid } from "@/components/media-grid";

export default function MoviesPage() {
  const [filteredGenres, setFilteredGenres] = useState<string[]>([]);

  const { data: genres } = useGenres("movies");
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useMovies(filteredGenres)


  return (
    <div className={"flex flex-col gap-4  md:flex-row"}>
      <div className="flex flex-1 justify-end">
        <MoviesFilterSheet
          filteredGenres={filteredGenres}
          setFilteredGenres={setFilteredGenres}
          genres={genres}
        />
      </div>
      <MediaGrid
        data={data}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}

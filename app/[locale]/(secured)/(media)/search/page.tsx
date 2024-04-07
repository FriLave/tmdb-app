"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { InfiniteMediaGrid } from "@/components/infinite-media-grid";
import { useMediaSearch } from "@/hooks/use-media-search";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useMediaSearch(query)

  return (
    <div className={"flex flex-col gap-4"}>
      <h1 className={"text-2xl"}>
        Résulats de recherche pour <strong>{query}</strong>...
      </h1>
      <InfiniteMediaGrid
        data={data}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
}

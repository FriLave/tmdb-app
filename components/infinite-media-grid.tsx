import { InfiniteScrollLayout } from "@/components/infinite-scroll-layout";
import { ApiPaginatedResponse, Movie, Serie } from "@/types/api-response";
import React, { ReactNode } from "react";
import { InfiniteData } from "@tanstack/react-query";
import { MediaGrid } from "@/components/media-grid";

export interface MediaGridProps {
  data: InfiniteData<ApiPaginatedResponse<Movie | Serie>>;
  emptyMessage?: string | ReactNode;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export const InfiniteMediaGrid = ({ data, emptyMessage, hasNextPage, fetchNextPage, isFetchingNextPage }: MediaGridProps) => {
  return (
    <InfiniteScrollLayout
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    >
      <MediaGrid
        data={data.pages.flatMap(it => it.results)}
        emptyMessage={emptyMessage}
      />
    </InfiniteScrollLayout>
  )
}

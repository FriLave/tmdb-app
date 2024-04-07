import { InfiniteScrollLayout } from "@/components/infinite-scroll-layout";
import { MediaCard } from "@/components/media-card";
import { ApiPaginatedResponse, Movie, Serie } from "@/types/api-response";
import React from "react";
import { InfiniteData } from "@tanstack/react-query";

export interface MediaGridProps {
  data: InfiniteData<ApiPaginatedResponse<Movie | Serie>> | undefined;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;

}

export const MediaGrid = ({ data, hasNextPage, fetchNextPage, isFetchingNextPage }: MediaGridProps) => {
  return (
    <InfiniteScrollLayout
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    >
      <div
        className={
          "grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"
        }
      >
        {data?.pages?.map((page, i) => (
          <React.Fragment key={i}>
            {page?.results?.map((media) => {
              const isMovie = (media as Movie).title !== undefined;
              const title = isMovie
                ? (media as Movie).title
                : (media as Serie).name;
              const releaseDate = isMovie
                ? (media as Movie).release_date
                : (media as Serie).first_air_date;
              const href = isMovie
                ? `/movies/${media.id}`
                : `/series/${media.id}`;

              return (
                <MediaCard
                  key={media.id}
                  href={href}
                  src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
                  title={title}
                  description={releaseDate.split("-")[0]}
                  className="w-full"
                  aspectRatio="portrait"
                  width={250}
                  height={330}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </InfiniteScrollLayout>
  )
}

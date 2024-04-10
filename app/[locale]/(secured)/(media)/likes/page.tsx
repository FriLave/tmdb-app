"use client";

import React from "react";
import { InfiniteMediaGrid } from "@/components/infinite-media-grid";
import { useMediaLiked } from "@/hooks/use-media-liked";
import { ThumbsDown } from "lucide-react";
import { useTranslations } from "next-intl";

export default function MoviesTrending() {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useMediaLiked()
  const t = useTranslations('Likes')
  console.log(data);

  return (
    <InfiniteMediaGrid
      data={data}
      emptyMessage={
        <React.Fragment>
          <ThumbsDown className="mx-auto h-24 w-24 stroke-1 text-muted-foreground" />
          <p className="text-center text-xl text-muted-foreground">{ t('empty') }</p>
            </React.Fragment>
          }
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            />
            );
            }

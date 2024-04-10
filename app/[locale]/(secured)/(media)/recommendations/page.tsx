"use client";

import React from "react";
import { useMediaRecommended } from "@/hooks/use-media-recommended";
import { MediaGrid } from "@/components/media-grid";
import { VideoOff } from "lucide-react";
import { useTranslations } from "next-intl";

export default function MoviesTrending() {
  const { data } = useMediaRecommended()
  const t = useTranslations("Recommendations");

  return (
    <MediaGrid
      data={data}
      emptyMessage={
        <React.Fragment>
          <VideoOff className="mx-auto size-24 stroke-1 text-muted-foreground" />
          <p className="text-center text-xl text-muted-foreground">{ t('empty') }</p>
        </React.Fragment>
      }
    />
  );
}

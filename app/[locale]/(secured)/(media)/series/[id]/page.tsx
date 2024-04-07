"use client";

import { useParams } from "next/navigation";
import * as React from "react";
import { MediaDetails } from "@/components/media-details";
import { useSeriesDetails } from "@/hooks/use-series";

export default function SerieDetailsPage() {
  const params = useParams<{ id: string }>();

  const { data, refetch } = useSeriesDetails(params.id)


  return (
    <MediaDetails media={data!} refetch={refetch} />
  );
}

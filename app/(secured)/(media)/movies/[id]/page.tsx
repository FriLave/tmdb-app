"use client";

import { useParams } from "next/navigation";
import * as React from "react";
import { MediaDetails } from "@/components/media-details";
import { useMovieDetails } from "@/hooks/use-movies";


export default function MovieDetailsPage() {
  const params = useParams<{ id: string }>();

  const { data, refetch } = useMovieDetails(params.id)

  return (
    <MediaDetails media={data!} refetch={refetch} />
  );
}

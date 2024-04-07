"use client";

import React from "react";
import { useMediaRecommended } from "@/hooks/use-media-recommended";
import { MediaGrid } from "@/components/media-grid";

export default function MoviesTrending() {
  const { data } = useMediaRecommended()

  return (
    <MediaGrid data={data} />
  );
}

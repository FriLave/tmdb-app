import React from "react";
import { Movie, Serie } from "@/types/api-response";
import { MediaCard } from "@/components/media-card";


export interface MediaGridProps {
  data: (Movie | Serie)[];

}

export const MediaGrid = ({ data } : MediaGridProps) => {
  return (
    <div
      className={
        "grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"
      }
    >
      {data?.map((media) => {

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
    </div>
  )
}

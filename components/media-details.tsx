import { Movie, MovieDetails, SeriesDetail } from "@/types/api-response";
import { ImageFallback } from "@/components/image-fallback";
import { Badge } from "@/components/ui/badge";
import { CirclePlay, ThumbsUp, TimerIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaList } from "@/components/media-list";
import * as React from "react";
import { useTranslations } from "next-intl";
import { useMutationMediaLike } from "@/hooks/use-media-liked";

interface MediaDetailsProps {
  media: MovieDetails | SeriesDetail;
}

export const MediaDetails = ({ media }: MediaDetailsProps) => {
  const t = useTranslations('MediaDetails')
  const isMovie = (media as MovieDetails).title !== undefined;

  const title = isMovie
    ? (media as MovieDetails).title
    : (media as SeriesDetail).name;

  const releaseDate = isMovie
    ? (media as MovieDetails).release_date
    : (media as SeriesDetail).first_air_date;

  const runtime = (isMovie
    ? (media as MovieDetails).runtime
    : (media as SeriesDetail).episode_run_time.reduce((a, b) => a + b, 0) / (media as SeriesDetail).episode_run_time.length)

  const trailer = media.videos?.results.find((video) => video.type === "Trailer");


  const { mutate } = useMutationMediaLike(media.id, isMovie ? "movie" : "tv")

  const handleTrailerClick = () => {
    if (trailer) {
      window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
    }
  }

  return (
    <>
      <div
        className={"absolute left-0 top-0 -z-10 flex h-[80dvh] w-full"}
        style={{
          backgroundImage: `url(${media?.backdrop_path ? `https://image.tmdb.org/t/p/original${media.backdrop_path}` : undefined})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          maskImage: "linear-gradient(to bottom, transparent, black 0%, black 75%, transparent)",
          opacity: 0.5,
        }}
      ></div>

      <div className={"flex min-h-screen flex-col gap-10 pt-10"}>
        <div className={"flex flex-col items-center gap-14 md:flex-row md:items-start"}>
          <ImageFallback
            src={`https://image.tmdb.org/t/p/w500${media?.poster_path}`}
            alt={title ?? "poster"}
            width={240}
            height={240}
            className={
              "hidden aspect-[3/4] max-h-[300px] rounded-md object-cover lg:block"
            }
          />
          <div className={"flex flex-col gap-3"}>
            <h1
              className={
                "text-3xl font-semibold sm:text-4xl md:text-5xl xl:text-7xl"
              }
            >
              {title} ({releaseDate.split("-")[0]})
            </h1>
            <div className={"flex flex-wrap gap-x-4 gap-y-2"}>
              <Badge>
                <TimerIcon className={"h-4"} />
                {isNaN(runtime) ? "???" : `${runtime} min`}
              </Badge>
              {media.genres.map((genre) => (
                <Badge key={genre.id}>{genre.name}</Badge>
              ))}
            </div>
            <div
              className={
                "py-2 text-justify font-light sm:text-xl md:w-4/5 xl:w-2/3"
              }
            >
              {media.overview}
            </div>
            <div className={'flex gap-4'}>
              <Button
                size={"sm"}
                className={"w-fit"}
                onClick={() => mutate(media.id)}
              >
                <ThumbsUp className={"h-4"} />
                {t('like')} {media.like}
              </Button>
              { trailer &&
                <Button
                  size={"sm"}
                  className={"w-fit"}
                  onClick={handleTrailerClick}
                >
                  <CirclePlay className={"h-4"} />
                  {t('trailer')}
                </Button>
              }
            </div>
          </div>
        </div>

        <MediaList
          title={t('cast')}
          noDataMessage={"Aucun film trouvé"}
          medias={media.credits?.cast
            .sort((it) => it.popularity)
            .map((member) => ({
              id: member.id,
              src: `https://image.tmdb.org/t/p/w500${member.profile_path}`,
              title: member.name,
              description: member.character.split("-")[0],
            }))}
          className={"pt-32"}
          mediaCardClassName={"w-[160px]"}
        />

        <MediaList
          title={t('recommendations')}
          noDataMessage={`Nous n'avons pas suffisamment de données pour vous suggérer des séries basées sur ${title}.`}
          medias={media.recommendations?.results?.map((reco) => {
            const isMovie = (reco as Movie).title !== undefined;
            return ({
              id: reco.id,
              href: isMovie ? `/movies/${reco.id}` : `/series/${reco.id}`,
              src: `https://image.tmdb.org/t/p/w500${reco.poster_path}`,
              title: isMovie ? (reco as Movie).title : (reco as SeriesDetail).name,
              description: isMovie ? (reco as Movie).release_date.split("-")[0] : (reco as SeriesDetail).first_air_date.split("-")[0]
            });
          })}
          mediaCardClassName={"w-[160px]"}
        />
      </div>
    </>
  )

}

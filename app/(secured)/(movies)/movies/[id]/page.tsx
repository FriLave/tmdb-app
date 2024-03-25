"use client";


import {useParams} from "next/navigation";
import {useMutation, useQuery} from "@tanstack/react-query";
import {httpClient} from "@/lib/axios";
import {MovieDetails} from "@/types/api-response";
import * as React from "react";
import {ImageFallback} from "@/components/image-fallback";
import {Badge} from "@/components/ui/badge";
import {ThumbsUp, TimerIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {MediaList} from "@/components/media-list";

export default function MovieDetailsPage() {
    const params = useParams<{ id: string; }>()

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["movie", params.id],
        queryFn: async () => {
            const res = await httpClient.get<MovieDetails>(`/api/movies/${params.id}?append_to_response=credits,images,recommendations,videos`);
            return res.data;
        },
    });

    const { mutate } = useMutation({
        mutationFn: async (id: number) => {
            await httpClient.patch(`/api/movies/${id}/like`)
        },
        onSuccess: () => {
            refetch()
        }
    });

    return (
        <>

            {data &&
                <>
                    <div className={'flex h-[80dvh] w-screen absolute top-0 left-0 -z-10'} style={{
                        backgroundImage: `url(${data?.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : undefined})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        maskImage: 'linear-gradient(to bottom, transparent, black 0%, black 75%, transparent)',
                        opacity: 0.5
                    }}></div>

                    <div className={'flex flex-col gap-10 min-h-screen pt-10'}>
                        <div className={'flex flex-col lg:flex-row gap-14'}>
                            <ImageFallback
                                src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
                                alt={data?.title ?? 'poster'}
                                width={200}
                                height={200}
                                className={"hidden lg:block h-auto w-auto object-cover rounded-md aspect-[3/4]"}
                            />
                            <div className={'flex flex-col gap-3'}>
                                <h1 className={'font-semibold text-3xl sm:text-4xl md:text-5xl xl:text-7xl'}>{data.title} ({data?.release_date.split('-')[0]})</h1>
                                <div className={'flex flex-wrap gap-x-4 gap-y-2'}>
                                    <Badge>
                                        <TimerIcon className={'h-4'}/>
                                        {data.runtime}min
                                    </Badge>
                                    {data.genres.map((genre) => (
                                        <Badge key={genre.id}>{genre.name}</Badge>
                                    ))}
                                </div>
                                <div className={'text-justify font-light text-xl md:w-4/5 xl:w-2/3'}>{data.overview}</div>
                                <Button size={'sm'} className={'w-fit'} onClick={() => mutate(data.id)}>
                                    <ThumbsUp className={'h-4'}/>
                                    Like {data.like}
                                </Button>
                            </div>
                        </div>

                        <MediaList
                            title={"Têtes d'affiche"}
                            noDataMessage={'Aucun film trouvé'}
                            medias={data.credits.cast.sort(it => it.popularity).map((member) => ({
                                id: member.id,
                                src: `https://image.tmdb.org/t/p/w500${member.profile_path}`,
                                title: member.name,
                                description: member.character.split('-')[0]
                            })) }
                            isLoading={isLoading}
                            className={'pt-32'}
                            mediaCardClassName={'w-[150px]'}
                        />

                        <MediaList
                            title={'Recommendations'}
                            noDataMessage={`Nous n'avons pas suffisamment de données pour vous suggérer des séries basées sur ${data.title}.`}
                            medias={data.recommendations?.results?.map((series) => ({
                                id: series.id,
                                href: `/movies/${series.id}`,
                                src: `https://image.tmdb.org/t/p/w500${series.poster_path}`,
                                title: series.title,
                                description: series.release_date.split('-')[0]
                            })) }
                            isLoading={isLoading}
                            mediaCardClassName={'w-[150px]'}
                        />
                    </div>
                </>

            }
        </>
    )

}

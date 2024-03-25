'use client';

import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import React, {useState} from "react";
import {ApiPaginatedResponse, Genre, Movie} from "@/types/api-response";
import {MediaCard} from "@/components/media-card";
import {httpClient} from "@/lib/axios";
import {MoviesFilterSheet} from "@/components/movies-filter-sheet";
import {InfiniteScrollLayout} from "@/components/infinite-scroll-layout";

export default function MoviesPage() {
    const [filteredGenres, setFilteredGenres] = useState<string[]>([]);
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage} = useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ["movies", filteredGenres],
        queryFn: async ({pageParam = 1, queryKey}) => {
            const genres = queryKey[1] as string[];
            const res = await httpClient.get<ApiPaginatedResponse<Movie>>(`/api/movies?page=${pageParam}&with_genres=${genres.join('|')}`);
            return res.data;
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.page + 1 <= lastPage.total_pages)
                return lastPage.page + 1;
        },
    });

    const { data: genres } = useQuery({
        queryKey: ["genres", "movies"],
        queryFn: async () => {
            const res = await httpClient.get<Genre[]>('/api/movies/genres');
            return res.data;
        }
    });


    return (
        <div className={"flex flex-col md:flex-row  gap-4"}>
            <div className="flex-1 flex justify-end">
                <MoviesFilterSheet filteredGenres={filteredGenres} setFilteredGenres={setFilteredGenres} genres={genres} />
            </div>
            <InfiniteScrollLayout fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage}>
                <div className={'grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-7 gap-4'}>
                    {data?.pages?.map((page: ApiPaginatedResponse<Movie>, i) => (
                        <React.Fragment key={i}>
                            {page.results.map((movie: Movie) => (
                                <MediaCard
                                    key={movie.id}
                                    href={`/movies/${movie.id}`}
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    title={movie.title}
                                    description={movie.release_date.split('-')[0]}
                                    className="w-full"
                                    aspectRatio="portrait"
                                    width={250}
                                    height={330}
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </InfiniteScrollLayout>
        </div>
    )
}

import { UseInfiniteQueryResult } from "@tanstack/react-query";
import {PropsWithChildren, useEffect, useRef} from "react";
import type {DefaultError} from "@tanstack/query-core";

interface InfiniteScrollLayoutProps {
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
}

export const InfiniteScrollLayout = ({ hasNextPage, isFetchingNextPage, fetchNextPage, children} : PropsWithChildren<InfiniteScrollLayoutProps>) => {
    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 1,  rootMargin: '0px 0px 30% 0px', }
        );
        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <div>
            {children}
            <div ref={loadMoreRef}/>
        </div>
    )


}

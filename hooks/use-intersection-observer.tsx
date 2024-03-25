import { useEffect, useRef, useState, RefObject } from 'react';

interface UseIntersectionObserverArgs {
    onIntersect: () => void;
    threshold?: number;
    rootMargin?: string;
}

function useIntersectionObserver({
                                     onIntersect,
                                     threshold = 1.0,
                                     rootMargin = '0px',
                                 }: UseIntersectionObserverArgs): (node: HTMLElement | null) => void {
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    onIntersect();
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        const currentObserver = observer.current;

        return () => currentObserver.disconnect();
    }, [onIntersect, threshold, rootMargin]);

    return (node: HTMLElement | null) => {
        if (node) observer.current?.observe(node);
    };
}

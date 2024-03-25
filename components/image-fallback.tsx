import Image, {ImageProps} from "next/image";
import React, {useState} from "react";
import {Skeleton} from "@/components/ui/skeleton";

interface ImageFallbackProps extends Omit<ImageProps, 'src'> {
    src?: string
    fallbackSrc?: string
}

const defaultFallbackSrc = '/placeholder.webp';

export const ImageFallback = (props: ImageFallbackProps) => {
    const [loading, setLoading] = useState(true);
    const { src, fallbackSrc, ...imageProps } = props;
    const [imgSrc, setImgSrc] = useState(src ?? fallbackSrc);


    const handleLoading = () => {
        setLoading(false);
    }

    const handleError = () => {
        setImgSrc(fallbackSrc);
    };

    return (
        <>
            { loading &&
                <Skeleton className={'rounded-md aspect-[3/4]'} />
            }
            <Image
                {...imageProps}
                src={imgSrc ?? defaultFallbackSrc}
                className={`${loading ? 'invisible' : ''} ${imageProps.className}`}
                alt={imageProps.alt ?? 'image'}
                onLoad={handleLoading}
                onError={handleError}
            />

        </>

    )

}

ImageFallback.displayName = 'ImageFallback';

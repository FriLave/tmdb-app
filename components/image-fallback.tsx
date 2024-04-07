import Image, { ImageProps } from "next/image";
import React, { SyntheticEvent, useState } from "react";
import { cn } from "@/lib/utils";

interface ImageFallbackProps extends Omit<ImageProps, "src"> {
  src?: string;
  fallbackSrc?: string;
}

const defaultFallbackSrc = "/vertical-placeholder-image.jpg";

export const ImageFallback = (props: ImageFallbackProps) => {
  const { src, fallbackSrc, ...imageProps } = props;
  const className = imageProps.className?.split(' ').map(it => 'data-[loaded=true]:' + it);

  const [imgSrc, setImgSrc] = useState(src ?? fallbackSrc);

  const handleLoading = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.setAttribute('data-loaded', 'true')
  };

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <Image
      {...imageProps}
      width={500}
      height={750}
      src={imgSrc ?? defaultFallbackSrc}
      data-loaded='false'
      className={cn('data-[loaded=false]:bg-muted rounded-md w-full h-full', className)}
      alt={imageProps.alt ?? "image"}
      onLoad={handleLoading}
      onError={handleError}
    />
  );
};

ImageFallback.displayName = "ImageFallback";

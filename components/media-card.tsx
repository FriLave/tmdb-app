"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { ImageFallback } from "@/components/image-fallback";
import Link, { LinkProps } from "next/link";

interface MediaCardProps extends Partial<LinkProps> {
  src: string;
  title: string;
  description: string;
  className?: string;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export const MediaCard = ({
                            href,
                            src,
                            title,
                            description,
                            aspectRatio = "portrait",
                            width,
                            height,
                            className,
                            ...props
                          }: MediaCardProps) => {
  return (
    <Link
      href={href ?? "#"}
      className={cn(
        "flex flex-col space-y-3",
        className,
      )}
      {...props}
    >
      <div className="flex-1 overflow-hidden rounded-md">
        <ImageFallback
          src={src}
          alt={title}
          width={width}
          height={height}
          className={cn(
            "w-auto object-cover transition-all hover:scale-105 h-full",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square",
          )}
        />
      </div>
      <div className="text-sm">
        <h3 className="font-medium leading-none">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
};

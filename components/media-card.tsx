import {cn} from "@/lib/utils";
import React from "react";
import {ImageFallback} from "@/components/image-fallback";
import {Skeleton} from "@/components/ui/skeleton";
import Link, {LinkProps} from "next/link";

interface MediaCardProps extends Omit<LinkProps, 'href'> {
    href?: string
    src: string
    title: string
    description: string
    className?: string
    aspectRatio?: "portrait" | "square"
    width?: number
    height?: number
    isLoading?: boolean
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
                              isLoading,
                              ...props
                          }: MediaCardProps) => {
    return (
        <Link
            href={href ?? "#"}
            className={cn(
                "space-y-3",
                isLoading || !href && 'pointer-events-none',
                className
            )}
            {...props}
        >
            <div className="overflow-hidden rounded-md">
                {isLoading && (
                    <Skeleton className={cn(
                        `rounded-md h-auto w-auto`,
                        aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                    )}
                    />
                )}
                { !isLoading &&
                    <ImageFallback
                        src={src}
                        alt={title}
                        width={width}
                        height={height}
                        className={cn(
                            "h-auto w-auto object-cover transition-all hover:scale-105",
                            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                        )}
                    />
                }

            </div>
            <div className="space-y-1 text-sm">
                { isLoading ?
                    <>
                        <Skeleton className="h-4 w-[120px]" />
                        <Skeleton className="h-4 w-[75px]" />
                    </>
                    :
                    <>
                        <h3 className="font-medium leading-none">{title}</h3>
                        <p className="text-xs text-muted-foreground">{description}</p>
                    </>
                }
            </div>
        </Link>
    )
}

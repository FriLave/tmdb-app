import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MediaCard } from "@/components/media-card";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CircleChevronRight } from "lucide-react";
import Link from "next/link";

interface MediaItem {
  id: number;
  href?: string;
  src: string;
  title: string;
  description: string;
}

interface MediaListProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  separator?: boolean;
  description?: string;
  noDataMessage?: string;
  seeMoreLink?: string;
  medias?: MediaItem[];
  mediaCardClassName?: string;
}

export const MediaList = ({
                            title,
                            separator,
                            description,
                            noDataMessage,
                            seeMoreLink,
                            medias,
                            mediaCardClassName,
                            ...props
                          }: MediaListProps) => {
  return (
    <div {...props}>
      <div className={`flex items-center justify-between`}>
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        { seeMoreLink && (
          <Link href={seeMoreLink}>
            <Button variant={'ghost'} size={'icon'}>
              <CircleChevronRight size={24} />
            </Button>
          </Link>
        )}
      </div>
      {separator ? (
        <Separator className="my-4" />
      ) : (
        <div className={"my-1"}></div>
      )}
      <div className="relative">
        {!medias || (medias?.length === 0 && <div>{noDataMessage}</div>)}
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {medias?.map((media) => (
              <MediaCard
                key={media.id}
                href={media.href}
                src={media.src}
                title={media.title}
                description={media.description}
                className={cn("w-[200px]", mediaCardClassName)}
                aspectRatio="portrait"
                width={250}
                height={330}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

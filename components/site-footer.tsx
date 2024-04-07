import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <Separator className="mt-4" />
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href={"https://friladorable.me"}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              FriLadorable
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}

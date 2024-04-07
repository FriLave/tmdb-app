"use client";

import * as React from "react";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Clock, Flag, LogOut, RadioTower, User } from "lucide-react";
import { useAuth } from "@/providers/authentication";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/lib/i18n";
import { useQueryClient } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { Icons } from "@/components/icons";


export function UserDropdown() {
  const { signOut } = useAuth()
  const { setTheme } = useTheme();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const query = useQueryClient()

  const handleLocaleChange = (locale: string) => {
    startTransition(() => {
      query.invalidateQueries();
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        {pathname, params},
        {locale: locale}
      );
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="size-8 px-0">
          <User className="absolute rotate-0 scale-100 transition-all" />
          <span className="sr-only">User dropdown</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger disabled={isPending}>
            <Flag className="mr-2 size-4" />
            <span>Langues</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => handleLocaleChange('fr')}>
                <RadioTower className="mr-2 size-4" />
                <span>Français</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLocaleChange('en')}>
                <Clock className="mr-2 size-4" />
                <span>Anglais</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger disabled={isPending}>
              <Icons.sun className="mr-2 size-4 dark:hidden" />
              <Icons.moon className="mr-2 hidden size-4 dark:block" />
              <span>Thèmes</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Icons.sun className="mr-2 size-4" />
                <span>Clair</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Icons.moon className="mr-2 size-4" />
                <span>Sombre</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Icons.laptop className="mr-2 size-4" />
                <span>Système</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 size-4" />
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

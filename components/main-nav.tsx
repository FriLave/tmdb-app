"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface MainNavProps {
    links: { href: string; label: string }[]
}

export function MainNav({ links }: MainNavProps) {
    const pathname = usePathname()

    return (
        <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
                <Icons.logo className="h-6 w-6" />
                <span className="hidden font-bold sm:inline-block">
          TMDB
        </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "transition-colors hover:text-foreground/80",
                            pathname === link.href ? "text-foreground" : "text-foreground/60"
                        )}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </div>
    )
}

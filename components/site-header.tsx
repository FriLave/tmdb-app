import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { CommandMenu } from "@/components/search-input";
import { UserDropdown } from "@/components/user-dropdown";

export function SiteHeader() {
  const links = [
    {
      label: "Films",
      href: "/movies",
    },
    {
      label: "Séries",
      href: "/series",
    },
    {
      label: "Likes",
      href: "/likes",
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav links={links} />
        <MobileNav links={links} />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <div className="flex items-center gap-1">
            <UserDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Suspense } from "react";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container max-w-screen-2xl items-center pt-6">
        <Suspense>
          {children}
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}

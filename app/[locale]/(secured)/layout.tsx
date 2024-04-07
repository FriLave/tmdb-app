import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/loader";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function AuthenticatedLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="container max-w-screen-2xl flex-1 items-center py-6">
        <Suspense fallback={
          <div className={'flex size-full h-[71vh] flex-1 justify-center'}>
            <Spinner size={'xxlarge'} />
          </div>
        }>
          {children}
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}

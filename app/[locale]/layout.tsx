import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import ReactQueryProvider from "@/providers/react-query";
import { AuthProvider } from "@/providers/authentication";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { ProgressBar, ProgressBarProvider } from "react-transition-progress";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "TMDB Clone",
  description: "A clone of the TMDB website",
};

export default function RootLayout({
                                     children,
                                     params: {locale}
                                   }: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
    <body
      className={cn(
        "min-h-screen bg-background font-sans antialiased ",
        fontSans.variable,
      )}
    >
    <ReactQueryProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <AuthProvider>

          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ProgressBarProvider>
              <ProgressBar className="fixed top-[57px] h-0.5 bg-primary shadow-lg shadow-primary" />
              {children}
            </ProgressBarProvider>
            <Toaster />
            <TailwindIndicator />
          </ThemeProvider>
        </AuthProvider>
      </NextIntlClientProvider>
    </ReactQueryProvider>
    </body>
    </html>
  );
}

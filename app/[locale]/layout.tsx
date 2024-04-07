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
import { NextIntlClientProvider } from "next-intl";

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
  return (
    <html lang={locale} suppressHydrationWarning>
    <body
      className={cn(
        "min-h-screen bg-background font-sans antialiased ",
        fontSans.variable,
      )}
    >
    <ReactQueryProvider>
      <AuthProvider>
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
            <TailwindIndicator />
          </ThemeProvider>
        </NextIntlClientProvider>
      </AuthProvider>
    </ReactQueryProvider>
    </body>
    </html>
  );
}

/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { AuthProvider } from "@/providers/authentication";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import ReactQueryProvider from "@/providers/react-query";
import React from "react";
import AuthenticatedLayout from "@/app/[locale]/(secured)/layout";
import Home from "@/app/[locale]/(secured)/(home)/page";

// Mocking Next.js useRouter hook
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
  usePathname() {
    return "/";
  },
  useParams() {
    return { locale: "en" };
  }
}));

describe("Page", () => {
  it("renders a heading", () => {
    render(
      <ReactQueryProvider>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthenticatedLayout>
              <Home />
            </AuthenticatedLayout>
            <Toaster />
            <TailwindIndicator />
          </ThemeProvider>
        </AuthProvider>
      </ReactQueryProvider>,
    );

    const heading = screen.getByText("TMDB");
    expect(heading).toBeInTheDocument();
  });
});

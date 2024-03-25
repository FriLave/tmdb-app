/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import Home from "@/app/(secured)/(home)/page";
import MarketingLayout from "@/app/(secured)/layout";
import RootLayout from "@/app/layout";
import {AuthProvider} from "@/providers/authentication";
import {ThemeProvider} from "@/components/theme-provider";
import {Toaster} from "@/components/ui/toaster";
import {TailwindIndicator} from "@/components/tailwind-indicator";
import ReactQueryProvider from "@/providers/react-query";
import React from "react";


// Mocking Next.js useRouter hook
jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),

        };
    },
    usePathname() {
        return '/';
    }
}));



describe('Page', () => {

    it('renders a heading', () => {
        const push = jest.fn();
        render(
            <ReactQueryProvider>
                <AuthProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                    >
                        <MarketingLayout>
                            <Home />
                        </MarketingLayout>
                        <Toaster />
                        <TailwindIndicator />
                    </ThemeProvider>
                </AuthProvider>
            </ReactQueryProvider>
        )

        const heading = screen.getByText('TMDB')
        expect(heading).toBeInTheDocument()
    })
})

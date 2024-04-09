/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { MediaCard } from "@/components/media-card";
import { ProgressBar, ProgressBarProvider } from "react-transition-progress";

// @ts-expect-error This export exists on react@canary
React.useOptimistic = jest.fn(() => []);

describe("MediaCard", () => {
  it("renders a media card", () => {
    render(
      <MediaCard
        src={"https://via.assets.so/img.jpg?w=400&h=150&tc=blue&bg=#cecece"}
        title={"TMDB"}
        description={"A clone of the TMDB website"}
        width={400}
        height={150}
      />
      , {
        wrapper: ({ children }) => {
          return (
            <ProgressBarProvider>
              <ProgressBar className="fixed top-[57px] h-0.5 bg-primary shadow-lg shadow-primary" />
              {children}
            </ProgressBarProvider>);
        },
      } );

    const title = screen.getByText("A clone of the TMDB website");
    expect(title).toBeInTheDocument();
  });
});

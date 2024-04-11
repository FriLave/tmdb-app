"use client";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientConfig,
  QueryClientProvider
} from "@tanstack/react-query";
import React, { PropsWithChildren, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60000,
    },
  },
};

const ReactQueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [queryClientStore] = useState(new QueryClient(queryClientOptions));

  return (
    <QueryClientProvider client={queryClientStore}>
      <ReactQueryStreamedHydration>
        <HydrationBoundary state={dehydrate(queryClientStore)}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </HydrationBoundary>
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;

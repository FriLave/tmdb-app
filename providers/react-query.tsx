"use client";

import { QueryClient, QueryClientConfig, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    // 5 * 1000
    queries: {
      retry: 1,
      staleTime: 60000,
    },
  },
};

const ReactQueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // State
  const [queryClientStore] = useState(
    () => new QueryClient(queryClientOptions),
  );
  // Return Provider
  return (
    <QueryClientProvider client={queryClientStore}>
      <ReactQueryStreamedHydration>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;

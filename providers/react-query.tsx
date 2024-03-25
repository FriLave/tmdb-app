'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import React, { PropsWithChildren } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const queryClientOptions = {
    defaultOptions: {
        // 5 * 1000
        queries: {
            staleTime: 60000,
        },
    },
};

const ReactQueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
    // State
    const [queryClientStore] = useState(
        () => new QueryClient(queryClientOptions)
    );
    // Return Provider
    return (
        <QueryClientProvider client={queryClientStore}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default ReactQueryProvider;

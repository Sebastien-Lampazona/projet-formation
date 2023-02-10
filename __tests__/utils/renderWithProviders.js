import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import MessagesProvider from 'src/commons/MessagesProvider';
import { render } from '@testing-library/react';

export default (Component) => {

    const queryClient = new QueryClient({
        defaultOptions: {
            staleTime: 1000 * 60, // 1 minute
            queries: {
                retry: false,
                refetchOnWindowFocus: false,
            },
        },
    });
    return render(
        Component,
        {
            wrapper: ({ children }) => (
                <QueryClientProvider client={queryClient}>
                    <RecoilRoot>
                        <BrowserRouter basename="/">
                            <MessagesProvider>
                                {children}
                            </MessagesProvider>
                        </BrowserRouter>
                    </RecoilRoot>
                </QueryClientProvider>
            ),
        }
    );
}
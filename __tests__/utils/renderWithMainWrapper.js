/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import MessagesProvider from 'src/commons/MessagesProvider';

export default (Component) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      staleTime: 1000 * 60, // 1 minute
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      // ✅ no more errors on the console
      error: () => {},
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter basename="/">
          <MessagesProvider>
            {Component}
          </MessagesProvider>
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>,
  );
};

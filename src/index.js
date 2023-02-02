import React, { Suspense } from 'react';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { createRoot } from 'react-dom/client';
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClientProvider } from 'react-query';

import App from 'src/components/App';
import MessagesProvider from 'src/commons/MessagesProvider';
import queryClient from 'src/queryClient';

import packageJSON from '../package.json';

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    release: packageJSON.version,
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    normalizeDepth: 10, // Or however deep you want your state context to be.
  });
}

const container = document.querySelector('#root');
const root = createRoot(container);

const Application = (
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <BrowserRouter basename="/">
        <MessagesProvider>
          <React.StrictMode>
            <Suspense fallback={<h1>Chargement de la page</h1>}>
              <App />
              <ReactQueryDevtools initialIsOpen={false} />
            </Suspense>
          </React.StrictMode>
        </MessagesProvider>
      </BrowserRouter>
    </RecoilRoot>
  </QueryClientProvider>
);

root.render(Application);

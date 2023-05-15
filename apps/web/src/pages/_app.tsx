import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import type { AppProps } from 'next/app';
import relayEnvironment from '@scrib/web/lib/relay-environment';
import { ToastContainer } from 'react-toastify';

import '@scrib/web/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

const logError = (error: Error, info: { componentStack: string }) => {
  // todo send error to sentry
  console.error('Error', error);
  console.error('Info', info);
};

// todo implement fallback component
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ErrorBoundary fallback={<>App Error</>} onError={logError}>
        <HelmetProvider>
          <ToastContainer />
          <RelayEnvironmentProvider environment={relayEnvironment}>
            <Component {...pageProps} />
          </RelayEnvironmentProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </>
  );
}

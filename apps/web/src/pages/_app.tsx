import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
// import { ErrorBoundary } from 'react-error-boundary';
// import { HelmetProvider } from 'react-helmet-async';
import type { AppProps } from 'next/app';
import relayEnvironment from '@scrib/web/lib/relay-environment';
import "@scrib/web/styles/globals.css"

const logError = (error: Error, info: { componentStack: string }) => {
  // todo send error to sentry
  console.error('Error', error);
  console.error('Info', info);
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <ErrorBoundary FallbackComponent={<>App Error</>} onError={logError}> */}
      {/* <HelmetProvider> */}
      <RelayEnvironmentProvider environment={relayEnvironment}>
        <Component {...pageProps} />
      </RelayEnvironmentProvider>
      {/* </HelmetProvider> */}
      {/* </ErrorBoundary> */}
    </>
  );
}

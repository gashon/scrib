import React from 'react';
// import { ErrorBoundary } from 'react-error-boundary';
// import { HelmetProvider } from 'react-helmet-async';
import type { AppProps } from 'next/app';

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
        <Component {...pageProps} />
      {/* </HelmetProvider> */}
      {/* </ErrorBoundary> */}
    </>
  );
}

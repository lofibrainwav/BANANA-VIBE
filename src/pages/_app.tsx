import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { initWebVitals, reportWebVitals } from '@/utils/analytics';
import '@/styles/globals.css';
import { ErrorBoundary } from '@sentry/nextjs';
import { SWRProvider } from '@/lib/swr';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.log('ServiceWorker registration successful');
          },
          (err) => {
            console.log('ServiceWorker registration failed: ', err);
          }
        );
      });
    }

    initWebVitals();
  }, []);

  return (
    <ErrorBoundary fallback={<div>An error has occurred</div>}>
      <SWRProvider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
          <Toaster position="bottom-right" />
        </SessionProvider>
      </SWRProvider>
    </ErrorBoundary>
  );
}

export function reportWebVitals(metric: any) {
  reportWebVitals(metric);
} 
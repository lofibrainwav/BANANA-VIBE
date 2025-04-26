import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV === 'production',
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ['localhost', /^https:\/\/yourwebsite\.com/],
    }),
  ],
});

export function captureError(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, {
    extra: context,
  });
}

export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
  Sentry.captureMessage(message, level);
}

export function setUserContext(user: { id: string; email: string }) {
  Sentry.setUser(user);
}

export function clearUserContext() {
  Sentry.setUser(null);
} 
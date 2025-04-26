import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { AuthProvider } from '@/contexts/AuthContext';
import { SWRConfig } from 'swr';
import { swrConfig } from '@/lib/swr';
import { useReportWebVitals } from 'next/web-vitals';
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ["latin"] });

// 동적 임포트 설정
const Toaster = dynamic(() => import('react-hot-toast').then(mod => mod.Toaster), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Banana Vibe",
  description: "Your personal vibe management platform",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Banana Vibe',
    description: 'Your personal vibe management platform',
    url: '/',
    siteName: 'Banana Vibe',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Banana Vibe',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Banana Vibe',
    description: 'Your personal vibe management platform',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fef9c3' },
    { media: '(prefers-color-scheme: dark)', color: '#1e293b' },
  ],
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export function reportWebVitals(metric: any) {
  // 개발 환경에서만 콘솔에 출력
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
  
  // 프로덕션 환경에서는 분석 서비스로 전송
  if (process.env.NODE_ENV === 'production') {
    // TODO: 분석 서비스로 전송하는 코드 추가
    // 예: Google Analytics, Mixpanel 등
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useReportWebVitals(reportWebVitals);
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SWRConfig value={swrConfig}>
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100">
              {children}
            </main>
            <Toaster position="bottom-right" />
          </SWRConfig>
        </AuthProvider>
      </body>
    </html>
  );
}

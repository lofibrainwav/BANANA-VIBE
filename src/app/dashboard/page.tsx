'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MoodStats } from '@/components/features/MoodStats';
import { LoadingSpinner } from '@/components/ui/loading';
import type { Vibe } from '@/types';
import dynamic from 'next/dynamic';
import { LoadingOverlay } from '@/components/ui/loading-overlay';

// 동적으로 VibeList 컴포넌트 로드
const VibeList = dynamic(() => import('@/components/features/VibeList'), {
  loading: () => <LoadingOverlay message="Loading vibes..." />,
  ssr: false,
});

export default function DashboardPage() {
  const router = useRouter();
  const [initialVibes, setInitialVibes] = useState<Vibe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInitialVibes();
  }, []);

  const fetchInitialVibes = async () => {
    try {
      const response = await fetch('/api/vibes');
      if (!response.ok) {
        throw new Error('Failed to fetch vibes');
      }
      const data = await response.json();
      setInitialVibes(data.items);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <Button onClick={() => router.push('/vibes/new')} className="mt-4">
            Create New Vibe
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Vibes</h1>
        <Button onClick={() => router.push('/vibes/new')}>
          Create New Vibe
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Suspense fallback={<LoadingOverlay message="Loading vibes..." />}>
            <VibeList initialVibes={initialVibes} />
          </Suspense>
        </div>
        <div>
          <MoodStats vibes={initialVibes} />
        </div>
      </div>
    </div>
  );
} 
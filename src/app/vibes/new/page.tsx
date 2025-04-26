'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { VibeForm } from '@/components/features/VibeForm';
import { createVibe } from '@/lib/db/vibe';
import { useAuth } from '@/contexts/AuthContext';
import { LoadingSpinner } from '@/components/ui/Loading';

export default function NewVibePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(data: {
    title: string;
    content: string;
    mood: 'happy' | 'sad' | 'neutral' | 'excited' | 'calm';
    tags: string[];
  }) {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const vibeData = {
        userId: user.uid,
        ...data,
      };

      await createVibe(vibeData);
      router.push('/vibes');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Vibe</h1>
        <p className="mt-2 text-gray-600">Share your current mood and thoughts</p>
      </div>

      {error && (
        <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-500">
          {error}
        </div>
      )}

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <VibeForm onSubmit={handleSubmit} disabled={loading} />
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="rounded-lg bg-white p-6">
            <LoadingSpinner className="h-8 w-8" />
            <p className="mt-2 text-sm text-gray-600">Creating your vibe...</p>
          </div>
        </div>
      )}
    </div>
  );
} 
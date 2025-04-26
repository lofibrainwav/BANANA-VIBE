'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading';
import { VibeForm } from '@/components/features/VibeForm';
import type { Vibe } from '@/types';

interface EditVibePageProps {
  params: {
    id: string;
  };
}

export default function EditVibePage({ params }: EditVibePageProps) {
  const router = useRouter();
  const [vibe, setVibe] = useState<Vibe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVibe();
  }, [params.id]);

  const fetchVibe = async () => {
    try {
      const response = await fetch(`/api/vibes/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch vibe');
      }
      const data = await response.json();
      setVibe(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: {
    title: string;
    content: string;
    mood: string;
  }) => {
    try {
      const response = await fetch(`/api/vibes/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update vibe');
      }

      router.push(`/vibes/${params.id}`);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !vibe) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error || 'Vibe not found'}</p>
          <Button
            onClick={() => router.push('/dashboard')}
            className="mt-4"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
        >
          ← Back
        </Button>
      </div>

      <Card className="p-6">
        <h1 className="mb-6 text-3xl font-bold">Edit Vibe</h1>
        <VibeForm
          initialData={vibe}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
} 
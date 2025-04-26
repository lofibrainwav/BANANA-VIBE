'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading';
import { formatDistanceToNow } from 'date-fns';
import type { Vibe } from '@/types';

interface VibeDetailPageProps {
  params: {
    id: string;
  };
}

export default function VibeDetailPage({ params }: VibeDetailPageProps) {
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

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this vibe?')) {
      return;
    }

    try {
      const response = await fetch(`/api/vibes/${params.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete vibe');
      }

      router.push('/dashboard');
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
      <div className="mb-8 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => router.back()}
        >
          ← Back
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/vibes/${vibe.id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <h1 className="text-3xl font-bold">{vibe.title}</h1>
        <div className="mt-4 flex items-center gap-4">
          <span className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(vibe.createdAt), {
              addSuffix: true,
            })}
          </span>
          <span className="text-sm font-medium capitalize text-yellow-500">
            {vibe.mood}
          </span>
        </div>
        <p className="mt-6 whitespace-pre-wrap text-gray-700">
          {vibe.content}
        </p>
      </Card>
    </div>
  );
} 
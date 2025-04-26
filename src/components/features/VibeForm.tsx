'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MoodSelector } from './MoodSelector';
import { LoadingOverlay } from '@/components/ui/loading-overlay';
import { ErrorMessage } from '@/components/ui/error-message';
import { SuccessMessage } from '@/components/ui/success-message';
import type { Vibe } from '@/types';

interface VibeFormProps {
  initialData?: Vibe;
  onSubmit: (data: {
    title: string;
    content: string;
    mood: string;
  }) => Promise<void>;
}

export function VibeForm({ initialData, onSubmit }: VibeFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [mood, setMood] = useState(initialData?.mood || 'neutral');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await onSubmit({ title, content, mood });
      setSuccess(initialData ? 'Vibe updated successfully!' : 'Vibe created successfully!');
      
      // 잠시 후 대시보드로 이동
      setTimeout(() => {
        if (!initialData) {
          router.push('/dashboard');
        }
      }, 1500);
    } catch (err) {
      setError((err as Error).message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isLoading && <LoadingOverlay message={initialData ? 'Updating...' : 'Creating...'} />}
      
      {error && (
        <ErrorMessage
          message={error}
          action={{
            label: 'Try Again',
            onClick: () => setError(null),
          }}
        />
      )}
      
      {success && (
        <SuccessMessage
          message={success}
          action={{
            label: 'View Dashboard',
            onClick: () => router.push('/dashboard'),
          }}
        />
      )}

      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-gray-700">
          Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your vibe a title"
          disabled={isLoading}
          required
          className="transition-colors focus:border-yellow-500 focus:ring-yellow-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium text-gray-700">
          Content
        </label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts and feelings..."
          disabled={isLoading}
          required
          rows={5}
          className="transition-colors focus:border-yellow-500 focus:ring-yellow-500"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Mood</label>
        <MoodSelector value={mood} onChange={setMood} disabled={isLoading} />
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
          className="transition-colors hover:bg-gray-100"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-yellow-500 text-white transition-colors hover:bg-yellow-600"
        >
          {isLoading ? 'Saving...' : initialData ? 'Save Changes' : 'Create Vibe'}
        </Button>
      </div>
    </form>
  );
} 
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { LoadingOverlay } from '@/components/ui/loading-overlay';
import { ErrorMessage } from '@/components/ui/error-message';
import type { Vibe } from '@/types';

interface VibeListProps {
  initialVibes?: Vibe[];
}

export function VibeList({ initialVibes = [] }: VibeListProps) {
  const router = useRouter();
  const [vibes, setVibes] = useState<Vibe[]>(initialVibes);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  
  const observerRef = useRef<IntersectionObserver>();
  const lastVibeRef = useRef<HTMLDivElement>(null);

  const loadVibes = useCallback(async (cursor?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (cursor) params.set('cursor', cursor);
      if (selectedMood) params.set('mood', selectedMood);
      if (searchQuery) params.set('search', searchQuery);

      const response = await fetch(`/api/vibes?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch vibes');

      const data = await response.json();
      
      setVibes(prev => cursor ? [...prev, ...data.items] : data.items);
      setNextCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [selectedMood, searchQuery]);

  // 초기 데이터 로드
  useEffect(() => {
    loadVibes();
  }, [loadVibes]);

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadVibes(nextCursor);
        }
      },
      { threshold: 0.5 }
    );

    observerRef.current = observer;

    return () => observer.disconnect();
  }, [hasMore, isLoading, loadVibes, nextCursor]);

  // 마지막 아이템 관찰
  useEffect(() => {
    const observer = observerRef.current;
    const lastElement = lastVibeRef.current;

    if (observer && lastElement) {
      observer.observe(lastElement);
    }

    return () => {
      if (observer && lastElement) {
        observer.unobserve(lastElement);
      }
    };
  }, [vibes]);

  // 필터링된 vibes
  const filteredVibes = vibes.filter((vibe) => {
    if (selectedMood && vibe.mood !== selectedMood) {
      return false;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        vibe.title.toLowerCase().includes(query) ||
        vibe.content.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const moods = ['happy', 'sad', 'neutral', 'excited', 'calm'];

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load vibes"
        message={error}
        action={{
          label: 'Try Again',
          onClick: () => loadVibes(),
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search vibes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filter
            <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </Button>
          
          {isFilterOpen && (
            <div className="absolute right-0 top-full z-10 mt-2 w-48 rounded-md border bg-white p-2 shadow-lg">
              <div className="space-y-1">
                <button
                  className={`block w-full rounded-md px-3 py-2 text-left text-sm ${
                    selectedMood === null
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedMood(null)}
                >
                  All Moods
                </button>
                {moods.map((mood) => (
                  <button
                    key={mood}
                    className={`block w-full rounded-md px-3 py-2 text-left text-sm capitalize ${
                      selectedMood === mood
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedMood(mood)}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {filteredVibes.map((vibe, index) => (
          <div
            key={vibe.id}
            ref={index === filteredVibes.length - 1 ? lastVibeRef : null}
          >
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{vibe.title}</h3>
                    <p className="mt-2 text-gray-600 line-clamp-2">{vibe.content}</p>
                    <div className="mt-4 flex items-center gap-4">
                      <span className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(vibe.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                      <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium capitalize text-yellow-800">
                        {vibe.mood}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/vibes/${vibe.id}`)}
                    className="ml-4"
                  >
                    View
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ))}

        {isLoading && (
          <div className="py-4 text-center">
            <LoadingOverlay message="Loading more vibes..." />
          </div>
        )}

        {filteredVibes.length === 0 && !isLoading && (
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
            <p className="text-gray-500">No vibes found</p>
            <Button
              onClick={() => router.push('/vibes/new')}
              className="mt-4"
            >
              Create New Vibe
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 
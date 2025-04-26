'use client';

import { Card } from '@/components/ui/card';
import type { Vibe } from '@/types';

interface MoodStatsProps {
  vibes: Vibe[];
}

export function MoodStats({ vibes }: MoodStatsProps) {
  const moodCounts = vibes.reduce((acc, vibe) => {
    acc[vibe.mood] = (acc[vibe.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalVibes = vibes.length;
  const moodPercentages = Object.entries(moodCounts).map(([mood, count]) => ({
    mood,
    percentage: (count / totalVibes) * 100,
  }));

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold">Mood Distribution</h2>
      <div className="mt-4 space-y-4">
        {moodPercentages.map(({ mood, percentage }) => (
          <div key={mood}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium capitalize">{mood}</span>
              <span className="text-sm text-gray-500">
                {percentage.toFixed(1)}%
              </span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-yellow-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        ))}

        {totalVibes === 0 && (
          <p className="text-center text-sm text-gray-500">
            No vibes recorded yet
          </p>
        )}
      </div>
    </Card>
  );
} 
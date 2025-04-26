'use client';

import { cn } from '@/lib/utils';

type Mood = 'happy' | 'sad' | 'neutral' | 'excited' | 'calm';

const moods: { value: Mood; emoji: string; label: string }[] = [
  { value: 'happy', emoji: '😊', label: 'Happy' },
  { value: 'sad', emoji: '😢', label: 'Sad' },
  { value: 'neutral', emoji: '😐', label: 'Neutral' },
  { value: 'excited', emoji: '🤩', label: 'Excited' },
  { value: 'calm', emoji: '😌', label: 'Calm' },
];

interface MoodSelectorProps {
  value: Mood;
  onChange: (mood: Mood) => void;
  disabled?: boolean;
}

export function MoodSelector({ value, onChange, disabled }: MoodSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {moods.map((mood) => (
        <button
          key={mood.value}
          type="button"
          onClick={() => onChange(mood.value)}
          disabled={disabled}
          className={cn(
            'flex flex-col items-center rounded-lg border p-3 transition-colors',
            value === mood.value
              ? 'border-yellow-500 bg-yellow-50'
              : 'border-gray-200 hover:border-yellow-500 hover:bg-yellow-50',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <span className="text-2xl">{mood.emoji}</span>
          <span className="mt-1 text-sm font-medium text-gray-700">{mood.label}</span>
        </button>
      ))}
    </div>
  );
} 
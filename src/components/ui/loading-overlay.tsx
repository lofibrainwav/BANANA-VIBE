'use client';

import { LoadingSpinner } from './loading';

interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({ message = 'Loading...' }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner className="h-8 w-8 text-yellow-500" />
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
} 
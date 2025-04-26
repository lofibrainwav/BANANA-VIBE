'use client';

import { Button } from './button';
import { XCircle } from 'lucide-react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function ErrorMessage({
  title = 'Error',
  message,
  action,
}: ErrorMessageProps) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <XCircle className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{title}</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{message}</p>
          </div>
          {action && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={action.onClick}
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                {action.label}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
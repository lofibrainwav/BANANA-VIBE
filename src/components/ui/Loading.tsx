export function Loading() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent"></div>
    </div>
  );
}

export function LoadingSpinner({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <div className={`animate-spin rounded-full border-2 border-yellow-500 border-t-transparent ${className}`}></div>
  );
} 
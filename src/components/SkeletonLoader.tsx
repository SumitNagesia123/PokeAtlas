import { cn } from '../utils/cn';

export function SkeletonLoader({ count = 1, className = '' }: { count?: number; className?: string }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'animate-shimmer rounded-xl',
            className || 'h-48 w-full',
          )}
        />
      ))}
    </>
  );
}

export function PokemonCardSkeleton({ count = 1 }: { count?: number } = {}) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-dark-800 rounded-xl p-4 space-y-4 shadow-sm border border-gray-100 dark:border-dark-700 h-[220px]">
          <div className="flex justify-between">
            <div className="h-5 w-12 animate-shimmer rounded bg-gray-200 dark:bg-dark-700" />
            <div className="h-5 w-5 animate-shimmer rounded-full bg-gray-200 dark:bg-dark-700" />
          </div>
          <div className="flex justify-center -mt-4">
            <div className="h-24 w-24 rounded-full animate-shimmer bg-gray-200 dark:bg-dark-700" />
          </div>
          <div className="h-6 w-24 animate-shimmer rounded mx-auto bg-gray-200 dark:bg-dark-700" />
          <div className="flex gap-2 justify-center">
            <div className="h-6 w-16 animate-shimmer rounded-full bg-gray-200 dark:bg-dark-700" />
            <div className="h-6 w-16 animate-shimmer rounded-full bg-gray-200 dark:bg-dark-700" />
          </div>
        </div>
      ))}
    </>
  );
}

export function PokemonCardSkeletonSingle() {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl p-4 space-y-4 shadow-sm border border-gray-100 dark:border-dark-700 h-[220px]">
      <div className="flex justify-between">
        <div className="h-5 w-12 animate-shimmer rounded bg-gray-200 dark:bg-dark-700" />
        <div className="h-5 w-5 animate-shimmer rounded-full bg-gray-200 dark:bg-dark-700" />
      </div>
      <div className="flex justify-center -mt-4">
        <div className="h-24 w-24 rounded-full animate-shimmer bg-gray-200 dark:bg-dark-700" />
      </div>
      <div className="h-6 w-24 animate-shimmer rounded mx-auto bg-gray-200 dark:bg-dark-700" />
      <div className="flex gap-2 justify-center">
        <div className="h-6 w-16 animate-shimmer rounded-full bg-gray-200 dark:bg-dark-700" />
        <div className="h-6 w-16 animate-shimmer rounded-full bg-gray-200 dark:bg-dark-700" />
      </div>
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-64 sm:h-96 w-full animate-shimmer rounded-3xl bg-gray-200 dark:bg-dark-700" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="h-48 animate-shimmer rounded-xl bg-gray-200 dark:bg-dark-700" />
          <div className="h-64 animate-shimmer rounded-xl bg-gray-200 dark:bg-dark-700" />
        </div>
        <div className="space-y-6">
          <div className="h-32 animate-shimmer rounded-xl bg-gray-200 dark:bg-dark-700" />
          <div className="h-32 animate-shimmer rounded-xl bg-gray-200 dark:bg-dark-700" />
        </div>
      </div>
    </div>
  );
}

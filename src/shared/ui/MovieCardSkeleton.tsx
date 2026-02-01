import { Skeleton } from "./Skeleton";

export function MovieCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-[2/3] w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

interface MovieGridSkeletonProps {
  count?: number;
}

export function MovieGridSkeleton({ count = 10 }: MovieGridSkeletonProps) {
  return (
    <div
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      aria-label="Loading movies"
      role="status"
    >
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
      <span className="sr-only">Loading movies...</span>
    </div>
  );
}

import { Skeleton } from "./Skeleton";

export function MovieDetailSkeleton() {
  return (
    <div
      className="min-h-screen bg-white dark:bg-zinc-950"
      aria-label="Loading movie details"
      role="status"
    >
      {/* Backdrop skeleton */}
      <Skeleton className="h-64 w-full sm:h-80 md:h-96" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-32 relative">
          <div className="flex flex-col gap-8 sm:flex-row">
            {/* Poster skeleton */}
            <div className="flex-shrink-0">
              <Skeleton className="h-72 w-48 rounded-lg sm:w-56 md:w-64" />
            </div>

            {/* Content skeleton */}
            <div className="flex-1 space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
              </div>

              {/* Metadata row */}
              <div className="flex gap-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>

              {/* Genre chips */}
              <div className="flex gap-2">
                <Skeleton className="h-7 w-20 rounded-full" />
                <Skeleton className="h-7 w-24 rounded-full" />
                <Skeleton className="h-7 w-16 rounded-full" />
              </div>

              {/* Overview */}
              <div className="space-y-3">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <span className="sr-only">Loading movie details...</span>
    </div>
  );
}

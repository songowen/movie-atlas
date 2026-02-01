import { Skeleton, MovieGridSkeleton } from "@/src/shared/ui";

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-10">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="mt-2 h-5 w-48" />
        </header>

        <section aria-label="Loading trending movies">
          <MovieGridSkeleton count={10} />
        </section>
      </main>
    </div>
  );
}

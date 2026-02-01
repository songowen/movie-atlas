import { Skeleton, MovieGridSkeleton } from "@/src/shared/ui";

export default function GenreLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="mt-2 h-5 w-40" />
      </header>

      <section aria-label="Loading genre movies">
        <MovieGridSkeleton count={10} />
      </section>
    </main>
  );
}

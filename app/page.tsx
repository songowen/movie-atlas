import { Suspense } from "react";
import { getTrendingMovies } from "@/src/entities/movie";
import { MovieGrid } from "@/src/entities/movie/ui/MovieGrid";
import { GenreNav } from "@/src/widgets/GenreNav";
import { HeroSpotlight } from "@/src/widgets/HeroSpotlight";
import { Skeleton } from "@/src/shared/ui";
import { generateWebSiteSchema, JsonLd } from "@/src/shared/lib/structured-data";

export default async function HomePage() {
  const { movies } = await getTrendingMovies();
  const jsonLd = generateWebSiteSchema();

  const [featuredMovie, ...remainingMovies] = movies;

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="min-h-screen bg-white dark:bg-zinc-950">
        {featuredMovie && <HeroSpotlight movie={featuredMovie} />}

        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Trending Movies
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Discover what's popular today
            </p>
          </header>

          <section className="mb-10" aria-labelledby="genres-heading">
            <h2 id="genres-heading" className="sr-only">
              Browse by genre
            </h2>
            <Suspense fallback={<GenreNavSkeleton />}>
              <GenreNav />
            </Suspense>
          </section>

          <section aria-label="Trending movies grid">
            <MovieGrid movies={remainingMovies} />
          </section>
        </main>
      </div>
    </>
  );
}

function GenreNavSkeleton() {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-8 w-20 rounded-full" />
      ))}
    </div>
  );
}

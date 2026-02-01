import type { Metadata } from "next";
import { searchMovies } from "@/src/entities/movie";
import { MovieGrid } from "@/src/entities/movie/ui/MovieGrid";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q?.trim();

  if (!query) {
    return {
      title: "Search",
      description: "Search for movies by title on Movie Atlas.",
      robots: { index: false, follow: true },
      alternates: {
        canonical: "/search",
      },
    };
  }

  const description = `Find movies matching "${query}" on Movie Atlas. Browse search results and discover films.`;

  return {
    title: `Search: ${query}`,
    description,
    openGraph: {
      title: `Search: ${query} — Movie Atlas`,
      description,
      url: `/search?q=${encodeURIComponent(query)}`,
    },
    twitter: {
      card: "summary",
      title: `Search: ${query}`,
      description,
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: `/search?q=${encodeURIComponent(query)}`,
    },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  // Empty query state
  if (!query) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Search Movies
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Enter a movie title to search
          </p>
        </div>
      </main>
    );
  }

  const { movies, totalResults } = await searchMovies(query);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Results for "{query}"
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {totalResults === 0
            ? "No movies found"
            : `Found ${totalResults.toLocaleString()} movie${totalResults === 1 ? "" : "s"}`}
        </p>
      </header>

      {movies.length > 0 ? (
        <section aria-label="Search results">
          <MovieGrid movies={movies} />
        </section>
      ) : (
        <div className="text-center py-12">
          <p className="text-zinc-500 dark:text-zinc-400">
            No movies match your search. Try a different title.
          </p>
        </div>
      )}
    </main>
  );
}

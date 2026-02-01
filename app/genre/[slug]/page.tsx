import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGenreBySlug, getGenres } from "@/src/entities/genre";
import { discoverMovies } from "@/src/entities/movie";
import { MovieGrid } from "@/src/entities/movie/ui/MovieGrid";
import { generateCollectionPageSchema, JsonLd } from "@/src/shared/lib/structured-data";

interface GenrePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const genres = await getGenres();
  return genres.map((genre) => ({ slug: genre.slug }));
}

export async function generateMetadata({
  params,
}: GenrePageProps): Promise<Metadata> {
  const { slug } = await params;
  const genre = await getGenreBySlug(slug);

  if (!genre) {
    return {
      title: "Genre Not Found",
      robots: { index: false, follow: false },
    };
  }

  const description = `Discover popular ${genre.name.toLowerCase()} movies. Browse the best ${genre.name.toLowerCase()} films on Movie Atlas.`;

  return {
    title: `${genre.name} Movies`,
    description,
    openGraph: {
      title: `${genre.name} Movies — Movie Atlas`,
      description,
      url: `/genre/${genre.slug}`,
    },
    twitter: {
      card: "summary",
      title: `${genre.name} Movies`,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `/genre/${genre.slug}`,
    },
  };
}

export default async function GenrePage({ params }: GenrePageProps) {
  const { slug } = await params;
  const genre = await getGenreBySlug(slug);

  if (!genre) {
    notFound();
  }

  const { movies, totalResults } = await discoverMovies({
    genreId: genre.id,
    sortBy: "popularity.desc",
  });

  const jsonLd = generateCollectionPageSchema(genre, totalResults);

  return (
    <>
      <JsonLd data={jsonLd} />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {genre.name} Movies
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            {totalResults.toLocaleString()} movies in this genre
          </p>
        </header>

        <section aria-label={`${genre.name} movies grid`}>
          {movies.length > 0 ? (
            <MovieGrid movies={movies} />
          ) : (
            <p className="text-center text-zinc-500 dark:text-zinc-400">
              No movies found in this genre.
            </p>
          )}
        </section>
      </main>
    </>
  );
}

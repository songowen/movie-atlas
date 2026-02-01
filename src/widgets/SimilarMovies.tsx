import { getSimilarMovies } from "@/src/entities/movie";
import { MovieGrid } from "@/src/entities/movie/ui/MovieGrid";

interface SimilarMoviesProps {
  movieId: number;
}

export async function SimilarMovies({ movieId }: SimilarMoviesProps) {
  const { movies } = await getSimilarMovies(movieId);

  if (movies.length === 0) {
    return null;
  }

  // Limit to 10 similar movies for cleaner UI
  const displayMovies = movies.slice(0, 10);

  return (
    <section className="mt-16" aria-labelledby="similar-movies-heading">
      <h2
        id="similar-movies-heading"
        className="text-2xl font-bold text-zinc-900 dark:text-zinc-100"
      >
        Similar Movies
      </h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        If you liked this, you might also enjoy
      </p>
      <div className="mt-6">
        <MovieGrid movies={displayMovies} />
      </div>
    </section>
  );
}

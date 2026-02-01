import type { MovieDetail as MovieDetailType } from "../model/types";

interface MovieDetailProps {
  movie: MovieDetailType;
}

export function MovieDetail({ movie }: MovieDetailProps) {
  return (
    <article className="min-h-screen bg-white dark:bg-zinc-950">
      {movie.backdropUrl && (
        <div className="relative h-64 w-full overflow-hidden sm:h-80 md:h-96">
          <img
            src={movie.backdropUrl}
            alt=""
            className="h-full w-full object-cover object-top"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-zinc-950 dark:via-zinc-950/50" />
        </div>
      )}

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className={movie.backdropUrl ? "-mt-32 relative" : "pt-12"}>
          <div className="flex flex-col gap-8 sm:flex-row">
            <aside className="flex-shrink-0">
              {movie.posterUrl ? (
                <img
                  src={movie.posterUrl}
                  alt={`${movie.title} poster`}
                  className="w-48 rounded-lg shadow-lg sm:w-56 md:w-64"
                />
              ) : (
                <div className="flex h-72 w-48 items-center justify-center rounded-lg bg-zinc-200 dark:bg-zinc-800 sm:w-56 md:w-64">
                  <span className="text-zinc-500">No poster</span>
                </div>
              )}
            </aside>

            <div className="flex-1 space-y-6">
              <header>
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
                  {movie.title}
                  {movie.releaseYear && (
                    <span className="ml-3 text-2xl font-normal text-zinc-500 dark:text-zinc-400">
                      ({movie.releaseYear})
                    </span>
                  )}
                </h1>

                {movie.tagline && (
                  <p className="mt-2 text-lg italic text-zinc-600 dark:text-zinc-400">
                    "{movie.tagline}"
                  </p>
                )}
              </header>

              <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                {movie.rating > 0 && (
                  <div className="flex items-center gap-1">
                    <dt className="sr-only">Rating</dt>
                    <dd className="flex items-center gap-1 font-medium text-zinc-900 dark:text-zinc-100">
                      <span aria-hidden="true">★</span>
                      {movie.rating.toFixed(1)}
                    </dd>
                    <span className="text-zinc-400">
                      ({movie.voteCount.toLocaleString()} votes)
                    </span>
                  </div>
                )}

                {movie.runtime && (
                  <div>
                    <dt className="sr-only">Runtime</dt>
                    <dd>{formatRuntime(movie.runtime)}</dd>
                  </div>
                )}

                {movie.releaseDate && (
                  <div>
                    <dt className="sr-only">Release date</dt>
                    <dd>{formatDate(movie.releaseDate)}</dd>
                  </div>
                )}
              </dl>

              {movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {movie.overview && (
                <section aria-labelledby="overview-heading">
                  <h2
                    id="overview-heading"
                    className="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
                  >
                    Overview
                  </h2>
                  <p className="mt-2 leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {movie.overview}
                  </p>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

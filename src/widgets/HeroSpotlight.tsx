import Link from "next/link";
import type { Movie } from "@/src/entities/movie";

interface HeroSpotlightProps {
  movie: Movie;
}

export function HeroSpotlight({ movie }: HeroSpotlightProps) {
  const truncatedOverview = movie.overview
    ? movie.overview.length > 200
      ? movie.overview.slice(0, 200).trim() + "..."
      : movie.overview
    : null;

  return (
    <section className="relative h-[70vh] min-h-[400px] max-h-[600px] w-full overflow-hidden">
      {/* Backdrop image */}
      {movie.backdropUrl ? (
        <img
          src={movie.backdropUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />
      ) : (
        <div className="absolute inset-0 bg-zinc-800" aria-hidden="true" />
      )}

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent dark:from-zinc-950 dark:via-zinc-950/60"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-transparent dark:from-zinc-950/80"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative flex h-full items-end">
        <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="text-sm font-medium uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
              Featured Today
            </p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
              {movie.title}
            </h2>

            <div className="mt-3 flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
              {movie.releaseYear && <span>{movie.releaseYear}</span>}
              {movie.rating > 0 && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <span aria-hidden="true">★</span>
                    <span>{movie.rating.toFixed(1)}</span>
                  </span>
                </>
              )}
            </div>

            {truncatedOverview && (
              <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                {truncatedOverview}
              </p>
            )}

            <Link
              href={`/movie/${movie.id}`}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              View Details
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

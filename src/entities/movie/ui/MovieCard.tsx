import Link from "next/link";
import type { Movie } from "../model/types";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="group">
      <Link href={`/movie/${movie.id}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-zinc-800">
          {movie.posterUrl ? (
            <img
              src={movie.posterUrl}
              alt={`${movie.title} poster`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-zinc-500">
              <span className="text-sm">No poster</span>
            </div>
          )}
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="font-medium text-zinc-900 line-clamp-1 group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-300">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            {movie.releaseYear && <span>{movie.releaseYear}</span>}
            {movie.rating > 0 && (
              <>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <span aria-label="Rating">★</span>
                  {movie.rating.toFixed(1)}
                </span>
              </>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}

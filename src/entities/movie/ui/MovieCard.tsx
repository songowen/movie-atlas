import Link from "next/link";
import type { Movie } from "../model/types";

// Static genre map from TMDB (avoids async lookup)
const GENRE_MAP: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

function getGenreNames(genreIds: number[], limit: number = 2): string[] {
  return genreIds
    .slice(0, limit)
    .map((id) => GENRE_MAP[id])
    .filter(Boolean);
}

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const genres = getGenreNames(movie.genreIds, 2);

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

          {/* Hover overlay */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="space-y-2">
              {/* Rating and year */}
              <div className="flex items-center gap-2 text-sm text-white">
                {movie.rating > 0 && (
                  <span className="flex items-center gap-1 rounded bg-yellow-500/90 px-1.5 py-0.5 text-xs font-semibold text-black">
                    <span aria-hidden="true">★</span>
                    {movie.rating.toFixed(1)}
                  </span>
                )}
                {movie.releaseYear && (
                  <span className="text-zinc-300">{movie.releaseYear}</span>
                )}
              </div>

              {/* Genres */}
              {genres.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {genres.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full bg-white/20 px-2 py-0.5 text-xs text-white backdrop-blur-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Title below card */}
        <div className="mt-3">
          <h3 className="font-medium text-zinc-900 line-clamp-1 group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-300">
            {movie.title}
          </h3>
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
            {movie.releaseYear ?? "TBA"}
          </p>
        </div>
      </Link>
    </article>
  );
}

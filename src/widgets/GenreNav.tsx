import Link from "next/link";
import { getGenres } from "@/src/entities/genre";

export async function GenreNav() {
  const genres = await getGenres();

  return (
    <nav aria-label="Movie genres">
      <ul className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <li key={genre.id}>
            <Link
              href={`/genre/${genre.slug}`}
              className="inline-block rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-800"
            >
              {genre.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

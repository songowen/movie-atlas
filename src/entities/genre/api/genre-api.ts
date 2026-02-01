/**
 * Genre API functions for Server Components.
 */

import {
  tmdbFetch,
  endpoints,
  type TMDBGenreListResponse,
} from "@/src/shared/api";
import { createSlug, type Genre } from "../model/types";

let cachedGenres: Genre[] | null = null;

export async function getGenres(): Promise<Genre[]> {
  if (cachedGenres) return cachedGenres;

  const response = await tmdbFetch<TMDBGenreListResponse>(endpoints.genres(), {
    revalidate: 604800, // 1 week - genres rarely change
  });

  cachedGenres = response.genres.map((g) => ({
    id: g.id,
    name: g.name,
    slug: createSlug(g.name),
  }));

  return cachedGenres;
}

export async function getGenreBySlug(slug: string): Promise<Genre | null> {
  const genres = await getGenres();
  return genres.find((g) => g.slug === slug) ?? null;
}

export async function getGenreById(id: number): Promise<Genre | null> {
  const genres = await getGenres();
  return genres.find((g) => g.id === id) ?? null;
}

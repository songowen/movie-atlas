/**
 * Movie API functions for Server Components.
 * These functions fetch from TMDB and return domain types.
 */

import {
  tmdbFetch,
  endpoints,
  type TMDBPaginatedResponse,
  type TMDBMovie,
  type TMDBMovieDetail,
  type DiscoverParams,
} from "@/src/shared/api";
import { mapPaginatedMovies, mapMovieDetail } from "../model/mappers";
import type { PaginatedMovies, MovieDetail } from "../model/types";

export async function getTrendingMovies(
  timeWindow: "day" | "week" = "day"
): Promise<PaginatedMovies> {
  const response = await tmdbFetch<TMDBPaginatedResponse<TMDBMovie>>(
    endpoints.trending(timeWindow),
    { revalidate: 3600 }
  );
  return mapPaginatedMovies(response);
}

export async function getMovie(id: number): Promise<MovieDetail> {
  const response = await tmdbFetch<TMDBMovieDetail>(endpoints.movie(id), {
    revalidate: 86400,
  });
  return mapMovieDetail(response);
}

export async function searchMovies(
  query: string,
  page: number = 1
): Promise<PaginatedMovies> {
  if (!query.trim()) {
    return { movies: [], page: 1, totalPages: 0, totalResults: 0 };
  }
  const response = await tmdbFetch<TMDBPaginatedResponse<TMDBMovie>>(
    endpoints.search(query, page),
    { revalidate: false }
  );
  return mapPaginatedMovies(response);
}

export async function discoverMovies(
  params: DiscoverParams = {}
): Promise<PaginatedMovies> {
  const response = await tmdbFetch<TMDBPaginatedResponse<TMDBMovie>>(
    endpoints.discover(params),
    { revalidate: 3600 }
  );
  return mapPaginatedMovies(response);
}

export async function getSimilarMovies(id: number): Promise<PaginatedMovies> {
  const response = await tmdbFetch<TMDBPaginatedResponse<TMDBMovie>>(
    endpoints.similar(id),
    { revalidate: 86400 }
  );
  return mapPaginatedMovies(response);
}

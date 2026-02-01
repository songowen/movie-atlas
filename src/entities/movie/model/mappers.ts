/**
 * Mappers to transform TMDB API responses into domain types.
 * Centralizes data transformation logic and isolates external API shapes.
 */

import type {
  TMDBMovie,
  TMDBMovieDetail,
  TMDBPaginatedResponse,
} from "@/src/shared/api";
import type { Movie, MovieDetail, PaginatedMovies } from "./types";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export function buildImageUrl(
  path: string | null,
  size: "w342" | "w500" | "w780" | "original" = "w500"
): string | null {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

function parseYear(dateString: string): number | null {
  if (!dateString) return null;
  const year = parseInt(dateString.split("-")[0], 10);
  return isNaN(year) ? null : year;
}

export function mapMovie(tmdb: TMDBMovie): Movie {
  return {
    id: tmdb.id,
    title: tmdb.title,
    overview: tmdb.overview,
    posterUrl: buildImageUrl(tmdb.poster_path, "w500"),
    backdropUrl: buildImageUrl(tmdb.backdrop_path, "w780"),
    releaseDate: tmdb.release_date,
    releaseYear: parseYear(tmdb.release_date),
    rating: Math.round(tmdb.vote_average * 10) / 10,
    voteCount: tmdb.vote_count,
    genreIds: tmdb.genre_ids,
  };
}

export function mapMovieDetail(tmdb: TMDBMovieDetail): MovieDetail {
  return {
    id: tmdb.id,
    title: tmdb.title,
    overview: tmdb.overview,
    posterUrl: buildImageUrl(tmdb.poster_path, "w500"),
    backdropUrl: buildImageUrl(tmdb.backdrop_path, "original"),
    releaseDate: tmdb.release_date,
    releaseYear: parseYear(tmdb.release_date),
    rating: Math.round(tmdb.vote_average * 10) / 10,
    voteCount: tmdb.vote_count,
    genreIds: tmdb.genres.map((g) => g.id),
    tagline: tmdb.tagline,
    runtime: tmdb.runtime,
    genres: tmdb.genres.map((g) => ({ id: g.id, name: g.name })),
    status: tmdb.status,
    budget: tmdb.budget,
    revenue: tmdb.revenue,
    homepage: tmdb.homepage,
    imdbId: tmdb.imdb_id,
  };
}

export function mapPaginatedMovies(
  response: TMDBPaginatedResponse<TMDBMovie>
): PaginatedMovies {
  return {
    movies: response.results.map(mapMovie),
    page: response.page,
    totalPages: response.total_pages,
    totalResults: response.total_results,
  };
}

/**
 * Movie domain types.
 * These are UI-friendly representations, decoupled from TMDB API shapes.
 */

export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterUrl: string | null;
  backdropUrl: string | null;
  releaseDate: string;
  releaseYear: number | null;
  rating: number;
  voteCount: number;
  genreIds: number[];
}

export interface MovieDetail extends Movie {
  tagline: string | null;
  runtime: number | null;
  genres: Genre[];
  status: string;
  budget: number;
  revenue: number;
  homepage: string | null;
  imdbId: string | null;
}

export interface Genre {
  id: number;
  name: string;
}

export interface PaginatedMovies {
  movies: Movie[];
  page: number;
  totalPages: number;
  totalResults: number;
}

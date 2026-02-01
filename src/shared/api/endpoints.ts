/**
 * TMDB API endpoint builders.
 * Centralizes URL construction for type safety and maintainability.
 */

export const endpoints = {
  trending: (timeWindow: "day" | "week" = "day") =>
    `/trending/movie/${timeWindow}`,

  movie: (id: number) => `/movie/${id}`,

  search: (query: string, page: number = 1) =>
    `/search/movie?query=${encodeURIComponent(query)}&page=${page}`,

  discover: (params: DiscoverParams = {}) => {
    const searchParams = new URLSearchParams();
    if (params.page) searchParams.set("page", String(params.page));
    if (params.genreId) searchParams.set("with_genres", String(params.genreId));
    if (params.sortBy) searchParams.set("sort_by", params.sortBy);
    if (params.year) searchParams.set("primary_release_year", String(params.year));
    const queryString = searchParams.toString();
    return `/discover/movie${queryString ? `?${queryString}` : ""}`;
  },

  genres: () => `/genre/movie/list`,
} as const;

export interface DiscoverParams {
  page?: number;
  genreId?: number;
  sortBy?: "popularity.desc" | "vote_average.desc" | "release_date.desc";
  year?: number;
}

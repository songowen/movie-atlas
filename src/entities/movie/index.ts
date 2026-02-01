// API functions
export {
  getTrendingMovies,
  getMovie,
  searchMovies,
  discoverMovies,
  getSimilarMovies,
} from "./api/movie-api";

// Domain types
export type {
  Movie,
  MovieDetail,
  Genre,
  PaginatedMovies,
} from "./model/types";

// Utilities (for image URL building in UI components)
export { buildImageUrl } from "./model/mappers";

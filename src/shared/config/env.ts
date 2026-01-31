/**
 * Environment configuration with runtime validation.
 * Server-only - never import this in Client Components.
 */

function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}. ` +
        `Please add it to your .env.local file.`
    );
  }
  return value;
}

export const env = {
  TMDB_API_KEY: getEnvVar("TMDB_API_KEY"),
  TMDB_BASE_URL: process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3",
  TMDB_IMAGE_BASE_URL:
    process.env.TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p",
} as const;

/**
 * TMDB API client.
 * Server-only - uses environment variables that are not exposed to the browser.
 */

import { env } from "@/src/shared/config/env";
import type { TMDBErrorResponse } from "./types";

export class TMDBError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public tmdbCode?: number
  ) {
    super(message);
    this.name = "TMDBError";
  }
}

interface FetchOptions {
  revalidate?: number | false;
  tags?: string[];
}

/**
 * Fetches data from TMDB API with automatic authentication and error handling.
 *
 * @param endpoint - API endpoint path (e.g., "/movie/123")
 * @param options - Next.js fetch options for caching
 * @returns Parsed JSON response
 * @throws TMDBError on API errors
 */
export async function tmdbFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const url = buildUrl(endpoint);

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: options.revalidate ?? 3600,
      tags: options.tags,
    },
  });

  if (!response.ok) {
    const error = await parseError(response);
    throw new TMDBError(error.message, response.status, error.tmdbCode);
  }

  return response.json() as Promise<T>;
}

function buildUrl(endpoint: string): string {
  const base = env.TMDB_BASE_URL;
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const separator = path.includes("?") ? "&" : "?";
  return `${base}${path}${separator}api_key=${env.TMDB_API_KEY}`;
}

async function parseError(
  response: Response
): Promise<{ message: string; tmdbCode?: number }> {
  try {
    const data = (await response.json()) as TMDBErrorResponse;
    return {
      message: data.status_message || `TMDB API error: ${response.status}`,
      tmdbCode: data.status_code,
    };
  } catch {
    return {
      message: `TMDB API error: ${response.status} ${response.statusText}`,
    };
  }
}

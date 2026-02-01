/**
 * JSON-LD structured data helpers for SEO.
 * Generates schema.org compliant markup for rich snippets.
 */

import type { MovieDetail } from "@/src/entities/movie";
import type { Genre } from "@/src/entities/genre";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://movie-atlas.vercel.app";

export interface WebSiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  potentialAction?: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    "query-input": string;
  };
}

export interface MovieSchema {
  "@context": "https://schema.org";
  "@type": "Movie";
  name: string;
  description?: string;
  image?: string;
  datePublished?: string;
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: number;
    bestRating: number;
    ratingCount: number;
  };
  genre?: string[];
  duration?: string;
}

export interface CollectionPageSchema {
  "@context": "https://schema.org";
  "@type": "CollectionPage";
  name: string;
  description: string;
  url: string;
}

export function generateWebSiteSchema(): WebSiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Movie Atlas",
    url: BASE_URL,
    description: "Discover trending movies, explore by genre, and find your next favorite film.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateMovieSchema(movie: MovieDetail): MovieSchema {
  const schema: MovieSchema = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.title,
  };

  if (movie.overview) {
    schema.description = movie.overview;
  }

  if (movie.posterUrl) {
    schema.image = movie.posterUrl;
  }

  if (movie.releaseDate) {
    schema.datePublished = movie.releaseDate;
  }

  if (movie.rating > 0 && movie.voteCount > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: movie.rating,
      bestRating: 10,
      ratingCount: movie.voteCount,
    };
  }

  if (movie.genres.length > 0) {
    schema.genre = movie.genres.map((g) => g.name);
  }

  if (movie.runtime) {
    schema.duration = `PT${movie.runtime}M`;
  }

  return schema;
}

export function generateCollectionPageSchema(
  genre: Genre,
  totalResults: number
): CollectionPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${genre.name} Movies`,
    description: `Browse ${totalResults.toLocaleString()} ${genre.name.toLowerCase()} movies on Movie Atlas.`,
    url: `${BASE_URL}/genre/${genre.slug}`,
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

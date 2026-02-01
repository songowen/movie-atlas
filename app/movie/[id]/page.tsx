import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMovie } from "@/src/entities/movie";
import { MovieDetail } from "@/src/entities/movie/ui/MovieDetail";
import { TMDBError } from "@/src/shared/api";
import { generateMovieSchema, JsonLd } from "@/src/shared/lib/structured-data";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const movieId = parseInt(id, 10);

  if (isNaN(movieId)) {
    return {
      title: "Movie Not Found",
      robots: { index: false, follow: false },
    };
  }

  try {
    const movie = await getMovie(movieId);
    const description = movie.overview
      ? movie.overview.slice(0, 160)
      : `Watch ${movie.title} - details, ratings, and more on Movie Atlas.`;

    return {
      title: `${movie.title}${movie.releaseYear ? ` (${movie.releaseYear})` : ""}`,
      description,
      openGraph: {
        title: `${movie.title}${movie.releaseYear ? ` (${movie.releaseYear})` : ""}`,
        description,
        images: movie.posterUrl
          ? [{ url: movie.posterUrl, width: 500, height: 750, alt: `${movie.title} poster` }]
          : undefined,
        type: "video.movie",
        url: `/movie/${movieId}`,
      },
      twitter: {
        card: "summary_large_image",
        title: movie.title,
        description,
        images: movie.posterUrl ? [movie.posterUrl] : undefined,
      },
      robots: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
      alternates: {
        canonical: `/movie/${movieId}`,
      },
    };
  } catch {
    return {
      title: "Movie Not Found",
      robots: { index: false, follow: false },
    };
  }
}

export default async function MoviePage({ params }: PageProps) {
  const { id } = await params;
  const movieId = parseInt(id, 10);

  if (isNaN(movieId)) {
    notFound();
  }

  try {
    const movie = await getMovie(movieId);
    const jsonLd = generateMovieSchema(movie);

    return (
      <>
        <JsonLd data={jsonLd} />
        <MovieDetail movie={movie} />
      </>
    );
  } catch (error) {
    if (error instanceof TMDBError && error.statusCode === 404) {
      notFound();
    }
    throw error;
  }
}

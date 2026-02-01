"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MovieError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Movie page error:", error);
  }, [error]);

  const isNetworkError =
    error.message.includes("fetch") ||
    error.message.includes("network") ||
    error.message.includes("TMDB");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 dark:bg-zinc-950">
      <main className="text-center" role="main">
        <div
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/20"
          aria-hidden="true"
        >
          <span className="text-2xl">⚠</span>
        </div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          {isNetworkError ? "Connection error" : "Failed to load movie"}
        </h1>
        <p className="mt-2 max-w-md text-zinc-600 dark:text-zinc-400">
          {isNetworkError
            ? "We couldn't connect to the movie database. Please check your connection and try again."
            : "We couldn't load this movie's details. The movie may have been removed, or there might be a temporary issue."}
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-600">
            Error ID: {error.digest}
          </p>
        )}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            Browse movies
          </Link>
        </div>
      </main>
    </div>
  );
}

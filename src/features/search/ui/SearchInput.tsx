"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

interface SearchInputProps {
  placeholder?: string;
}

export function SearchInput({
  placeholder = "Search movies...",
}: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [value, setValue] = useState(initialQuery);

  // Sync input with URL when navigating back/forward
  useEffect(() => {
    setValue(searchParams.get("q") ?? "");
  }, [searchParams]);

  // Debounced navigation
  useEffect(() => {
    const trimmed = value.trim();
    const currentQuery = searchParams.get("q") ?? "";

    // Don't navigate if value matches current URL
    if (trimmed === currentQuery) return;

    const timeoutId = setTimeout(() => {
      if (trimmed) {
        router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      } else if (currentQuery) {
        // Clear search - go back to search page without query
        router.push("/search");
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [value, router, searchParams]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = value.trim();
      if (trimmed) {
        router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      }
    },
    [value, router]
  );

  return (
    <form onSubmit={handleSubmit} role="search" className="w-full max-w-md">
      <label htmlFor="search-input" className="sr-only">
        Search movies
      </label>
      <div className="relative">
        <input
          id="search-input"
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 pl-10 text-sm text-zinc-900 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-400 dark:focus:border-zinc-500"
          autoComplete="off"
        />
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </form>
  );
}

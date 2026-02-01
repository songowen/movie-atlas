import Link from "next/link";
import { Suspense } from "react";
import { SearchInput } from "@/src/features/search";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
        >
          Movie Atlas
        </Link>

        <Suspense fallback={<SearchInputFallback />}>
          <SearchInput />
        </Suspense>
      </div>
    </header>
  );
}

function SearchInputFallback() {
  return (
    <div className="w-full max-w-md">
      <div className="h-10 w-full animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
}

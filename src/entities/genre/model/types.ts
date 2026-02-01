/**
 * Genre domain types.
 */

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

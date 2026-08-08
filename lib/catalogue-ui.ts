import type { Release } from "@/lib/toolost";
import { getSpotifyForRelease } from "@/lib/spotify";
import { getYoutubeForRelease } from "@/lib/youtube";

export function releaseHasListen(release: Release): boolean {
  return Boolean(getSpotifyForRelease(release) || getYoutubeForRelease(release));
}

export type CatalogueFilter =
  | "all"
  | "listen"
  | "2020s"
  | "2010s"
  | "2000s"
  | "1990s";

export const CATALOGUE_FILTERS: CatalogueFilter[] = [
  "all",
  "listen",
  "2020s",
  "2010s",
  "2000s",
  "1990s",
];

export const ERA_SHELVES: Exclude<CatalogueFilter, "all" | "listen">[] = [
  "2020s",
  "2010s",
  "2000s",
  "1990s",
];

export function releaseYear(release: Release): number {
  const fromDate = Number(release.release_date?.slice(0, 4));
  if (Number.isFinite(fromDate) && fromDate > 1900) return fromDate;
  const fromMeta = release.meta?.match(/\b(19|20)\d{2}\b/);
  return fromMeta ? Number(fromMeta[0]) : 0;
}

export function matchesCatalogueFilter(
  release: Release,
  filter: CatalogueFilter,
): boolean {
  const year = releaseYear(release);
  switch (filter) {
    case "all":
      return true;
    case "listen":
      return releaseHasListen(release);
    case "2020s":
      return year >= 2020;
    case "2010s":
      return year >= 2010 && year < 2020;
    case "2000s":
      return year >= 2000 && year < 2010;
    case "1990s":
      return year > 0 && year < 2000;
    default:
      return true;
  }
}

export function sortReleasesNewest(a: Release, b: Release): number {
  return releaseYear(b) - releaseYear(a);
}

import {
  DISCOGS_CREDITS,
  DISCOGS_MAIN,
  LABEL_EXTRA,
} from "./discogs";

type CatalogueItem = {
  id: string;
  title: string;
  artist: string;
  artwork_url: string;
  release_date: string;
  format: string;
  meta: string;
  tag?: string;
  streaming_links?: {
    spotify?: string;
  };
  discogsUrl?: string;
};

function yearToDate(year: number | null | undefined) {
  return year ? `${year}-01-01` : "2000-01-01";
}

/** Catalogue = newest label drops + Discogs Main + credits he is actually on */
export const CATALOGUE: CatalogueItem[] = [
  ...LABEL_EXTRA.map((r) => ({
    id: r.id,
    title: r.title,
    artist: r.artist,
    artwork_url:
      "artwork_url" in r && r.artwork_url ? r.artwork_url : "/shortlord-photo.jpg",
    release_date: yearToDate(r.year),
    format: r.format,
    meta: `${r.year} · ${r.format}`,
    tag: "tag" in r ? r.tag : undefined,
    streaming_links: "streaming_links" in r ? r.streaming_links : undefined,
  })),
  ...DISCOGS_MAIN.map((r) => ({
    id: r.id,
    title: r.title,
    artist: r.artist,
    artwork_url: "/shortlord-photo.jpg",
    release_date: yearToDate(r.year),
    format: r.format,
    meta: r.year ? `${r.year} · ${r.format}` : r.format,
    discogsUrl: r.url,
    tag: r.id === "heavensent" ? "Gold era" : undefined,
  })),
  ...DISCOGS_CREDITS.map((r) => ({
    id: r.id,
    title: r.title,
    artist: r.artist,
    artwork_url: "/shortlord-photo.jpg",
    release_date: yearToDate(r.year),
    format: r.track
      ? `${r.format} · ${r.role} · ${r.track}`
      : `${r.format} · ${r.role}`,
    meta: [
      r.year,
      r.label,
      r.role,
      r.track ? `"${r.track}"` : null,
    ]
      .filter(Boolean)
      .join(" · "),
    discogsUrl: r.url,
    tag:
      r.label?.includes("Jentown")
        ? "Jentown"
        : r.id === "nana-album" || r.id === "the-fight"
          ? "Credit"
          : r.role,
  })),
];

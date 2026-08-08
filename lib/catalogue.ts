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
    youtube?: string;
  };
  discogsUrl?: string;
};

/** Real sleeve art in /public/covers */
const COVER_ART: Record<string, string> = {
  crusade: "/covers/crusade.jpg",
  heavensent: "/covers/heaven-sent.jpg",
  "king-of-da-city": "/covers/king-of-da-city.jpg",
  "return-of-the-ancient-one": "/covers/return-of-the-ancient-one.jpg",
  "purple-magic": "/covers/purple-magic.jpg",
  ganja: "/covers/ganja.jpg",
  "hamburg-hip-hop-next-level": "/covers/hamburg-hip-hop-next-level.jpg",
  "hustle-hard": "/covers/hustle-hard.jpg",
  "field-nggah-thought": "/covers/haji-brown.jpg",
  "the-fight": "/covers/the-fight.jpg",
  // Jentown Crhyme sleeves Shortlord is on
  "wilder-westen": "/covers/jentown.jpg",
  "organized-crhyme-vol-1": "/covers/jentown.jpg",
  // Track from Return Of The Ancient One
  "guyana-girl": "/covers/return-of-the-ancient-one.jpg",
};

function artworkFor(id: string, fallback = "/shortlord-photo.jpg") {
  return COVER_ART[id] ?? fallback;
}

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
      "artwork_url" in r && r.artwork_url
        ? r.artwork_url
        : artworkFor(r.id),
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
    artwork_url: artworkFor(r.id),
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
    artwork_url: artworkFor(r.id),
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

export type SpotifyRef = {
  type: "track" | "album";
  id: string;
};

/**
 * Catalogue items confirmed on Shortlord's Spotify artist page.
 * Only IDs we verified — missing entries mean "not available" (no embed).
 */
export const SPOTIFY_CATALOGUE: Record<string, SpotifyRef> = {
  "top-floor": { type: "track", id: "6le1yldGcYXZGFXgAAkBFR" },
  "nice-n-sweet": { type: "album", id: "2jBcSbPg8mZrhTPuJYAR9O" },
  ayree: { type: "album", id: "5iWsmJfGPjcFr1BuQRaq6z" },
  "run-di-city": { type: "album", id: "5p22JxQv2wveFlw0lNzOTu" },
  ganja: { type: "track", id: "4Y80kbRgwgQAPRLFoVvQna" },
  "hustle-hard": { type: "album", id: "2nYWvKLDp3eQHMF4SMdWFv" },
  spirits: { type: "album", id: "6kCxo4wuQrtZbCVe6A4RO8" },
  "genug-ist-genug": { type: "album", id: "2874ianwzho6d3jdrdj0Mz" },
};

export function spotifyOpenUrl(ref: SpotifyRef): string {
  return `https://open.spotify.com/${ref.type}/${ref.id}`;
}

export function spotifyEmbedUrl(ref: SpotifyRef, theme: 0 | 1 = 0): string {
  return `https://open.spotify.com/embed/${ref.type}/${ref.id}?utm_source=generator&theme=${theme}`;
}

export function parseSpotifyUrl(url: string | undefined | null): SpotifyRef | null {
  if (!url) return null;
  const m = url.match(
    /open\.spotify\.com\/(?:intl-[a-z]{2}\/)?(track|album)\/([A-Za-z0-9]{22})/,
  );
  if (!m) return null;
  return { type: m[1] as SpotifyRef["type"], id: m[2] };
}

export function getSpotifyForRelease(release: {
  id: string;
  streaming_links?: { spotify?: string };
}): SpotifyRef | null {
  const fromLink = parseSpotifyUrl(release.streaming_links?.spotify);
  if (fromLink) return fromLink;
  return SPOTIFY_CATALOGUE[release.id] ?? null;
}

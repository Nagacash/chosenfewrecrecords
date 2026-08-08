import { CATALOGUE } from "./catalogue";
import { getSpotifyForRelease, spotifyOpenUrl } from "./spotify";
import { getYoutubeForRelease, youtubeWatchUrl } from "./youtube";

export type StreamingLinks = {
  spotify?: string;
  apple_music?: string;
  youtube?: string;
  youtube_music?: string;
  tidal?: string;
  amazon_music?: string;
  deezer?: string;
};

export type Release = {
  id: string;
  title: string;
  artist: string;
  artwork_url: string;
  release_date: string;
  upc?: string;
  format?: string;
  meta?: string;
  status?: string;
  tag?: string;
  streaming_links?: StreamingLinks;
};

type TokenCache = {
  accessToken: string;
  expiresAt: number;
};

let tokenCache: TokenCache | null = null;

const TOOLOST_BASE = "https://api.toolost.com/v1";

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.TOOLOST_CLIENT_ID;
  const clientSecret = process.env.TOOLOST_CLIENT_SECRET;
  const refreshToken = process.env.TOOLOST_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) return null;

  if (tokenCache && Date.now() < tokenCache.expiresAt - 60_000) {
    return tokenCache.accessToken;
  }

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
  });

  const res = await fetch("https://toolost.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });

  if (!res.ok) return null;

  const json = (await res.json()) as {
    access_token?: string;
    expires_in?: number;
  };

  if (!json.access_token) return null;

  tokenCache = {
    accessToken: json.access_token,
    expiresAt: Date.now() + (json.expires_in ?? 3600) * 1000,
  };

  return tokenCache.accessToken;
}

async function toolostFetch<T>(path: string): Promise<T | null> {
  const token = await getAccessToken();
  if (!token) return null;

  try {
    const res = await fetch(`${TOOLOST_BASE}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 21600 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function withStreamingLinks(release: Release): Release {
  const spotify = getSpotifyForRelease(release);
  const youtubeId = getYoutubeForRelease(release);
  if (!spotify && !youtubeId) return release;
  return {
    ...release,
    streaming_links: {
      ...release.streaming_links,
      ...(spotify ? { spotify: spotifyOpenUrl(spotify) } : {}),
      ...(youtubeId ? { youtube: youtubeWatchUrl(youtubeId) } : {}),
    },
  };
}

/** Static fallback when Too Lost is not configured / unavailable */
export const STATIC_RELEASES: Release[] = CATALOGUE.map((r) =>
  withStreamingLinks({ ...r }),
);

export async function getReleases(): Promise<Release[]> {
  const data = await toolostFetch<{ data?: Release[] }>("/releases");
  if (data?.data?.length) return data.data.map(withStreamingLinks);
  return STATIC_RELEASES;
}

export async function getRelease(id: string): Promise<Release | null> {
  const data = await toolostFetch<{ data?: Release }>(`/releases/${id}`);
  if (data?.data) return withStreamingLinks(data.data);
  const local = STATIC_RELEASES.find((r) => r.id === id) ?? null;
  return local;
}

export async function getFeaturedRelease(): Promise<Release> {
  const releases = await getReleases();
  const featured =
    releases.find((r) => r.id === "top-floor") ?? releases[0] ?? STATIC_RELEASES[0];
  return featured;
}

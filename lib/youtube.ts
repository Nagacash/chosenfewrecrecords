export type CuratedVideo = {
  id: string;
  title: string;
};

export const CURATED_VIDEOS: CuratedVideo[] = [
  {
    id: "r18gyNSKxIs",
    title: "Eric I.Q. Gray feat. Shortlord — The Fight",
  },
  {
    id: "fZIARWt8FGU",
    title: "ShortLord feat. Daddy Freddy — Move 2 da Beat",
  },
  {
    id: "p2Y2WTUlVUM",
    title: "ShortLord — Mardi Gras (Official Video)",
  },
  {
    id: "L7R1oiGEO8k",
    title: "ShortLord ft. Mounier — Ways of Mankind (prod. Farhot)",
  },
  {
    id: "6Wcrvn_Y4FQ",
    title: "Shortlord — Guyana Girl feat. Jahrose (Official Video)",
  },
  {
    id: "7_1L910qh-E",
    title: "Capuz feat. ShortLord — Wie wir Leben (Chosenfewrecords)",
  },
  {
    id: "Ey5rwziBimc",
    title: "Haji Brown — Field Nggah Thought | prod. ShortLord (Album pt.1)",
  },
  {
    id: "l1pEfRY7poA",
    title: "Haji Brown — About Me (prod. ShortLord) · 31K views",
  },
  {
    id: "Ip2bs3BVZ-Y",
    title: "ShortLord ft. Jazz Fiction — Spirits (Official HD Video) · 15K views",
  },
  {
    id: "-Nvg5GM0bmQ",
    title: "ShortLord — Go Shorty (Official Video) · 10K views",
  },
  {
    id: "ypKS78I3CpU",
    title: "ShortLord ft. KAYANN — Fear vs Love · 14K views",
  },
  {
    id: "hX5QU1aF4cM",
    title: "Killa Cam Back in Harlem! Raw Freestyle · 22K views",
  },
  {
    id: "9EkcLVX7-Zw",
    title: "I.Q. Gray — I'm The Guitarman (Official Video) · 19K views",
  },
  {
    id: "_xdAYJLUM68",
    title: "The JentownCryhme Story: ShortLord Speaks on Bonez MC's Early Career",
  },
  {
    id: "a6hDW5FW5ZU",
    title: "ShortLord ft. Al Anean — Hustle Hard (OneTake Video) · 8.4K views",
  },
  {
    id: "2DImdI1aEhU",
    title: "ShortLord & Warrior Rapper School — Ganja (Official Video)",
  },
  {
    id: "QyXazuWfxkw",
    title: "TLAC — Jofunmi (Official Video) · 1.4K views",
  },
  {
    id: "A7NEv6NGTdI",
    title: "ShortLord — Anubis (Official Video)",
  },
  {
    id: "VfJb6Sy4gSE",
    title: "ShortLord — Flexin (Official Video)",
  },
];

export const YOUTUBE_CHANNEL = "https://www.youtube.com/@chosenfewrecords";
export const YOUTUBE_UPLOADS_PLAYLIST = "UUtLZrDerwIF9LjeVYqtTmLA";

/** Catalogue releases listen-able on YouTube when Spotify isn’t available */
export const YOUTUBE_CATALOGUE: Record<string, string> = {
  "mardi-gras": "p2Y2WTUlVUM",
  "move-2-da-beat": "fZIARWt8FGU",
  "ways-of-mankind": "L7R1oiGEO8k",
  "guyana-girl": "6Wcrvn_Y4FQ",
  "wie-wir-leben": "7_1L910qh-E",
  "field-nggah-thought": "Ey5rwziBimc",
  "the-fight": "r18gyNSKxIs",
};

export function youtubeWatchUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function youtubeEmbedUrl(id: string, autoplay = false) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    enablejsapi: "1",
  });
  if (autoplay) params.set("autoplay", "1");
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

export function getYoutubeForRelease(release: {
  id: string;
  streaming_links?: { youtube?: string; youtube_music?: string };
}): string | null {
  const fromMap = YOUTUBE_CATALOGUE[release.id];
  if (fromMap) return fromMap;

  const raw =
    release.streaming_links?.youtube || release.streaming_links?.youtube_music;
  if (!raw) return null;
  const m = raw.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
  );
  return m?.[1] ?? null;
}

export function youtubeThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export async function getVideos(): Promise<CuratedVideo[]> {
  if (!process.env.YOUTUBE_API_KEY) return CURATED_VIDEOS;

  try {
    const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("playlistId", YOUTUBE_UPLOADS_PLAYLIST);
    url.searchParams.set("maxResults", "24");
    url.searchParams.set("key", process.env.YOUTUBE_API_KEY);

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) return CURATED_VIDEOS;

    const json = (await res.json()) as {
      items?: Array<{
        snippet?: {
          title?: string;
          resourceId?: { videoId?: string };
        };
      }>;
    };

    const mapped =
      json.items
        ?.map((item) => ({
          id: item.snippet?.resourceId?.videoId ?? "",
          title: item.snippet?.title ?? "",
        }))
        .filter((v) => v.id && v.title) ?? [];

    return mapped.length ? mapped : CURATED_VIDEOS;
  } catch {
    return CURATED_VIDEOS;
  }
}

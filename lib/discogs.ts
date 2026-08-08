/**
 * Shortlord discography sourced from Discogs API
 * https://www.discogs.com/artist/1789213-Short-Lord
 * https://www.discogs.com/label/565387-Jentown-Crhyme-Records
 */

export const DISCOGS_ARTIST_URL =
  "https://www.discogs.com/artist/1789213-Short-Lord?superFilter=Credits";

export const DISCOGS_PROFILE =
  "Shortlord is the owner of Chosenfewrecords. Earlier, he sparked the idea for Black Angel Records — founded by Eric I.Q. Gray. They released The Prophets Empire's \"The Fight\" on Black Angel before it was picked up by BMG, with massive MTV rotation in Germany 1998/1999.";

export type DiscogsRole =
  | "Main"
  | "Producer"
  | "Appearance"
  | "TrackAppearance";

export type DiscogsEntry = {
  id: string;
  title: string;
  artist: string;
  year: number | null;
  format: string;
  role: DiscogsRole;
  discogsId: number;
  url: string;
  /** Discogs label when relevant (e.g. Jentown Crhyme) */
  label?: string;
  /** Featured track name from Discogs trackinfo */
  track?: string;
  note?: string;
};

/** Official Main releases (deduped — one row per title) */
export const DISCOGS_MAIN: DiscogsEntry[] = [
  {
    id: "ganja",
    title: "Ganja",
    artist: "Shortlord & Warrior Rapper School",
    year: 2024,
    format: "File · AAC",
    role: "Main",
    discogsId: 35234632,
    url: "https://www.discogs.com/release/35234632",
    label: "Chosen Few Records (3)",
  },
  {
    id: "hustle-hard",
    title: "Hustle Hard",
    artist: "Shortlord",
    year: 2018,
    format: "LP · Album / CD",
    role: "Main",
    discogsId: 35215993,
    url: "https://www.discogs.com/release/35215993",
    label: "Chosen Few Records (3)",
  },
  {
    id: "mardi-gras",
    title: "Mardi Gras",
    artist: "Shortlord",
    year: 2014,
    format: "CD",
    role: "Main",
    discogsId: 35234554,
    url: "https://www.discogs.com/release/35234554",
    label: "Chosen Few Records (3)",
  },
  {
    id: "purple-magic",
    title: "Purple Magic",
    artist: "Shortlord",
    year: 2013,
    format: "CD · Album / Mixtape + LP",
    role: "Main",
    discogsId: 35215795,
    url: "https://www.discogs.com/release/35215795",
    label: "Chosen Few Records (3)",
  },
  {
    id: "spirits",
    title: "Spirits",
    artist: "Shortlord",
    year: 2013,
    format: "CD",
    role: "Main",
    discogsId: 35217208,
    url: "https://www.discogs.com/release/35217208",
    label: "Chosen Few Records (3)",
  },
  {
    id: "return-of-the-ancient-one",
    title: "Return Of The Ancient One",
    artist: "Shortlord",
    year: 2010,
    format: "CD · Album",
    role: "Main",
    discogsId: 7503593,
    url: "https://www.discogs.com/release/7503593",
    label: "Chosen Few Records (3)",
  },
  {
    id: "king-of-da-city",
    title: "King Of Da City",
    artist: "Shortlord",
    year: 2009,
    format: "CD · Album · Promo",
    role: "Main",
    discogsId: 7503011,
    url: "https://www.discogs.com/release/7503011",
    label: "Chosen Few Records (3)",
  },
  {
    id: "move-2-da-beat",
    title: "Move 2 da Beat",
    artist: "Shortlord feat. Daddy Freddy",
    year: 2009,
    format: "File · MP3 · Maxi",
    role: "Main",
    discogsId: 35234764,
    url: "https://www.discogs.com/release/35234764",
    label: "Chosen Few Records (3)",
    note: "Official video · feat. Daddy Freddy",
  },
  {
    id: "heavensent",
    title: "Heaven Sent",
    artist: "Shortlord",
    year: 2006,
    format: "CD · Album",
    role: "Main",
    discogsId: 6958959,
    url: "https://www.discogs.com/release/6958959",
    label: "Chosen Few Records (3)",
    note: "First official Chosenfew release in national German stores · Rough Trade / Omnimedia distribution",
  },
  {
    id: "crusade",
    title: "Crusade",
    artist: "Shortlord",
    year: 2001,
    format: "Release",
    role: "Main",
    discogsId: 467531,
    url: "https://www.discogs.com/master/467531",
  },
];

/**
 * Producer / Appearance / Track credits from Discogs artist page
 * (incl. Jentown Crhyme features)
 */
export const DISCOGS_CREDITS: DiscogsEntry[] = [
  {
    id: "nettoblaster",
    title: "Nettoblaster",
    artist: "Capuz",
    year: 2013,
    format: "16×File · MP3 · Album",
    role: "Appearance",
    discogsId: 7118272,
    url: "https://www.discogs.com/release/7118272",
    track: "Chill Trill",
  },
  {
    id: "mysterious-mama",
    title: "Mysterious Mama",
    artist: "DJ Sting",
    year: 2012,
    format: "CDr · Album",
    role: "Appearance",
    discogsId: 35111276,
    url: "https://www.discogs.com/release/35111276",
    track: "One Luv",
  },
  {
    id: "more-than-a-crew",
    title: "More Than A Crew",
    artist: "Men Of No Nation",
    year: 2008,
    format: "CD · Album",
    role: "Producer",
    discogsId: 2282905,
    url: "https://www.discogs.com/release/2282905",
    label: "Chosen Few Records (3)",
    track: "Fuck Ya Spotlights…",
    note: "Producer + Appearance",
  },
  {
    id: "wilder-westen",
    title: "Wilder Westen",
    artist: "Kader",
    year: 2005,
    format: "CD + DVD",
    role: "Appearance",
    discogsId: 16674390,
    url: "https://www.discogs.com/release/16674390",
    label: "Jentown Crhyme Records",
    track: "Wilder Westen Remix",
    note: "Feature on Jentown Crhyme",
  },
  {
    id: "organized-crhyme-vol-1",
    title: "Organized Crhyme Mixtape Vol. 1",
    artist: "Various",
    year: 2005,
    format: "CD · Comp · Mixtape",
    role: "TrackAppearance",
    discogsId: 8983229,
    url: "https://www.discogs.com/release/8983229",
    label: "Jentown Crhyme Records",
    track: "Gestern & Heute",
    note: "Feature on Jentown Crhyme",
  },
  {
    id: "hamburg-hip-hop-next-level",
    title: "Hamburg Hip Hop — Next Level",
    artist: "Various",
    year: 2005,
    format: "CD · Comp",
    role: "TrackAppearance",
    discogsId: 4135570,
    url: "https://www.discogs.com/release/4135570",
    label: "Bandog Records",
    track: "Frontin",
  },
  {
    id: "black-rhapsody",
    title: "The Black Rhapsody",
    artist: "Nana",
    year: 2004,
    format: "2×CD · Comp",
    role: "Appearance",
    discogsId: 8970089,
    url: "https://www.discogs.com/release/8970089",
    label: "DA Records",
    track: "Mission (Booya)",
  },
  {
    id: "the-fight",
    title: "The Fight",
    artist: 'Eric "I.Q." Gray Presents The Prophets Empire',
    year: 1998,
    format: "Black Angel → BMG · MTV DE 98/99",
    role: "Producer",
    discogsId: 326348,
    url: "https://www.discogs.com/master/326348",
    note: "Producer + Appearance · idea sparked by Shortlord; label founded by Eric I.Q. Gray",
  },
  {
    id: "nana-album",
    title: "Nana",
    artist: "Nana",
    year: 1997,
    format: "Album",
    role: "Appearance",
    discogsId: 285546,
    url: "https://www.discogs.com/master/285546",
  },
  {
    id: "illixit-work-pt9",
    title: "Illixit Work Pt.9",
    artist: "DJ Illegal",
    year: null,
    format: "Cass · Mixtape",
    role: "TrackAppearance",
    discogsId: 33321672,
    url: "https://www.discogs.com/release/33321672",
    label: "M-Pire Records",
    track: "Crusade (Illy Exclusive)",
  },
];

/** Newer label drops not (yet) fully listed as Main on Discogs */
export const LABEL_EXTRA = [
  {
    id: "top-floor",
    title: "Top Floor",
    artist: "Shortlord",
    year: 2026,
    format: "Single · Lo-fi House",
    tag: "New",
    artwork_url: "/top-floor-cover.png",
    streaming_links: {
      spotify: "https://open.spotify.com/track/6le1yldGcYXZGFXgAAkBFR",
    },
  },
  {
    id: "nice-n-sweet",
    title: "Nice N Sweet",
    artist: "Shortlord",
    year: 2026,
    format: "Single",
    artwork_url: "/covers/nice-n-sweet.jpg",
    streaming_links: {
      spotify: "https://open.spotify.com/album/2jBcSbPg8mZrhTPuJYAR9O",
    },
  },
  {
    id: "ayree",
    title: "Ayree",
    artist: "Shortlord",
    year: 2026,
    format: "EP",
    artwork_url: "/covers/ayree.jpg",
    streaming_links: {
      spotify: "https://open.spotify.com/album/5iWsmJfGPjcFr1BuQRaq6z",
    },
  },
  {
    id: "run-di-city",
    title: "Run Di City",
    artist: "Shortlord",
    year: 2026,
    format: "Single",
    artwork_url: "/covers/run-di-city.jpg",
    streaming_links: {
      spotify: "https://open.spotify.com/album/5p22JxQv2wveFlw0lNzOTu",
    },
  },
  {
    id: "ways-of-mankind",
    title: "Ways of Mankind",
    artist: "Shortlord ft. Mounier",
    year: 2008,
    format: "Single · prod. Farhot",
    tag: "YouTube",
    artwork_url: "/covers/ways-of-mankind.jpg",
    streaming_links: {
      youtube: "https://www.youtube.com/watch?v=L7R1oiGEO8k",
    },
  },
  {
    id: "guyana-girl",
    title: "Guyana Girl",
    artist: "Shortlord feat. Jahrose",
    year: 2010,
    format: "Single · Official Video",
    tag: "YouTube",
    artwork_url: "/covers/return-of-the-ancient-one.jpg",
    streaming_links: {
      youtube: "https://www.youtube.com/watch?v=6Wcrvn_Y4FQ",
    },
  },
  {
    id: "wie-wir-leben",
    title: "Wie wir Leben",
    artist: "Capuz feat. Shortlord",
    year: 2009,
    format: "Chosenfewrecords · Official Video",
    tag: "YouTube",
    artwork_url: "/covers/wie-wir-leben.jpg",
    streaming_links: {
      youtube: "https://www.youtube.com/watch?v=7_1L910qh-E",
    },
  },
  {
    id: "field-nggah-thought",
    title: "Field Nggah Thought / About Me",
    artist: "Haji Brown",
    year: 2015,
    format: "Chosenfewrecords · prod. Shortlord",
    tag: "YouTube",
    artwork_url: "/covers/haji-brown.jpg",
    streaming_links: {
      youtube: "https://www.youtube.com/watch?v=Ey5rwziBimc",
    },
  },
  {
    id: "genug-ist-genug",
    title: "Genug ist Genug",
    artist: "King Kolera",
    year: 2012,
    format: "Chosenfewrecords",
    artwork_url: "/covers/genug-ist-genug.jpg",
    streaming_links: {
      spotify: "https://open.spotify.com/album/2874ianwzho6d3jdrdj0Mz",
    },
  },
  {
    id: "beep",
    title: "Beep",
    artist: "Seven 30",
    year: 2005,
    format: "Chosenfewrecords / Da Real World",
  },
  {
    id: "kauzzenmukke",
    title: "Kauzzenmukke",
    artist: "Capuz · Chosenfewrecords",
    year: 2008,
    format: "2008/09 · Chosenfewrecords",
  },
] as const;

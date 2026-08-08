export type ArchiveShot = {
  src: string;
  alt: string;
  era: "then" | "now";
  caption: string;
  /** masonry span hint */
  span?: "tall" | "wide" | "square";
  /** longer story line under caption */
  story?: string;
};

/** Chosenfewrecords archive — back in the days + now */
export const ARCHIVE_SHOTS: ArchiveShot[] = [
  {
    src: "/photos/archive/img_4080.jpg",
    alt: "Chosen Few Records merch — lion logo sweatshirt",
    era: "then",
    caption: "Merch · Lion mark",
    span: "tall",
  },
  {
    src: "/photos/archive/img_4079.jpg",
    alt: "Shortlord holding Chosen Few Records sweatshirt",
    era: "then",
    caption: "Studio · Logo drop",
    span: "square",
  },
  {
    src: "/photos/archive/img_4034.jpg",
    alt: "DJ Farhot behind the decks in a Chosen Few shirt",
    era: "then",
    caption: "DJ Farhot · Decks",
    span: "tall",
    story: "DJ Farhot on the decks — Chosen Few.",
  },
  {
    src: "/photos/archive/img_4090.jpg",
    alt: "Capuz and Gamma live on stage — Chosenfewrecords showcase, opening for Bootcamp Clique",
    era: "then",
    caption: "Capuz · Gamma · Showcase",
    span: "wide",
    story:
      "Live on stage — Chosenfewrecords showcase, opening act for Bootcamp Clique.",
  },
  {
    src: "/photos/archive/img_4082.jpg",
    alt: "Stage performance with crowd — early Chosenfew days",
    era: "then",
    caption: "Stage · Crowd",
    span: "wide",
  },
  {
    src: "/photos/archive/img_4081.jpg",
    alt: "Raekwon of Wu-Tang Clan with DJ Madman, Shortlord of Chosenfew, and Raekwon’s manager on stage",
    era: "then",
    caption: "Raekwon · Madman · Shortlord",
    span: "square",
    story:
      "Raekwon (Wu-Tang Clan), DJ Madman, Shortlord (Chosenfew) — the other is Raekwon’s manager.",
  },
  {
    src: "/photos/archive/nneka-first-concert.jpg",
    alt: "Tommy, Nneka and Shortlord at Nneka’s first concert — Shortlord mentor, Tommy manager",
    era: "then",
    caption: "Nneka · First concert",
    span: "tall",
    story:
      "Tommy, Nneka, Shortlord — Nneka’s first ever concert. Shortlord was her mentor and friend; Tommy was her manager at the time.",
  },
  {
    src: "/photos/archive/img_4091.jpg",
    alt: "Crew backstage with flight cases — early 2000s",
    era: "then",
    caption: "Backstage · Crew",
    span: "wide",
  },
  {
    src: "/photos/archive/img_4035.jpg",
    alt: "DJ Farhot, Maskoe, Adopekid, Kumai and Shortlord around the table — Shortlord on the right",
    era: "then",
    caption: "Farhot · Maskoe · Adopekid · Kumai · Shortlord",
    span: "wide",
    story:
      "Night table — left to right: DJ Farhot, Maskoe, Adopekid, Kumai, Shortlord (right).",
  },
  {
    src: "/photos/archive/img_4092.jpg",
    alt: "NAGA Jam tour Berlin stop — Capuz, Shortlord, Rowdy Rebel",
    era: "then",
    caption: "NAGA Jam · Rowdy Rebel",
    span: "tall",
    story:
      "Berlin stop — Capuz, Shortlord, Rowdy Rebel on the frame.",
  },
  {
    src: "/photos/archive/img_4093.jpg",
    alt: "DJ Farhot when he was Chosenfew’s DJ — life on the decks, crew by the van",
    era: "then",
    caption: "Farhot · Life on the decks",
    span: "wide",
    story:
      "DJ Farhot when he was our DJ — life on the decks.",
  },
  {
    src: "/photos/archive/img_4094.jpg",
    alt: "Chosenfew artists from back then — studio portrait",
    era: "then",
    caption: "Chosenfew artists · Then",
    span: "tall",
    story: "Chosenfew artists from back then.",
  },
  {
    src: "/photos/archive/img_3961.jpg",
    alt: "NAGA Jam tour with Big Twins — night street by the van",
    era: "then",
    caption: "NAGA Jam · Big Twins",
    span: "square",
    story:
      "The exact Shortlord × NAGA Apparel Jam — Big Twins (Mobb Deep) Germany tour night. Bonn · Cologne touchdowns; Die P’s first concert; the manager hook-up starts here.",
  },
  {
    src: "/photos/archive/img_0958.jpg",
    alt: "Shortlord and Die P after her Hamburg show — current",
    era: "now",
    caption: "Die P · Hamburg now",
    span: "tall",
    story:
      "Current frame — after Die P’s Hamburg show. Shortlord ran into the manager again and he admitted it all: the spark goes back to Shortlord × NAGA Apparel Jam on Big Twins’ (Mobb Deep) Germany tour (Bonn · Cologne) — Die P’s first ever concert, the night that promoter got hooked up as her manager. Vision from Shortlord and NAGA Apparel; both making serious heat years later.",
  },
  {
    src: "/photos/archive/img_20260301_140828_299_01_16.jpg",
    alt: "Shortlord and Lyn T in Boogiepark studio — 30 years later, for Shortlord’s hustle",
    era: "now",
    caption: "Boogiepark · Lyn T",
    span: "wide",
    story:
      "Shortlord and Lyn T — 30 years later in the Boogiepark studio where it all started. For Shortlord’s hustle.",
  },
];

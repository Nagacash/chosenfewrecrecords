export const PARTNERS = [
  {
    name: "NAGA Club",
    url: "https://nagaclub.de",
    role: "Official Partner",
    note: "Hamburg · Steintorwall 4 · Street culture & nights",
  },
] as const;

export const MARQUEE_TITLES = [
  "Heaven Sent",
  "King Of Da City",
  "The Fight",
  "Purple Magic",
  "Ganja",
  "Spirits",
  "Mardi Gras",
  "Top Floor",
  "Hustle Hard",
  "Return Of The Ancient One",
  "Move 2 da Beat",
  "Crusade",
  "Nice N Sweet",
  "Ayree",
  "Run Di City",
] as const;

export const ARTIST = {
  role: "Artist · Producer · Owner & CEO · Chosenfewrecords",
  discogsUrl:
    "https://www.discogs.com/artist/1789213-Short-Lord?superFilter=Credits",
  bio: {
    en: 'Roots in French Guiana (Guyane), with Caribbean lineage also traced to Martinique and St. Lucia. US-American on his father\'s side — Chicago. Raised beside the army base in Hessen. Shortlord came up in Hamburg hip-hop from the mid-90s — first heat on 2ruff\'s "Ya Ready?", then gold-era Nana and MTV with The Fight. He helped build the Boogiepark scene, supported Jentown Crhyme / 187 with Rough Trade distribution, and in 2006 founded Chosenfewrecords, which he still owns. From the underground out — always independent.',
    de: "Wurzeln in Französisch-Guayana (Guyane), mit karibischer Linie auch nach Martinique und St. Lucia. US-Amerikaner väterlicherseits — Chicago. Aufgewachsen neben der Army Base in Hessen. Shortlord kommt aus dem Hamburger Hip-Hop der Mid-90s — erste Heat auf 2ruffs „Ya Ready?“, dann Gold-Ära mit Nana und MTV mit The Fight. Er half, die Boogiepark-Szene aufzubauen, unterstützte Jentown Crhyme / 187 mit Rough-Trade-Distribution und gründete 2006 Chosenfewrecords, das er bis heute besitzt. Aus dem Underground heraus — immer unabhängig.",
  },
  badges: [
    { num: "95", txt: "2ruff · Ya Ready?" },
    { num: "Gold", txt: "Nana · 1997/98 · 400K+" },
    { num: "MTV", txt: "The Fight · 98/99 DE" },
    { num: "BL", txt: "Bundesliga 2022" },
  ],
  timeline: [
    {
      year: "1995",
      text: 'First release — 2ruff "Ya Ready?" (B-side of Wicked Witch, Metronome / Polydor). Fresh in the game — before he had an artist name.',
      badge: "First",
      href: "https://www.discogs.com/release/415429-2ruff-Wicked-Witch",
      linkLabel: "Discogs",
    },
    {
      year: "1997",
      text: 'Feature on Nana\'s album — gold-era breakthrough (400K+).',
      badge: "Feature",
      href: "https://www.discogs.com/master/285546",
      linkLabel: "Discogs",
    },
    {
      year: "1997–98",
      text: 'Sparks the idea for Black Angel Records — founded by Eric I.Q. Gray. The Prophets Empire "The Fight" drops first on Black Angel, then BMG picks it up.',
      badge: "Black Angel",
    },
    {
      year: "1998–99",
      text: 'The Fight (feat. Shortlord) — BMG release. Massive MTV rotation in Germany.',
      badge: "MTV / BMG",
      href: "https://www.discogs.com/master/326348",
      linkLabel: "Discogs",
    },
    {
      year: "Late 90s",
      text: 'Brings Class Productions & Phantom Black to Boogiepark — one of Hamburg\'s first real hip-hop studios. Four years after Class left, Sleepwalker takes over that room and records Samy Deluxe\'s "Weck mich auf" there (Gold, #4 Germany, 2001).',
    },
    {
      year: "2001",
      text: "Crusade — Shortlord debut / early Main release.",
      badge: "Main",
      href: "https://www.discogs.com/master/467531",
      linkLabel: "Discogs",
    },
    {
      year: "2005",
      text: 'Jentown Crhyme features — Kader "Wilder Westen Remix" · Organized Crhyme Vol. 1 "Gestern & Heute".',
      badge: "Feature",
      href: "https://www.discogs.com/release/16674390",
      linkLabel: "Discogs",
    },
    {
      year: "2006",
      text: "Founds and owns Chosenfewrecords. Heaven Sent — CD Album. Prod. Farhot · feat. Daddy Freddy, Nneka.",
      badge: "Owner",
      href: "https://www.discogs.com/release/6958959",
      linkLabel: "Discogs",
    },
    {
      year: "2007–08",
      text: "Supports Jentown Crhyme / 187 with Rough Trade distribution — Bonez MC's first official solo album Mehr Geht Nicht (2008) comes out through that deal.",
      badge: "Distro",
    },
    {
      year: "2008",
      text: "Produces Men Of No Nation — More Than A Crew (Chosenfewrecords).",
      badge: "Producer",
      href: "https://www.discogs.com/release/2282905",
      linkLabel: "Discogs",
    },
    {
      year: "2009",
      text: "King Of Da City · Move 2 da Beat.",
      badge: "Main",
    },
    {
      year: "2010",
      text: "Return Of The Ancient One — CD Album (Chosenfewrecords).",
      badge: "Main",
      href: "https://www.discogs.com/release/7503593",
      linkLabel: "Discogs",
    },
    {
      year: "2013–14",
      text: "Purple Magic · Spirits · Mardi Gras.",
      badge: "Main",
    },
    {
      year: "2013",
      text: 'Capuz Nettoblaster — Appearance on "Chill Trill".',
      badge: "Feature",
      href: "https://www.discogs.com/release/7118272",
      linkLabel: "Discogs",
    },
    {
      year: "2015",
      text: 'Produces Haji Brown — "Field Nggah Thought" / "About Me" (Chosenfewrecords).',
      badge: "Producer",
      href: "https://www.youtube.com/watch?v=l1pEfRY7poA",
      linkLabel: "Watch",
    },
    {
      year: "2018",
      text: "Hustle Hard — LP / CD Album.",
      badge: "Main",
      href: "https://www.discogs.com/release/35215993",
      linkLabel: "Discogs",
    },
    {
      year: "2022",
      text: 'Bundesliga "#YouAreTheBundesliga" official campaign — Shortlord rap on verified @bundesliga.',
      href: "https://www.instagram.com/tv/CYZCXOBoGmg/",
      linkLabel: "Watch",
    },
    {
      year: "2024",
      text: "Ganja — Shortlord & Warrior Rapper School.",
      badge: "Main",
      href: "https://www.discogs.com/release/35234632",
      linkLabel: "Discogs",
    },
    {
      year: "2026",
      text: "Top Floor · Nice N Sweet · Ayree · Run Di City — active on all platforms.",
      badge: "New",
    },
  ],
} as const;

export const COLLABS = [
  {
    name: "Nneka",
    origin: "Nigeria",
    track: "Petre La Tête & Heaven Sent LP",
    mark: "NG",
  },
  {
    name: "Daddy Freddy",
    origin: "UK / Jamaica",
    track: "Heaven Sent LP (2006)",
    mark: "JM",
  },
  {
    name: "Big Twins",
    origin: "Queensbridge, NYC",
    track: "Petre La Tête",
    mark: "NY",
  },
  {
    name: "Warrior Rapper School",
    origin: "Peru",
    track: "Ganja (2024)",
    mark: "PE",
  },
  {
    name: "Farhot",
    origin: "Hamburg (Kabul Fire)",
    track: "Ways of Mankind prod. — before Haftbefehl, Talib Kweli, Nas",
    mark: "HH",
  },
  {
    name: "Nana",
    origin: "Germany",
    track: "Nana (1997) · The Black Rhapsody (2004)",
    mark: "DE",
  },
  {
    name: "Eric I.Q. Gray",
    origin: "Germany · Black Angel Records",
    track: "Founded Black Angel (idea sparked by Shortlord) · The Fight → BMG / MTV 98–99",
    mark: "IQ",
  },
  {
    name: "Black Angel Records",
    origin: "Founded by Eric I.Q. Gray",
    track: "Idea sparked by Shortlord · The Fight indie → BMG pickup",
    mark: "BA",
  },
  {
    name: "Jentown Crhyme",
    origin: "Hamburg-Jenfeld",
    track: "Shortlord supported the label with Rough Trade distribution",
    mark: "JC",
  },
  {
    name: "Bonez MC",
    origin: "Hamburg · 187",
    track: "Supported the label with distribution — first official solo LP Mehr Geht Nicht (2008) via Jentown Crhyme / Rough Trade",
    mark: "187",
  },
] as const;

export const ABOUT = {
  body: {
    en: 'Chosenfewrecords is owned by Shortlord. Before that chapter, he sparked the idea for Black Angel Records — the label founded by Eric I.Q. Gray. Together they put out The Prophets Empire\'s "The Fight" on Black Angel first; it was then picked up for a BMG release and got massive MTV rotation in Germany in 1998/1999. He brought Class Productions and Phantom Black to Boogiepark in the late 90s, turning it into one of Hamburg\'s first real hip-hop hotspots. Class Productions produced KC da Rookee and the Harlekings. Four years after Class left, Sleepwalker took over their studio and made Samy Deluxe\'s "Weck mich auf" from it — #4 Germany, Gold record, 2001. He founded and owns Chosenfewrecords (2006). He also supported Jentown Crhyme Records (187) with Rough Trade distribution — Bonez MC\'s first official solo album, Mehr Geht Nicht (2008), came out through that pipeline. Always independent.',
    de: "Chosenfewrecords gehört Shortlord — er ist Owner des Labels. Zuvor kam von ihm die Idee zu Black Angel Records — gegründet von Eric I.Q. Gray. Gemeinsam brachten sie „The Fight“ von The Prophets Empire zuerst auf Black Angel heraus; danach BMG-Pickup und massive MTV-Rotation in Deutschland 1998/1999. Er brachte Class Productions und Phantom Black Ende der 90er nach Boogiepark. Class Productions produzierten KC da Rookee und die Harlekings. Vier Jahre nachdem Class gegangen war, übernahm Sleepwalker das Studio und machte Samy Deluxe' „Weck mich auf“ daraus — #4 Deutschland, Gold, 2001. Gründer und Owner von Chosenfewrecords seit 2006. Er unterstützte Jentown Crhyme Records (187) mit dem Rough-Trade-Distribution-Deal — darüber erschien Bonez MCs erstes offizielles Soloalbum Mehr Geht Nicht (2008). Immer unabhängig.",
  },
  stats: [
    { num: "2006", label: "Founded" },
    { num: "20+", label: "Years Active" },
    { num: "244", label: "YouTube Videos" },
    { num: "BL", label: "Bundesliga Campaign 2022" },
  ],
  accolades: [
    {
      label: "Official Recognition",
      body: "Listed in Hamburg's Labelförderung Förderergebnisse — Behörde für Kultur und Medien (Hamburg Ministry of Culture & Media)",
      tone: "gold" as const,
    },
    {
      label: "Bundesliga Campaign — Jan 2022",
      body: 'Shortlord\'s rap featured in the official DFL Bundesliga Instagram campaign "#YouAreTheBundesliga" — 6,500+ likes on the verified @bundesliga account. 180M+ Bundesliga fans reached.',
      tone: "accent" as const,
      href: "https://www.instagram.com/tv/CYZCXOBoGmg/",
      linkLabel: "Watch the Clip",
    },
    {
      label: "Black Angel Records → BMG / MTV",
      body: 'Black Angel Records was founded by Eric I.Q. Gray — the idea was sparked by Shortlord. They released The Prophets Empire\'s "The Fight" on Black Angel first; it was then picked up by BMG. Massive MTV rotation in Germany, 1998/1999.',
      tone: "gold" as const,
      href: "https://www.discogs.com/master/326348",
      linkLabel: "The Fight on Discogs",
    },
    {
      label: "Hamburg Hip-Hop Origin",
      body: 'Same underground as DJ Farhot (Haftbefehl "Chabos", Nneka, Talib Kweli, Nas, Isaiah Rashad / TDE), Sleepwalker (Samy Deluxe "Weck mich auf", Gold 2001), and the entire Boogiepark scene that shaped Hamburg rap history.',
      tone: "gold" as const,
    },
    {
      label: "Jentown Crhyme × Rough Trade",
      body: "Shortlord supported Jentown Crhyme Records (187) with their Rough Trade distribution deal. Bonez MC's first official solo album, Mehr Geht Nicht (2008, Jentown Crhyme / Rough Trade Arvato), moved through that pipe.",
      tone: "accent" as const,
      href: "https://www.discogs.com/release/4722864-Bonez-MC-Mehr-Geht-Nicht",
      linkLabel: "Mehr Geht Nicht on Discogs",
    },
    {
      label: "Official Partner — NAGA Club",
      body: "Chosenfewrecords' official partner. NAGA Club Hamburg — Steintorwall 4. Street culture, nights, and the same house frequency.",
      tone: "gold" as const,
      href: "https://nagaclub.de",
      linkLabel: "nagaclub.de",
    },
  ],
} as const;

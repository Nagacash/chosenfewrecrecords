import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";
import { SOCIAL } from "@/lib/social";

/** Organization + WebSite + MusicGroup JSON-LD for SEO/GEO */
export function JsonLd({ locale }: { locale: string }) {
  const org = {
    "@context": "https://schema.org",
    "@type": "RecordLabel",
    "@id": `${SITE_URL.replace(/\/$/, "")}/#organization`,
    name: SITE_NAME,
    alternateName: ["Chosen Few Records", "Chosenfewrecords Hamburg"],
    url: absoluteUrl(`/${locale}`),
    logo: absoluteUrl("/chosenfew_logo_white.png"),
    image: absoluteUrl("/og.jpg"),
    foundingDate: "2006",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hamburg",
      postalCode: "20355",
      addressCountry: "DE",
    },
    sameAs: [
      SOCIAL.instagram,
      SOCIAL.instagramShortlord,
      SOCIAL.spotifyArtist,
      SOCIAL.youtube,
    ],
    description:
      "Independent hip-hop and Caribbean music label from Hamburg, owned by Shortlord. Founded 2006. First national German store release: Heaven Sent (Rough Trade / Omnimedia).",
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL.replace(/\/$/, "")}/#website`,
    name: SITE_NAME,
    url: absoluteUrl(`/${locale}`),
    inLanguage: [locale],
    publisher: { "@id": `${SITE_URL.replace(/\/$/, "")}/#organization` },
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "@id": `${SITE_URL.replace(/\/$/, "")}/#shortlord`,
    name: "Shortlord",
    url: absoluteUrl(`/${locale}/artists/shortlord`),
    image: absoluteUrl("/og-shortlord.jpg"),
    genre: ["Hip Hop", "Reggae", "Caribbean"],
    foundingLocation: {
      "@type": "Place",
      name: "Hamburg, Germany",
    },
    memberOf: { "@id": `${SITE_URL.replace(/\/$/, "")}/#organization` },
    sameAs: [SOCIAL.instagramShortlord, SOCIAL.spotifyArtist],
    description:
      "Hamburg hip-hop and Caribbean artist; owner of Chosenfewrecords. Roots in French Guiana, Chicago lineage, home in Hamburg.",
  };

  const graph = [org, website, person];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

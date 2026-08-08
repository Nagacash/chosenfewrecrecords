import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { INDEXABLE_PATHS, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL.replace(/\/$/, "");
  const now = new Date();

  return routing.locales.flatMap((locale) =>
    INDEXABLE_PATHS.map((path) => {
      const url = `${base}/${locale}${path}`;
      const languages = Object.fromEntries(
        routing.locales.map((l) => [l, `${base}/${l}${path}`]),
      ) as Record<string, string>;
      languages["x-default"] = `${base}/${routing.defaultLocale}${path}`;

      return {
        url,
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path === "/about" || path === "/artists/shortlord" ? 0.9 : 0.7,
        alternates: { languages },
      };
    }),
  );
}

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/*/impressum",
          "/*/datenschutz",
          "/impressum",
          "/datenschutz",
        ],
      },
    ],
    sitemap: `${SITE_URL.replace(/\/$/, "")}/sitemap.xml`,
    host: SITE_URL.replace(/\/$/, ""),
  };
}

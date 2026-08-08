/** Canonical site URL + SEO helpers */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://chosenfewrecords.com";

export const SITE_NAME = "Chosenfewrecords";

export const INDEXABLE_PATHS = [
  "",
  "/releases",
  "/artists/shortlord",
  "/videos",
  "/about",
  "/features",
  "/roots",
  "/demo",
] as const;

export function absoluteUrl(path = "") {
  const base = SITE_URL.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

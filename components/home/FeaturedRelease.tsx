import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Release } from "@/lib/toolost";
import { SectionLabel } from "@/components/ui/SectionLabel";

export async function FeaturedRelease({ release }: { release: Release }) {
  const t = await getTranslations("Featured");

  const streams = [
    {
      key: "spotify",
      label: "Spotify",
      href:
        release.streaming_links?.spotify ||
        "https://open.spotify.com/artist/114s8gxO8QBSQnvDFSa9nj",
    },
    {
      key: "apple",
      label: "Apple Music",
      href: release.streaming_links?.apple_music || "https://music.apple.com/",
    },
    {
      key: "yt",
      label: "YouTube Music",
      href: release.streaming_links?.youtube_music || "https://music.youtube.com/",
    },
    {
      key: "deezer",
      label: "Deezer",
      href: release.streaming_links?.deezer || "https://www.deezer.com/",
    },
  ];

  return (
    <section id="releases" className="scroll-mt-20 bg-surface px-5 py-16 md:px-10 md:py-20">
      <SectionLabel>{t("label")}</SectionLabel>

      <div className="grid border border-white/[0.06] md:grid-cols-2">
        {/* Cover only — no text overlays */}
        <div className="relative aspect-square overflow-hidden bg-background">
          <Image
            src={release.artwork_url || "/top-floor-cover.png"}
            alt={`${release.title} cover art`}
            fill
            priority
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover transition duration-700 hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-col justify-between border-t border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent p-8 md:border-l md:border-t-0 md:p-12">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {t("tag")}
            </div>
            <h2 className="mb-3 font-display text-[clamp(36px,5vw,72px)] font-black uppercase leading-[0.9] tracking-tight text-white">
              {release.title || t("title")}
            </h2>
            <p className="mb-8 font-display text-xl font-bold italic uppercase text-muted">
              {release.id === "top-floor"
                ? t("artist")
                : release.artist || t("artist")}
            </p>

            <div className="mb-8 flex flex-wrap gap-2">
              {streams.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/[0.06] px-3.5 py-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted transition hover:border-accent hover:text-accent"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <a
            href="#releases-grid"
            className="inline-block self-start border border-white/30 px-9 py-3.5 font-display text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:border-accent hover:text-accent"
          >
            {t("catalogue")}
          </a>
        </div>
      </div>
    </section>
  );
}

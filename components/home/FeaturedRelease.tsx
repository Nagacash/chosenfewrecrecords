import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Release } from "@/lib/toolost";
import { SOCIAL } from "@/lib/social";
import { getSpotifyForRelease } from "@/lib/spotify";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SpotifyEmbed } from "@/components/ui/SpotifyEmbed";
import { Stamp } from "@/components/ui/Stamp";

export async function FeaturedRelease({ release }: { release: Release }) {
  const t = await getTranslations("Featured");
  const spotify = getSpotifyForRelease(release);

  const streams = [
    {
      key: "spotify",
      label: "Spotify",
      href: release.streaming_links?.spotify || SOCIAL.spotifyArtist,
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
    <section
      id="releases"
      className="scroll-mt-20 bg-background px-5 py-[var(--section-y)] md:px-10 md:py-[var(--section-y-lg)]"
    >
      <SectionLabel>{t("label")}</SectionLabel>

      <div className="mt-2 grid border border-cream/15 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden bg-surface ink-outline">
          <Image
            src={release.artwork_url || "/top-floor-cover.png"}
            alt={`${release.title} cover art`}
            fill
            priority
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-between border-t border-cream/15 md:border-l md:border-t-0">
          <div className="kraft-panel p-8 md:p-10">
            <Stamp tone="accent">New Drop</Stamp>
            <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black/55">
              {t("tag")}
            </p>
            <h2 className="mt-2 font-display text-[clamp(40px,5.5vw,72px)] uppercase leading-[0.88] tracking-tight text-black">
              {release.title || t("title")}
            </h2>
            <p className="mt-2 font-display text-lg font-bold uppercase text-black/60">
              {release.id === "top-floor"
                ? t("artist")
                : release.artist || t("artist")}
            </p>
          </div>

          <div className="bg-surface p-8 md:p-10">
            {spotify ? (
              <div className="mb-8">
                <SpotifyEmbed
                  spotify={spotify}
                  size="standard"
                  title={`${release.title} on Spotify`}
                />
              </div>
            ) : null}
            <ul className="mb-8 space-y-2.5">
              {streams.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] uppercase tracking-[0.16em] text-cream/60 underline decoration-cream/20 underline-offset-4 transition-colors duration-fast hover:text-accent hover:decoration-accent"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#releases-grid"
              className="stamp-btn inline-flex min-h-11 w-full items-center justify-center bg-accent px-9 py-3.5 font-display text-sm font-black uppercase tracking-[0.08em] text-black transition-colors duration-fast hover:bg-accent-hover sm:w-auto"
            >
              {t("catalogue")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

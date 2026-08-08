import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ARTIST } from "@/lib/content";
import { DISCOGS_ARTIST_URL } from "@/lib/discogs";
import { pickLocaleText } from "@/lib/locale";

const HOME_YEARS = new Set([
  "1995",
  "1997",
  "1998–99",
  "Late 90s",
  "2006",
  "2007–08",
  "2026",
]);

export async function ArtistSpread() {
  const t = await getTranslations("Artist");
  const locale = await getLocale();
  const bio = pickLocaleText(ARTIST.bio, locale);
  const timeline = ARTIST.timeline.filter((row) => HOME_YEARS.has(row.year));

  return (
    <section id="artist" className="grid min-h-[100dvh] scroll-mt-20 overflow-hidden md:grid-cols-2">
      <div className="relative min-h-[55vh] md:min-h-full">
        <Image
          src="/shortlord-photo.jpg"
          alt="Shortlord"
          fill
          className="object-cover object-top brightness-105 contrast-105 saturate-[1.08]"
          sizes="(max-width:768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-background" />
        <div className="absolute bottom-0 left-0 h-1 w-24 bg-accent md:bottom-auto md:right-0 md:top-0 md:h-full md:w-1" />
      </div>

      <div className="flex flex-col justify-center bg-background px-5 py-16 md:px-12 md:py-24">
        <SectionLabel>{t("label")}</SectionLabel>
        <h2 className="font-display text-[clamp(48px,14vw,120px)] uppercase leading-[0.82] tracking-tight text-white">
          Short
          <br />
          <span className="text-accent">lord</span>
        </h2>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
          {ARTIST.role}
        </p>
        <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-cream/45">
          Guyane · Chicago · Hamburg
        </p>
        <p className="mt-8 max-w-[60ch] text-base leading-relaxed text-cream/75">
          {bio}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {ARTIST.badges.map((b) => (
            <div
              key={b.txt}
              className="border-2 border-white/[0.1] bg-surface2 px-3.5 py-2.5"
            >
              <div className="font-display text-[22px] font-black leading-none text-accent">
                {b.num}
              </div>
              <div className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-muted">
                {b.txt}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t-2 border-white/[0.1]">
          {timeline.map((row) => (
            <div
              key={`${row.year}-${row.text.slice(0, 24)}`}
              className="flex gap-4 border-b border-white/[0.06] py-3"
            >
              <span className="min-w-[56px] font-mono text-[10px] font-bold tabular-nums text-gold">
                {row.year}
              </span>
              <span className="text-sm leading-snug text-cream/70">
                {row.text}
                {"badge" in row && row.badge ? (
                  <span className="ml-1.5 inline-block bg-accent px-1.5 py-0.5 align-middle font-mono text-[7px] font-bold uppercase tracking-[0.1em] text-black">
                    {row.badge}
                  </span>
                ) : null}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/artists/shortlord"
            className="stamp-btn inline-flex min-h-11 w-full items-center justify-center bg-accent px-9 py-3.5 font-display text-sm font-black uppercase tracking-[0.08em] text-black transition-colors duration-fast hover:bg-accent-hover sm:w-auto"
          >
            {t("cta")}
          </Link>
          <a
            href={DISCOGS_ARTIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full items-center justify-center border-2 border-white/15 px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted transition-colors duration-fast hover:border-accent hover:text-accent sm:w-auto"
          >
            Discogs →
          </a>
        </div>
      </div>
    </section>
  );
}

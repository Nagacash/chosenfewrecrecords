import Image from "next/image";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Discography } from "@/components/home/Discography";
import { ARTIST } from "@/lib/content";
import { DISCOGS_PROFILE } from "@/lib/discogs";
import { pickLocaleText } from "@/lib/locale";

export default async function ShortlordPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations("Artist");
  const current = await getLocale();
  const bio = pickLocaleText(ARTIST.bio, current);

  return (
    <>
      <section className="min-h-screen bg-background">
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[50vh] md:min-h-screen">
            <Image
              src="/shortlord-photo.jpg"
              alt="Shortlord"
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width:768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-background" />
          </div>

          <div className="flex flex-col justify-center px-5 py-16 md:px-12 md:py-24">
            <SectionLabel>{t("label")}</SectionLabel>
            <h1 className="font-display text-[clamp(64px,8vw,120px)] font-black uppercase leading-[0.85] tracking-tight text-white">
              Short
              <br />
              <span className="text-accent">lord</span>
            </h1>
            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-accent">
              {ARTIST.role}
            </p>
            <p className="mt-8 max-w-[52ch] text-[15px] leading-relaxed text-cream/70">
              {bio}
            </p>
            <p className="mt-4 max-w-[52ch] text-[13px] leading-relaxed text-muted">
              {DISCOGS_PROFILE}
            </p>
            <a
              href={ARTIST.discogsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-accent hover:underline"
            >
              Discogs credits →
            </a>

            <div className="mt-8 flex flex-wrap gap-2">
              {ARTIST.badges.map((b) => (
                <div
                  key={b.txt}
                  className="border border-white/[0.06] bg-surface2 px-3.5 py-2.5"
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

            <div className="mt-10 space-y-0">
              {ARTIST.timeline.map((row) => (
                <div
                  key={`${row.year}-${row.text.slice(0, 24)}`}
                  className="flex gap-4 border-t border-white/[0.06] py-2.5"
                >
                  <span className="min-w-[52px] font-mono text-[10px] font-bold text-gold">
                    {row.year}
                  </span>
                  <span className="text-[13px] leading-snug text-cream/70">
                    {row.text}
                    {"badge" in row && row.badge ? (
                      <span className="ml-1.5 inline-block bg-accent px-1.5 py-0.5 align-middle font-mono text-[7px] uppercase tracking-[0.1em] text-black">
                        {row.badge}
                      </span>
                    ) : null}
                    {"href" in row && row.href ? (
                      <>
                        {" "}
                        <a
                          href={row.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[9px] uppercase tracking-[0.1em] text-accent"
                        >
                          → {row.linkLabel}
                        </a>
                      </>
                    ) : null}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Discography />
    </>
  );
}

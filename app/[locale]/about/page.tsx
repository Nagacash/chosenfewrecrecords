import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { InstagramEmbed } from "@/components/ui/InstagramEmbed";
import { Stamp } from "@/components/ui/Stamp";
import { ABOUT } from "@/lib/content";
import { pickLocaleText } from "@/lib/locale";

const BUNDESLIGA_IG = "https://www.instagram.com/tv/CYZCXOBoGmg/";

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations("About");
  const current = await getLocale();
  const body = pickLocaleText(ABOUT.body, current);

  return (
    <section className="relative overflow-hidden bg-background px-5 pb-20 pt-28 md:px-10">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.08] saturate-50"
        style={{ backgroundImage: "url(/shortlord-photo.jpg)" }}
      />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionLabel>{t("label")}</SectionLabel>
        <h1 className="mb-10 max-w-[12ch] font-display text-[clamp(40px,8vw,80px)] font-black uppercase leading-[0.92] tracking-tight text-white">
          {t("headline1")}
          <br />
          {t("headline2")}
          <br />
          <em className="not-italic text-accent">{t("headline3")}</em>
          <br />
          {t("headline4")}
        </h1>

        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <div className="min-w-0">
            <p className="max-w-[52ch] text-[15px] leading-relaxed text-cream/70">
              {body}
            </p>

            <div className="mt-8 space-y-4">
              {ABOUT.accolades.slice(0, 2).map((a) => (
                <div
                  key={a.label}
                  className={`border-l-[3px] p-5 ${
                    a.tone === "accent"
                      ? "border-accent bg-[rgba(255,106,0,0.06)]"
                      : "border-gold bg-[rgba(200,168,75,0.06)]"
                  }`}
                >
                  <div
                    className={`mb-2 font-mono text-[8px] uppercase tracking-[0.2em] ${
                      a.tone === "accent" ? "text-accent" : "text-gold"
                    }`}
                  >
                    {a.label}
                  </div>
                  <p className="text-[13px] leading-relaxed text-cream/80">
                    {a.body}
                    {"href" in a && a.href && a.href !== BUNDESLIGA_IG ? (
                      <>
                        {" "}
                        <a
                          href={a.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          → {a.linkLabel}
                        </a>
                      </>
                    ) : null}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0 space-y-4">
            <div className="grid grid-cols-2 gap-px bg-white/[0.06]">
              {ABOUT.stats.map((s) => (
                <div key={s.label} className="bg-surface2 p-6">
                  <div className="font-display text-4xl font-black text-accent">
                    {s.num}
                  </div>
                  <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {ABOUT.accolades.slice(2).map((a) => (
              <div
                key={a.label}
                className={`border-l-[3px] p-5 ${
                  a.tone === "accent"
                    ? "border-accent bg-[rgba(255,106,0,0.06)]"
                    : "border-gold bg-[rgba(200,168,75,0.06)]"
                }`}
              >
                <div
                  className={`mb-2 font-mono text-[8px] uppercase tracking-[0.2em] ${
                    a.tone === "accent" ? "text-accent" : "text-gold"
                  }`}
                >
                  {a.label}
                </div>
                <p className="text-[13px] leading-relaxed text-cream/80">
                  {a.body}
                  {"href" in a && a.href ? (
                    <>
                      {" "}
                      <a
                        href={a.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        → {a.linkLabel}
                      </a>
                    </>
                  ) : null}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bundesliga campaign — full-width feature */}
      <div className="relative z-10 mx-auto mt-16 max-w-6xl overflow-hidden border border-cream/15">
        <div className="roots-stripe h-1.5 w-full" />
        <div className="grid lg:grid-cols-[1fr_minmax(280px,420px)]">
          <div className="kraft-panel relative flex flex-col justify-between p-7 md:p-10">
            <div>
              <Stamp tone="accent">Campaign · 2022</Stamp>
              <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-black/50">
                Official DFL · @bundesliga
              </p>
              <h2 className="mt-3 max-w-[14ch] font-display text-[clamp(36px,5vw,56px)] font-black uppercase leading-[0.9] tracking-tight text-black">
                You Are The
                <br />
                <span className="text-[color:var(--accent)]">Bundesliga</span>
              </h2>
              <p className="mt-5 max-w-[42ch] text-[15px] font-medium leading-relaxed text-black/70">
                Shortlord on the verified Bundesliga Instagram — 6,500+ likes,
                180M+ fans in reach. From Hamburg underground to the league&apos;s
                official feed.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-end gap-6 border-t border-black/10 pt-6">
              <div>
                <p className="font-display text-3xl font-black text-black">6.5K+</p>
                <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-black/45">
                  Likes
                </p>
              </div>
              <div>
                <p className="font-display text-3xl font-black text-black">180M+</p>
                <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-black/45">
                  Fans reached
                </p>
              </div>
              <a
                href={BUNDESLIGA_IG}
                target="_blank"
                rel="noopener noreferrer"
                className="stamp-btn ml-auto inline-flex min-h-11 items-center justify-center bg-black px-6 py-3 font-display text-sm font-black uppercase tracking-[0.08em] text-cream transition-colors duration-fast hover:bg-accent hover:text-black"
              >
                Watch on IG →
              </a>
            </div>
          </div>

          <div className="relative border-t border-cream/15 bg-background p-4 md:p-5 lg:border-l lg:border-t-0">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at 70% 20%, rgba(255,106,0,0.45), transparent 55%)",
              }}
            />
            <div className="relative">
              <InstagramEmbed
                permalink={BUNDESLIGA_IG}
                caption="Bundesliga Instagram — Shortlord campaign clip"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-14 flex max-w-6xl flex-col gap-3 border-t border-cream/15 pt-8 sm:flex-row sm:flex-wrap">
        <Link
          href="/roots"
          className="inline-flex min-h-11 items-center justify-center border-2 border-caribbean/70 bg-caribbean/15 px-6 py-3 font-display text-sm font-bold uppercase tracking-[0.08em] text-cream transition-colors duration-fast hover:border-gold hover:text-gold"
        >
          Roots →
        </Link>
        <Link
          href="/features"
          className="inline-flex min-h-11 items-center justify-center border-2 border-cream/30 px-6 py-3 font-display text-sm font-bold uppercase tracking-[0.08em] text-cream transition-colors duration-fast hover:border-accent hover:text-accent"
        >
          Features →
        </Link>
        <Link
          href="/demo"
          className="stamp-btn inline-flex min-h-11 items-center justify-center bg-accent px-6 py-3 font-display text-sm font-black uppercase tracking-[0.08em] text-black transition-colors duration-fast hover:bg-accent-hover"
        >
          Demo →
        </Link>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { InstagramEmbed } from "@/components/ui/InstagramEmbed";
import { Stamp } from "@/components/ui/Stamp";
import { ABOUT } from "@/lib/content";
import { pickLocaleText } from "@/lib/locale";

const BUNDESLIGA_IG = "https://www.instagram.com/tv/CYZCXOBoGmg/";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "About" });
  const m = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("faq1q").replace(/\?$/, ""),
    description: t("answer"),
    alternates: { canonical: `/${locale}/about` },
    openGraph: {
      title: `${m("brand")} — ${t("headline3")} ${t("headline4")}`,
      description: t("answer"),
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: m("ogAlt") }],
    },
  };
}

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations("About");
  const current = await getLocale();
  const body = pickLocaleText(ABOUT.body, current);

  const faqs = [
    { q: t("faq1q"), a: t("faq1a") },
    { q: t("faq2q"), a: t("faq2a") },
    { q: t("faq3q"), a: t("faq3a") },
  ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="relative overflow-hidden bg-background px-5 pb-20 pt-28 md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.08] saturate-50"
        style={{ backgroundImage: "url(/shortlord-photo.jpg)" }}
      />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionLabel>{t("label")}</SectionLabel>
        <h1 className="mb-6 max-w-[12ch] font-display text-[clamp(40px,8vw,80px)] font-black uppercase leading-[0.92] tracking-tight text-white">
          {t("headline1")}
          <br />
          {t("headline2")}
          <br />
          <em className="not-italic text-accent">{t("headline3")}</em>
          <br />
          {t("headline4")}
        </h1>

        <p className="mb-10 max-w-[60ch] border-l-[3px] border-accent bg-[rgba(255,106,0,0.06)] px-5 py-4 text-[16px] font-medium leading-relaxed text-cream/90">
          {t("answer")}
        </p>

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

      <div className="relative z-10 mx-auto mt-14 max-w-6xl border border-cream/15 bg-surface px-5 py-8 md:px-8">
        <h2
          id="faq-heading"
          className="font-display text-2xl font-black uppercase tracking-tight text-cream md:text-3xl"
        >
          {t("faqTitle")}
        </h2>
        <div className="mt-5 space-y-0" aria-labelledby="faq-heading">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group border-t border-cream/10 py-4 open:bg-cream/[0.02]"
            >
              <summary className="cursor-pointer list-none font-display text-base font-bold uppercase tracking-wide text-cream marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {f.q}
                  <span className="font-mono text-accent transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 max-w-[60ch] text-[14px] leading-relaxed text-cream/70">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-10 flex max-w-6xl flex-col gap-3 border-t border-cream/15 pt-8 sm:flex-row sm:flex-wrap">
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

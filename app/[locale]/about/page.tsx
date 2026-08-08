import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ABOUT } from "@/lib/content";
import { pickLocaleText } from "@/lib/locale";

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
      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
        <div>
          <SectionLabel>{t("label")}</SectionLabel>
          <h1 className="mb-8 font-display text-[clamp(48px,6vw,88px)] font-black uppercase leading-[0.9] tracking-tight text-white">
            {t("headline1")}
            <br />
            {t("headline2")}
            <br />
            <em className="not-italic text-accent">{t("headline3")}</em>
            <br />
            {t("headline4")}
          </h1>
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

        <div className="space-y-4 md:pt-10">
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
    </section>
  );
}

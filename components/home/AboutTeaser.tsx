import { getLocale, getTranslations } from "next-intl/server";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Stamp } from "@/components/ui/Stamp";
import { ABOUT } from "@/lib/content";
import { pickLocaleText } from "@/lib/locale";

export async function AboutTeaser() {
  const t = await getTranslations("About");
  const locale = await getLocale();
  const body = pickLocaleText(ABOUT.body, locale);

  return (
    <section id="about" className="relative scroll-mt-20 overflow-hidden bg-background px-5 py-[var(--section-y-lg)] md:px-10">
      <div className="roots-stripe absolute inset-x-0 top-0 h-1" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(212,181,90,0.08),transparent_45%)]" />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-14 md:grid-cols-2">
        <div>
          <SectionLabel>{t("label")}</SectionLabel>
          <div className="mb-4 flex flex-wrap gap-2">
            <Stamp>Label</Stamp>
            <Stamp tone="gold">Guyane · HH</Stamp>
          </div>
          <h2 className="mb-8 font-display text-[clamp(48px,6vw,88px)] uppercase leading-[0.88] tracking-tight text-cream">
            {t("headline1")}
            <br />
            {t("headline2")}
            <br />
            <em className="not-italic text-accent">{t("headline3")}</em>
            <br />
            {t("headline4")}
          </h2>
          <p className="max-w-[60ch] text-base leading-relaxed text-cream/80">
            {body}
          </p>

          <div className="mt-10 space-y-0 border-t border-cream/15">
            {ABOUT.accolades.slice(0, 2).map((a) => (
              <div
                key={a.label}
                className={`border-l-4 py-5 pl-5 ${
                  a.tone === "accent" ? "border-accent" : "border-gold"
                }`}
              >
                <div
                  className={`mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] ${
                    a.tone === "accent" ? "text-accent" : "text-gold"
                  }`}
                >
                  {a.label}
                </div>
                <p className="text-sm leading-relaxed text-cream/80">
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

        <div className="space-y-6 md:pt-8">
          <div className="kraft-panel p-6 md:p-8">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-black/50">
              Press clip
            </p>
            <p className="mt-2 font-display text-2xl font-black uppercase leading-tight text-black">
              Hamburg Labelförderung
            </p>
            <p className="mt-2 text-sm leading-relaxed text-black/70">
              Official recognition — Behörde für Kultur und Medien. Independent, always.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px bg-cream/15">
            {ABOUT.stats.map((s) => (
              <div key={s.label} className="bg-surface2 p-6">
                <div className="font-display text-4xl font-black tabular-nums text-accent">
                  {s.num}
                </div>
                <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.18em] text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-cream/15">
            {ABOUT.accolades.slice(2).map((a) => (
              <div
                key={a.label}
                className={`border-l-4 py-5 pl-5 ${
                  a.tone === "accent" ? "border-accent" : "border-gold"
                }`}
              >
                <div
                  className={`mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] ${
                    a.tone === "accent" ? "text-accent" : "text-gold"
                  }`}
                >
                  {a.label}
                </div>
                <p className="text-sm leading-relaxed text-cream/80">
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
    </section>
  );
}

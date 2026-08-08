import { getTranslations } from "next-intl/server";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Stamp } from "@/components/ui/Stamp";

export async function DemoTeaser() {
  const t = await getTranslations("Demo");

  const field =
    "rounded-none border border-cream/15 border-l-4 border-l-accent bg-background px-4 py-3.5 text-base text-cream outline-none transition-colors duration-fast placeholder:text-muted focus:border-accent";

  return (
    <section
      id="demo"
      className="relative scroll-mt-20 overflow-hidden border-t border-cream/10 bg-surface px-5 py-[var(--section-y)] md:px-10 md:py-[var(--section-y-lg)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_100%,rgba(255,106,0,0.14),transparent_45%)]" />
      <div className="relative z-10 grid max-w-5xl gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <SectionLabel>{t("label")}</SectionLabel>
          <Stamp>Open call</Stamp>
          <h2 className="mt-4 mb-3 font-display text-[clamp(40px,5vw,72px)] uppercase leading-[0.88] tracking-tight text-cream">
            {t("headline")}
          </h2>
          <p className="mb-8 max-w-[60ch] text-base leading-relaxed text-cream/70">{t("sub")}</p>

          <form
            className="flex flex-col gap-3"
            action="mailto:chosenfewrecords@hotmail.de"
            method="POST"
            encType="text/plain"
          >
            <input name="name" required placeholder={t("name")} className={field} />
            <input name="link" required placeholder={t("link")} className={field} />
            <input name="genre" placeholder={t("genre")} className={field} />
            <textarea
              name="message"
              rows={4}
              placeholder={t("message")}
              className={`${field} resize-y`}
            />
            <button
              type="submit"
              className="stamp-btn mt-2 inline-flex min-h-12 w-full items-center justify-center self-start bg-accent px-9 py-4 font-display text-sm font-black uppercase tracking-[0.08em] text-black transition-colors duration-fast hover:bg-accent-hover sm:w-auto"
            >
              {t("submit")}
            </button>
          </form>
        </div>

        <div className="kraft-panel hidden flex-col justify-between p-8 md:flex">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-black/50">
              What we want
            </p>
            <ul className="mt-4 space-y-3 font-display text-lg font-black uppercase leading-snug text-black">
              <li>Original heat</li>
              <li>Real identity</li>
              <li>Hamburg or diaspora</li>
              <li>Independent mindset</li>
            </ul>
          </div>
          <p className="mt-8 text-sm text-black/65">
            Link SoundCloud / Dropbox / Drive. We listen.
          </p>
        </div>
      </div>
    </section>
  );
}

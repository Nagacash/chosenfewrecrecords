import { getTranslations } from "next-intl/server";
import { SectionLabel } from "@/components/ui/SectionLabel";

export async function DemoTeaser() {
  const t = await getTranslations("Demo");

  return (
    <section id="demo" className="relative scroll-mt-20 overflow-hidden border-t border-white/[0.06] bg-surface px-5 py-16 md:px-10 md:py-20">
      <div className="relative z-10 max-w-xl">
        <SectionLabel>{t("label")}</SectionLabel>
        <h2 className="mb-3 font-display text-[clamp(40px,5vw,72px)] font-black uppercase leading-[0.9] tracking-tight text-white">
          {t("headline")}
        </h2>
        <p className="mb-8 text-sm leading-relaxed text-cream/60">{t("sub")}</p>

        <form
          className="flex flex-col gap-2.5"
          action="mailto:chosenfewrecords@hotmail.de"
          method="POST"
          encType="text/plain"
        >
          <input
            name="name"
            required
            placeholder={t("name")}
            className="border border-white/[0.06] border-l-[3px] border-l-white/10 bg-background px-4 py-3.5 text-sm text-white outline-none transition focus:border-accent focus:border-l-accent placeholder:text-muted"
          />
          <input
            name="link"
            required
            placeholder={t("link")}
            className="border border-white/[0.06] border-l-[3px] border-l-white/10 bg-background px-4 py-3.5 text-sm text-white outline-none transition focus:border-accent focus:border-l-accent placeholder:text-muted"
          />
          <input
            name="genre"
            placeholder={t("genre")}
            className="border border-white/[0.06] border-l-[3px] border-l-white/10 bg-background px-4 py-3.5 text-sm text-white outline-none transition focus:border-accent focus:border-l-accent placeholder:text-muted"
          />
          <textarea
            name="message"
            rows={4}
            placeholder={t("message")}
            className="resize-y border border-white/[0.06] border-l-[3px] border-l-white/10 bg-background px-4 py-3.5 text-sm text-white outline-none transition focus:border-accent focus:border-l-accent placeholder:text-muted"
          />
          <button
            type="submit"
            className="mt-2 self-start bg-accent px-9 py-3.5 font-display text-sm font-black uppercase tracking-[0.08em] text-black transition hover:bg-[#ff7733] [clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,10px_100%,0_calc(100%-10px))]"
          >
            {t("submit")}
          </button>
        </form>
      </div>
    </section>
  );
}

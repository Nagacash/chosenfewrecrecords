import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const HALFTONE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")";

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[linear-gradient(160deg,#1a0800_0%,#080808_50%,#0a0a1a_100%)]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 brightness-[0.35] contrast-110"
        style={{ backgroundImage: "url(/shortlord-photo.jpg)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: HALFTONE }}
      />

      <div className="relative z-10 max-w-[920px] px-5 pb-16 pt-28 md:px-10 md:pb-20">
        <div className="mb-5 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
          <span className="inline-block h-px w-10 bg-accent" />
          {t("eyebrow")}
        </div>

        <h1 className="font-display text-[clamp(56px,12vw,140px)] font-black uppercase leading-[0.88] tracking-[-0.02em] text-white">
          {t("line1")}
          <br />
          {t("line2")}
          <br />
          <em className="not-italic text-accent">{t("line3")}</em>
        </h1>

        <p className="mt-5 max-w-[38ch] font-body text-[15px] leading-relaxed text-cream/65 md:text-[17px]">
          {t("sub")}
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/#releases"
            className="inline-block bg-accent px-9 py-3.5 font-display text-sm font-black uppercase tracking-[0.08em] text-black transition hover:bg-[#ff7733] [clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,10px_100%,0_calc(100%-10px))]"
          >
            {t("ctaRelease")}
          </Link>
          <Link
            href="/videos"
            className="inline-block border border-white/30 px-9 py-3.5 font-display text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:border-accent hover:text-accent"
          >
            {t("ctaVideos")}
          </Link>
        </div>
      </div>
    </section>
  );
}

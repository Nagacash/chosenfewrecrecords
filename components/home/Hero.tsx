import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BrandMark } from "@/components/ui/BrandMark";
import { FlagBarrage } from "@/components/ui/Flags";
import { AmbientVideo } from "@/components/ui/AmbientVideo";

export async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden bg-background">
      <AmbientVideo
        src="/videos/hamburg-night.mp4"
        poster="/textures/warm-night.png"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-screen"
        style={{ backgroundImage: "url(/textures/diaspora-mesh.png)" }}
      />
      <div
        className="absolute inset-0 bg-cover bg-no-repeat brightness-95 contrast-105 saturate-[1.08] md:bg-[center_20%]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(20,18,16,0.72) 0%, rgba(20,18,16,0.25) 42%, transparent 62%), url(/shortlord-photo.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          opacity: 0.88,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_90%,rgba(255,106,0,0.28),transparent_50%)]" />

      <div className="roots-stripe absolute inset-x-0 top-16 h-1.5" />

      <div className="absolute right-5 top-24 z-10 hidden md:block md:right-10">
        <BrandMark size="hero" href="/" />
      </div>

      <div className="relative z-10 w-full px-5 pb-14 pt-32 md:px-10 md:pb-20">
        <div className="mb-4 md:hidden">
          <BrandMark size="nav" href="/" />
        </div>

        <div className="mb-6 animate-fade-in">
          <FlagBarrage size="lg" />
        </div>

        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
          {t("eyebrow")}
        </p>

        <h1 className="font-display text-[clamp(64px,14vw,160px)] uppercase leading-[0.82] tracking-[-0.03em] text-cream animate-fade-in">
          <span className="block">{t("line1")}</span>
          <span className="block">{t("line2")}</span>
          <span className="relative mt-1 inline-block text-accent">
            {t("line3")}
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-[0.08em] w-full bg-accent"
            />
          </span>
        </h1>

        <p className="mt-6 max-w-[46ch] text-lg font-medium leading-relaxed text-cream/90 md:text-xl">
          {t("sub")}
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/#releases"
            className="stamp-btn inline-block bg-accent px-9 py-4 font-display text-sm font-black uppercase tracking-[0.08em] text-black transition-colors duration-fast hover:bg-accent-hover"
          >
            {t("ctaRelease")}
          </Link>
          <Link
            href="/#roots"
            className="inline-block border-2 border-caribbean/80 bg-caribbean/20 px-9 py-4 font-display text-sm font-bold uppercase tracking-[0.08em] text-cream transition-colors duration-fast hover:border-gold hover:text-gold"
          >
            Roots
          </Link>
          <Link
            href="/videos"
            className="inline-block border-2 border-cream/45 bg-black/25 px-9 py-4 font-display text-sm font-bold uppercase tracking-[0.08em] text-cream backdrop-blur-sm transition-colors duration-fast hover:border-accent hover:text-accent"
          >
            {t("ctaVideos")}
          </Link>
        </div>
      </div>
    </section>
  );
}

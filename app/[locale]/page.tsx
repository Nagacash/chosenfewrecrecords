import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { FeaturedRelease } from "@/components/home/FeaturedRelease";
import { ArtistSpread } from "@/components/home/ArtistSpread";
import { Collabs } from "@/components/home/Collabs";
import { VideosTeaser } from "@/components/home/VideosTeaser";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { DemoTeaser } from "@/components/home/DemoTeaser";
import { Marquee } from "@/components/ui/Marquee";
import { ReleaseCard } from "@/components/ui/ReleaseCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getFeaturedRelease, getReleases } from "@/lib/toolost";

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  const [featured, releases, t] = await Promise.all([
    getFeaturedRelease(),
    getReleases(),
    getTranslations("Catalogue"),
  ]);

  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedRelease release={featured} />

      <section id="releases-grid" className="scroll-mt-20 bg-background px-5 py-16 md:px-10 md:py-20">
        <SectionLabel>{t("label")}</SectionLabel>
        <div className="mt-8 grid grid-cols-2 gap-px bg-white/[0.06] md:grid-cols-4">
          {releases.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>
      </section>

      <ArtistSpread />
      <Collabs />
      <VideosTeaser />
      <AboutTeaser />
      <DemoTeaser />
    </>
  );
}

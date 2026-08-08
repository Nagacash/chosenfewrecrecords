import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { FeaturedRelease } from "@/components/home/FeaturedRelease";
import { ArtistSpread } from "@/components/home/ArtistSpread";
import { Collabs } from "@/components/home/Collabs";
import { VideosTeaser } from "@/components/home/VideosTeaser";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { DemoTeaser } from "@/components/home/DemoTeaser";
import { VaultStrip } from "@/components/home/VaultStrip";
import { RootsMesh } from "@/components/home/RootsMesh";
import { FlagBand } from "@/components/ui/Flags";
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

      <section id="releases-grid" className="scroll-mt-20 bg-background px-5 py-[var(--section-y)] md:px-10 md:py-[var(--section-y-lg)]">
        <SectionLabel>{t("label")}</SectionLabel>
        <div className="stagger-fade mt-8 grid grid-cols-2 gap-px bg-cream/10 md:grid-cols-4">
          {releases.map((release, i) => (
            <ReleaseCard
              key={release.id}
              release={release}
              featured={i === 0}
            />
          ))}
        </div>
      </section>

      <VaultStrip />
      <FlagBand />
      <RootsMesh />
      <ArtistSpread />
      <Collabs />
      <VideosTeaser />
      <AboutTeaser />
      <DemoTeaser />
    </>
  );
}

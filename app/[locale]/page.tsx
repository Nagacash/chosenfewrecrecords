import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { FeaturedRelease } from "@/components/home/FeaturedRelease";
import { ArtistSpread } from "@/components/home/ArtistSpread";
import { Collabs } from "@/components/home/Collabs";
import { VideosTeaser } from "@/components/home/VideosTeaser";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { DemoTeaser } from "@/components/home/DemoTeaser";
import { VaultStrip } from "@/components/home/VaultStrip";
import { RootsMesh } from "@/components/home/RootsMesh";
import { CatalogueSection } from "@/components/home/CatalogueSection";
import { FlagBand } from "@/components/ui/Flags";
import { Marquee } from "@/components/ui/Marquee";
import { getFeaturedRelease, getReleases } from "@/lib/toolost";

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  const [featured, releases] = await Promise.all([
    getFeaturedRelease(),
    getReleases(),
  ]);

  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedRelease release={featured} />
      <CatalogueSection releases={releases} mode="home" />
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

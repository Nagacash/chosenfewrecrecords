import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { FeaturedRelease } from "@/components/home/FeaturedRelease";
import { VaultStrip } from "@/components/home/VaultStrip";
import { HomeNext } from "@/components/home/HomeNext";
import { Marquee } from "@/components/ui/Marquee";
import { getFeaturedRelease } from "@/lib/toolost";

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  const featured = await getFeaturedRelease();

  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedRelease release={featured} />
      <VaultStrip />
      <HomeNext />
    </>
  );
}

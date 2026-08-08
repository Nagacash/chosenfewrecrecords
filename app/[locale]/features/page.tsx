import { setRequestLocale } from "next-intl/server";
import { Collabs } from "@/components/home/Collabs";
import { GhostfaceShoutout } from "@/components/home/GhostfaceShoutout";

export default async function FeaturesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <div className="pt-16">
      <GhostfaceShoutout />
      <Collabs />
    </div>
  );
}

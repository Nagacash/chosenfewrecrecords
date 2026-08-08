import { setRequestLocale } from "next-intl/server";
import { CatalogueSection } from "@/components/home/CatalogueSection";
import { getReleases } from "@/lib/toolost";

export default async function ReleasesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const releases = await getReleases();

  return (
    <div className="pt-16">
      <CatalogueSection releases={releases} mode="full" />
    </div>
  );
}

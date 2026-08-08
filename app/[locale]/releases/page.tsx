import { getTranslations, setRequestLocale } from "next-intl/server";
import { ReleaseCard } from "@/components/ui/ReleaseCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getReleases } from "@/lib/toolost";

export default async function ReleasesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const [releases, t] = await Promise.all([
    getReleases(),
    getTranslations("Catalogue"),
  ]);

  return (
    <section className="bg-background px-5 pb-20 pt-28 md:px-10">
      <SectionLabel>{t("label")}</SectionLabel>
      {releases.length === 0 ? (
        <p className="mt-10 font-mono text-sm uppercase tracking-wider text-muted">
          {t("empty")}
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-px bg-white/[0.06] md:grid-cols-4">
          {releases.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>
      )}
    </section>
  );
}

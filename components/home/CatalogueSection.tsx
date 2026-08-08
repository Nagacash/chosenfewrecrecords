import { getTranslations } from "next-intl/server";
import type { Release } from "@/lib/toolost";
import { CatalogueBrowser } from "@/components/home/CatalogueBrowser";
export async function CatalogueSection({
  releases,
  mode = "home",
}: {
  releases: Release[];
  mode?: "home" | "full";
}) {
  const t = await getTranslations("Catalogue");

  return (
    <CatalogueBrowser
      releases={releases}
      mode={mode}
      labels={{
        label: t("label"),
        headline: t("headline"),
        empty: t("empty"),
        listen: t("listen"),
        all: t("all"),
        count: String(t.raw("count")),
        open: t("open"),
        onSpotify: t("onSpotify"),
        pick: t("pick"),
        archive: t("archive"),
        shelf: {
          "2020s": t("shelf2020s"),
          "2010s": t("shelf2010s"),
          "2000s": t("shelf2000s"),
          "1990s": t("shelf1990s"),
        },
      }}
    />
  );
}

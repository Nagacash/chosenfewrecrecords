import { setRequestLocale } from "next-intl/server";
import { RootsMesh } from "@/components/home/RootsMesh";
import { FlagBand } from "@/components/ui/Flags";

export default async function RootsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <div className="pt-16">
      <FlagBand />
      <RootsMesh />
    </div>
  );
}

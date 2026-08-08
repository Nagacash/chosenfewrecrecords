import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArchiveGallery } from "@/components/home/ArchiveGallery";
import { RootsMesh } from "@/components/home/RootsMesh";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: "Roots & Archive — Guyane · Chicago · Hamburg",
    description:
      "Chosenfewrecords roots: French Guiana, Chicago, Hamburg. Archive — Nneka’s first concert, NAGA Jam with Big Twins, Boogiepark with Lyn T, Die P full circle.",
    alternates: { canonical: `/${locale}/roots` },
    openGraph: {
      title: "Chosenfewrecords Roots & Archive",
      description:
        "Guyane · Chicago · Hamburg. Real frames from Shortlord’s path — Nneka, NAGA Jam, Boogiepark.",
      images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function RootsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <div className="pt-16">
      <RootsMesh />
      <ArchiveGallery />
    </div>
  );
}

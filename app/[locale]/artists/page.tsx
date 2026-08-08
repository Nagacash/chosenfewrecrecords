import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";

export default async function ArtistsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <section className="bg-background px-5 pb-20 pt-28 md:px-10 md:pt-32">
      <SectionLabel>Roster</SectionLabel>
      <Link
        href="/artists/shortlord"
        className="mt-8 grid max-w-3xl gap-6 border border-white/[0.06] p-6 transition hover:bg-surface md:grid-cols-[200px_1fr]"
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src="/shortlord-photo.jpg"
            alt="Shortlord"
            fill
            className="object-cover object-top"
            sizes="200px"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="font-display text-4xl font-black uppercase text-white">
            Shortlord
          </h1>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            Artist · Producer · Owner &amp; CEO · Chosenfewrecords
          </p>
        </div>
      </Link>
    </section>
  );
}

import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getRelease } from "@/lib/toolost";
import { Link } from "@/i18n/navigation";

export default async function ReleaseDetailPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string };
}) {
  setRequestLocale(locale);
  const release = await getRelease(id);
  if (!release) notFound();

  return (
    <section className="bg-background px-5 pb-20 pt-28 md:px-10">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden bg-surface">
          <Image
            src={release.artwork_url}
            alt={`${release.title} cover`}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
            priority
          />
        </div>
        <div>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-section text-accent">
            Release
          </p>
          <h1 className="mb-3 font-display text-5xl font-black uppercase leading-none text-white md:text-6xl">
            {release.title}
          </h1>
          <p className="mb-6 font-display text-xl italic uppercase text-muted">
            {release.artist}
          </p>
          <p className="mb-8 font-mono text-xs uppercase tracking-wider text-gold">
            {release.meta ||
              [release.release_date?.slice(0, 4), release.format]
                .filter(Boolean)
                .join(" · ")}
          </p>
          {release.tag ? (
            <span className="mb-8 inline-block bg-accent px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-black">
              {release.tag}
            </span>
          ) : null}
          <Link
            href="/releases"
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent hover:underline"
          >
            ← Catalogue
          </Link>
        </div>
      </div>
    </section>
  );
}

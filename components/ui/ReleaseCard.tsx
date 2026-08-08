import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Release } from "@/lib/toolost";

export function ReleaseCard({
  release,
  featured = false,
}: {
  release: Release;
  featured?: boolean;
}) {
  const yearLine =
    release.meta ||
    [release.release_date?.slice(0, 4), release.format].filter(Boolean).join(" · ");

  return (
    <Link
      href={`/releases/${release.id}`}
      className={`group relative block bg-surface ${featured ? "md:col-span-2 md:row-span-2" : ""}`}
    >
      <div
        className={`relative overflow-hidden ${featured ? "aspect-square md:aspect-auto md:h-full md:min-h-[420px]" : "aspect-square"}`}
      >
        <Image
          src={release.artwork_url}
          alt={`${release.title} cover`}
          fill
          sizes={featured ? "(max-width:768px) 100vw, 50vw" : "(max-width:768px) 50vw, 25vw"}
          className="object-cover transition-transform duration-slow ease-out group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 ink-outline" />

        {/* Crate-flip stamp */}
        <div className="absolute right-3 top-3 translate-y-1 opacity-0 transition-all duration-fast group-hover:translate-y-0 group-hover:opacity-100">
          <span className="inline-block rotate-[-4deg] border-2 border-accent bg-background/80 px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-accent backdrop-blur-sm">
            Listen
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-3.5 pt-20 md:p-5">
          <div
            className={`font-display font-black uppercase leading-tight text-cream ${featured ? "text-2xl md:text-4xl" : "text-[15px]"}`}
          >
            {release.title}
          </div>
          <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-gold">
            {release.artist}
          </div>
          <div className="mt-0.5 font-mono text-[9px] text-muted">{yearLine}</div>
          {release.tag ? (
            <span className="mt-2 inline-block bg-accent px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.1em] text-black">
              {release.tag}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

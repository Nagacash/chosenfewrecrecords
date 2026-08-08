import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Release } from "@/lib/toolost";

export function ReleaseCard({ release }: { release: Release }) {
  const yearLine =
    release.meta ||
    [release.release_date?.slice(0, 4), release.format].filter(Boolean).join(" · ");

  return (
    <Link
      href={`/releases/${release.id}`}
      className="group block bg-background transition-colors hover:bg-surface"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={release.artwork_url}
          alt={`${release.title} cover`}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="min-h-[80px] p-3.5">
        <div className="mb-1 font-display text-[15px] font-black uppercase leading-tight text-white">
          {release.title}
        </div>
        <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.1em] text-gold">
          {release.artist}
        </div>
        <div className="font-mono text-[9px] text-muted">{yearLine}</div>
        {release.tag ? (
          <span className="mt-1.5 inline-block bg-accent px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-black">
            {release.tag}
          </span>
        ) : null}
      </div>
    </Link>
  );
}

import {
  DISCOGS_ARTIST_URL,
  DISCOGS_CREDITS,
  DISCOGS_MAIN,
  type DiscogsEntry,
} from "@/lib/discogs";
import { SectionLabel } from "@/components/ui/SectionLabel";

function Rows({ entries }: { entries: DiscogsEntry[] }) {
  return (
    <div className="mt-4 space-y-0 border-t border-white/[0.06]">
      {entries.map((r) => (
        <a
          key={`${r.role}-${r.discogsId}-${r.id}`}
          href={r.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-1 border-b border-white/[0.06] py-3 transition hover:bg-white/[0.02] sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-4"
        >
          <span className="min-w-[48px] font-mono text-[10px] font-bold text-gold">
            {r.year ?? "—"}
          </span>
          <span className="min-w-[7rem] font-mono text-[8px] uppercase tracking-[0.16em] text-accent">
            {r.role}
          </span>
          <span className="flex-1 font-display text-sm font-bold uppercase text-white">
            {r.title}
            <span className="ml-2 font-body text-xs font-normal normal-case text-muted">
              — {r.artist}
              {r.label ? ` · ${r.label}` : ""}
            </span>
            {r.track ? (
              <span className="mt-0.5 block font-body text-xs font-normal normal-case text-cream/55">
                Track: {r.track}
              </span>
            ) : null}
            {r.note ? (
              <span className="mt-0.5 block font-body text-xs font-normal normal-case text-cream/40">
                {r.note}
              </span>
            ) : null}
          </span>
          <span className="font-mono text-[9px] text-muted">{r.format}</span>
        </a>
      ))}
    </div>
  );
}

export function Discography() {
  return (
    <section className="bg-background px-5 py-16 md:px-10 md:py-20">
      <SectionLabel>Discogs Discography</SectionLabel>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <p className="max-w-xl text-sm text-cream/60">
          Releases Shortlord is on — Main plus Discogs credits (features,
          producer, tracks). Includes Jentown Crhyme only where he appears.
        </p>
        <a
          href={DISCOGS_ARTIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent hover:underline"
        >
          View on Discogs →
        </a>
      </div>

      <div className="mt-10">
        <h3 className="font-mono text-[10px] uppercase tracking-section text-gold">
          Main — {DISCOGS_MAIN.length}
        </h3>
        <Rows entries={DISCOGS_MAIN} />
      </div>

      <div className="mt-12">
        <h3 className="font-mono text-[10px] uppercase tracking-section text-gold">
          Features & Credits — {DISCOGS_CREDITS.length}
        </h3>
        <p className="mt-1 text-xs text-cream/45">
          Producer · Appearance · Track — only releases he&apos;s credited on
        </p>
        <Rows entries={DISCOGS_CREDITS} />
      </div>
    </section>
  );
}

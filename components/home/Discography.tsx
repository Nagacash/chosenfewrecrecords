"use client";

import { useMemo, useState } from "react";
import {
  DISCOGS_ARTIST_URL,
  DISCOGS_CREDITS,
  DISCOGS_MAIN,
  type DiscogsEntry,
} from "@/lib/discogs";

type Tab = "main" | "credits";
type Era = "all" | "2020s" | "2010s" | "2000s" | "1990s";

const ERAS: Era[] = ["all", "2020s", "2010s", "2000s", "1990s"];

function inEra(year: number | null | undefined, era: Era) {
  if (era === "all") return true;
  if (!year) return false;
  if (era === "2020s") return year >= 2020;
  if (era === "2010s") return year >= 2010 && year < 2020;
  if (era === "2000s") return year >= 2000 && year < 2010;
  return year < 2000;
}

function Row({ entry }: { entry: DiscogsEntry }) {
  return (
    <a
      href={entry.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-12 flex-col gap-1 border-b border-cream/10 py-3.5 transition-colors duration-fast hover:bg-cream/[0.03] sm:flex-row sm:items-baseline sm:gap-x-4"
    >
      <span className="min-w-[3rem] font-mono text-[11px] font-bold tabular-nums text-gold">
        {entry.year ?? "—"}
      </span>
      <span className="min-w-[6.5rem] font-mono text-[8px] uppercase tracking-[0.16em] text-accent">
        {entry.role}
      </span>
      <span className="min-w-0 flex-1">
        <span className="font-display text-sm font-bold uppercase text-cream">
          {entry.title}
        </span>
        <span className="mt-0.5 block text-xs text-muted sm:mt-0 sm:ml-2 sm:inline">
          — {entry.artist}
          {entry.label ? ` · ${entry.label}` : ""}
        </span>
        {entry.track ? (
          <span className="mt-0.5 block text-xs text-cream/50">
            Track: {entry.track}
          </span>
        ) : null}
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
        {entry.format}
      </span>
    </a>
  );
}

export function Discography() {
  const [tab, setTab] = useState<Tab>("main");
  const [era, setEra] = useState<Era>("all");

  const source = tab === "main" ? DISCOGS_MAIN : DISCOGS_CREDITS;
  const rows = useMemo(
    () => source.filter((r) => inEra(r.year, era)),
    [source, era],
  );

  return (
    <section className="bg-background px-5 py-16 md:px-10 md:py-20">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
        Discogs Discography
      </p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <p className="max-w-xl text-sm leading-relaxed text-cream/60">
          Releases Shortlord is on — Main plus credits. Jentown Crhyme only where
          he appears.
        </p>
        <a
          href={DISCOGS_ARTIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center font-mono text-[10px] uppercase tracking-[0.18em] text-accent hover:underline"
        >
          View on Discogs →
        </a>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto hide-scrollbar">
        {(
          [
            ["main", `Main · ${DISCOGS_MAIN.length}`],
            ["credits", `Credits · ${DISCOGS_CREDITS.length}`],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`shrink-0 border px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-fast ${
              tab === key
                ? "border-accent bg-accent text-black"
                : "border-cream/20 text-cream/70 hover:border-cream/40 hover:text-cream"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto hide-scrollbar">
        {ERAS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setEra(key)}
            className={`shrink-0 border px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] transition-colors duration-fast ${
              era === key
                ? "border-gold text-gold"
                : "border-cream/15 text-muted hover:text-cream"
            }`}
          >
            {key === "all" ? "All eras" : key}
          </button>
        ))}
      </div>

      <div className="mt-6 border-t border-cream/15">
        {rows.length ? (
          rows.map((r) => (
            <Row key={`${r.role}-${r.discogsId}-${r.id}`} entry={r} />
          ))
        ) : (
          <p className="py-8 font-mono text-xs uppercase tracking-wider text-muted">
            Nothing in this era…
          </p>
        )}
      </div>
    </section>
  );
}

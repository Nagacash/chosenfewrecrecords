import { SectionLabel } from "@/components/ui/SectionLabel";
import { COLLABS } from "@/lib/content";

export function Collabs() {
  return (
    <section
      id="collabs"
      className="scroll-mt-20 border-y border-cream/10 bg-surface px-5 py-[var(--section-y-tight)] md:px-10 md:py-12"
    >
      <SectionLabel>05 — International Features</SectionLabel>

      <div className="mt-6 border-t border-cream/15">
        {COLLABS.map((c) => (
          <div
            key={c.name}
            className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-cream/10 py-4 transition-colors duration-fast hover:bg-cream/[0.03] md:grid-cols-[4rem_minmax(10rem,16rem)_1fr_auto] md:items-baseline md:gap-6"
          >
            <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-accent">
              {c.mark}
            </span>
            <span className="font-display text-base font-black uppercase text-white md:text-lg">
              {c.name}
            </span>
            <span className="col-span-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted md:col-span-1">
              {c.origin}
            </span>
            <span className="col-span-2 text-sm italic leading-snug text-cream/55 md:col-span-1 md:text-right">
              {c.track}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

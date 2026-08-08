import { SectionLabel } from "@/components/ui/SectionLabel";
import { COLLABS } from "@/lib/content";

export function Collabs() {
  return (
    <section
      id="collabs"
      className="scroll-mt-20 border-y border-cream/10 bg-surface px-5 py-[var(--section-y-tight)] md:px-10 md:py-12"
    >
      <SectionLabel>05 — International Features</SectionLabel>

      {/* Mobile: horizontal snap cards */}
      <div className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 hide-scrollbar md:hidden">
        {COLLABS.map((c) => (
          <article
            key={c.name}
            className="w-[78%] shrink-0 snap-start border border-cream/15 bg-background p-4"
          >
            <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-accent">
              {c.mark}
            </p>
            <p className="mt-2 font-display text-xl font-black uppercase leading-none text-cream">
              {c.name}
            </p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
              {c.origin}
            </p>
            <p className="mt-3 text-sm italic leading-snug text-cream/55">
              {c.track}
            </p>
          </article>
        ))}
      </div>

      {/* Desktop: press sheet */}
      <div className="mt-6 hidden border-t border-cream/15 md:block">
        {COLLABS.map((c) => (
          <div
            key={c.name}
            className="grid grid-cols-[4rem_minmax(10rem,16rem)_1fr_auto] items-baseline gap-6 border-b border-cream/10 py-4 transition-colors duration-fast hover:bg-cream/[0.03]"
          >
            <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-accent">
              {c.mark}
            </span>
            <span className="font-display text-lg font-black uppercase text-white">
              {c.name}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
              {c.origin}
            </span>
            <span className="text-right text-sm italic leading-snug text-cream/55">
              {c.track}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

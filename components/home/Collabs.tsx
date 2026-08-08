import { SectionLabel } from "@/components/ui/SectionLabel";
import { COLLABS } from "@/lib/content";

export function Collabs() {
  return (
    <section id="collabs" className="scroll-mt-20 border-y border-white/[0.06] bg-surface px-5 py-16 md:px-10 md:py-20">
      <SectionLabel>05 — International Features</SectionLabel>
      <div className="mt-10 grid grid-cols-1 gap-px bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-5">
        {COLLABS.map((c) => (
          <div
            key={c.name}
            className="bg-surface p-7 transition-colors hover:bg-surface2"
          >
            <div className="mb-2.5 font-mono text-[11px] font-bold tracking-[0.2em] text-accent">
              {c.mark}
            </div>
            <div className="mb-1 font-display text-base font-black uppercase text-white">
              {c.name}
            </div>
            <div className="mb-2 font-mono text-[8px] uppercase tracking-[0.16em] text-accent">
              {c.origin}
            </div>
            <div className="text-xs italic leading-snug text-muted">{c.track}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

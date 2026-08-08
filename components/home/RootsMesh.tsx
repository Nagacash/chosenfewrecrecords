import { Stamp } from "@/components/ui/Stamp";
import { FlagGermany, FlagGuyane, FlagUSA } from "@/components/ui/Flags";

const NODES = [
  {
    code: "GY",
    place: "Guyane",
    line: "French Guiana · Caribbean lineage · Martinique · St. Lucia",
    tone: "caribbean" as const,
    Flag: FlagGuyane,
    flagTitle: "Guyane",
  },
  {
    code: "CHI",
    place: "Chicago",
    line: "US-American on his father's side — Midwest heat in the blood",
    tone: "accent" as const,
    Flag: FlagUSA,
    flagTitle: "United States",
  },
  {
    code: "HH",
    place: "Hamburg",
    line: "Home base · Chosenfewrecords · building from the underground",
    tone: "gold" as const,
    Flag: FlagGermany,
    flagTitle: "Germany",
  },
];

/** Diaspora mesh — Guyane × Chicago × Hamburg with real flags. */
export function RootsMesh() {
  return (
    <section id="roots" className="relative scroll-mt-20 overflow-hidden border-y border-cream/10 bg-background">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-screen"
        style={{ backgroundImage: "url(/textures/diaspora-mesh.png)", backgroundSize: "cover" }}
      />
      <div className="roots-stripe absolute inset-x-0 top-0 h-1.5" />

      <div className="relative z-10 px-5 py-12 md:px-10 md:py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
              Roots system
            </p>
            <h2 className="mt-2 max-w-[18ch] font-display text-[clamp(32px,5vw,56px)] uppercase leading-[0.9] text-cream">
              Guyane · Chicago · Hamburg
            </h2>
          </div>
          <Stamp tone="cream">Black diaspora · Independent forever</Stamp>
        </div>

        <div className="grid gap-px bg-cream/15 md:grid-cols-3">
          {NODES.map((n, i) => (
            <div
              key={n.code}
              className="relative bg-surface/90 p-6 backdrop-blur-sm md:p-8"
            >
              <div
                className="mb-5 inline-block overflow-hidden border-2 border-cream/30 shadow-[0_10px_28px_rgba(0,0,0,0.45)]"
                style={{ transform: `rotate(${i === 0 ? -5 : i === 1 ? 3 : -2}deg)` }}
              >
                <n.Flag className="h-14 w-[5.25rem] md:h-16 md:w-24" title={n.flagTitle} />
              </div>
              <p
                className={`font-mono text-[11px] font-bold tracking-[0.25em] ${
                  n.tone === "caribbean"
                    ? "text-caribbean"
                    : n.tone === "gold"
                      ? "text-gold"
                      : "text-accent"
                }`}
              >
                {n.code}
              </p>
              <h3 className="mt-2 font-display text-3xl font-black uppercase text-cream md:text-4xl">
                {n.place}
              </h3>
              <p className="mt-3 max-w-[36ch] text-base leading-relaxed text-cream/75">
                {n.line}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

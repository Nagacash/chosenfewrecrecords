/** Geometric flag marks — slamming, not emoji */

type FlagProps = {
  className?: string;
  title?: string;
};

/** French Guiana — green / yellow / red star */
export function FlagGuyane({ className = "h-8 w-12", title = "Guyane" }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <rect width="60" height="40" fill="#078930" />
      <polygon points="60,0 60,40 0,40" fill="#FCD116" />
      <polygon
        points="30,10 32.4,17.5 40,17.5 33.8,22 36.2,29.5 30,25 23.8,29.5 26.2,22 20,17.5 27.6,17.5"
        fill="#DA121A"
      />
    </svg>
  );
}

/** USA — compact stamp flag */
export function FlagUSA({ className = "h-8 w-12", title = "United States" }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <rect width="60" height="40" fill="#B22234" />
      {[1, 3, 5, 7, 9].map((i) => (
        <rect key={i} y={i * 3.6} width="60" height="3.6" fill="#fff" />
      ))}
      <rect width="24" height="21.6" fill="#3C3B6E" />
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={4 + col * 5.5}
            cy={4 + row * 6.5}
            r="1.2"
            fill="#fff"
          />
        ))
      )}
    </svg>
  );
}

/** Germany */
export function FlagGermany({ className = "h-8 w-12", title = "Germany" }: FlagProps) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <rect width="60" height="13.34" y="0" fill="#000" />
      <rect width="60" height="13.34" y="13.33" fill="#DD0000" />
      <rect width="60" height="13.34" y="26.66" fill="#FFCE00" />
    </svg>
  );
}

const FLAGS = [
  { id: "gy", label: "Guyane", place: "French Guiana", Flag: FlagGuyane },
  { id: "us", label: "USA", place: "Chicago · Father side", Flag: FlagUSA },
  { id: "de", label: "Germany", place: "Hamburg · Home", Flag: FlagGermany },
] as const;

/** Hero / strip — big tilted flags that actually flex */
export function FlagBarrage({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const box =
    size === "lg"
      ? "h-14 w-[5.25rem] md:h-20 md:w-[7.5rem]"
      : size === "sm"
        ? "h-7 w-11"
        : "h-10 w-[3.75rem] md:h-12 md:w-[4.5rem]";

  return (
    <div className="flex flex-wrap items-end gap-3 md:gap-4">
      {FLAGS.map((f, i) => (
        <div
          key={f.id}
          className="group relative"
          style={{ transform: `rotate(${i === 1 ? 2 : i === 2 ? -3 : -6}deg)` }}
        >
          <div className="absolute -inset-1 bg-accent/20 opacity-0 blur-md transition-opacity duration-fast group-hover:opacity-100" />
          <div className="relative overflow-hidden border-2 border-cream/30 shadow-[0_8px_24px_rgba(0,0,0,0.55)] transition-transform duration-fast group-hover:scale-105 group-hover:border-accent">
            <f.Flag className={`${box} block`} />
          </div>
          {size !== "sm" ? (
            <p className="mt-1.5 text-center font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-cream/70">
              {f.label}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/** Full-width slamming flag band */
export function FlagBand() {
  return (
    <div className="relative overflow-hidden border-y-2 border-cream/15 bg-surface">
      <div className="roots-stripe absolute inset-x-0 top-0 h-1" />
      <div className="relative z-10 flex flex-col items-stretch gap-0 md:flex-row">
        {FLAGS.map((f, i) => (
          <div
            key={f.id}
            className={`relative flex flex-1 items-center gap-5 overflow-hidden px-5 py-6 md:px-8 md:py-8 ${
              i > 0 ? "border-t border-cream/10 md:border-l md:border-t-0" : ""
            }`}
          >
            <div
              className="shrink-0 overflow-hidden border-2 border-cream/25 shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
              style={{ transform: `rotate(${i === 0 ? -4 : i === 1 ? 2 : -2}deg)` }}
            >
              <f.Flag className="h-16 w-24 md:h-20 md:w-[7.5rem]" />
            </div>
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                {f.id === "gy" ? "01" : f.id === "us" ? "02" : "03"} — Flag
              </p>
              <p className="mt-1 font-display text-2xl font-black uppercase leading-none text-cream md:text-3xl">
                {f.label}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                {f.place}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

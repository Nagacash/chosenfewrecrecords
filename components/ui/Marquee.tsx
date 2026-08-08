import { MARQUEE_TITLES } from "@/lib/content";

export function Marquee() {
  const items = [...MARQUEE_TITLES, ...MARQUEE_TITLES];

  return (
    <div className="group relative z-[3] overflow-hidden border-y border-cream/10 bg-accent py-3">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {items.map((title, i) => (
          <span key={`${title}-${i}`} className="flex items-center">
            <span className="whitespace-nowrap px-8 font-display text-[14px] font-black uppercase tracking-[0.16em] text-black">
              {title}
            </span>
            <span className="text-black/40">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

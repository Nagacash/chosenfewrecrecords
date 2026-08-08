import { MARQUEE_TITLES } from "@/lib/content";

export function Marquee() {
  const items = [...MARQUEE_TITLES, ...MARQUEE_TITLES];

  return (
    <div className="group relative z-[3] overflow-hidden bg-accent py-2.5">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {items.map((title, i) => (
          <span key={`${title}-${i}`} className="flex items-center">
            <span className="whitespace-nowrap px-7 font-display text-[13px] font-black uppercase tracking-[0.15em] text-black">
              {title}
            </span>
            <span className="text-black/40">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

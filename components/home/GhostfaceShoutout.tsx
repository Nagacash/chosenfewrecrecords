"use client";

import { useRef, useState } from "react";
import { Stamp } from "@/components/ui/Stamp";

const SRC = "/videos/ghostface-killah.mp4";
const POSTER = "/videos/ghostface-killah-poster.jpg";

/** Ghostface Killah (Wu-Tang) shoutout — short vertical clip */
export function GhostfaceShoutout() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = async () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      try {
        await el.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="relative overflow-hidden border-y border-cream/10 bg-background">
      <div className="roots-stripe h-1 w-full" />
      <div className="grid lg:grid-cols-[1.1fr_minmax(240px,320px)]">
        <div className="kraft-panel flex flex-col justify-between p-7 md:p-10">
          <div>
            <Stamp tone="accent">Shoutout</Stamp>
            <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-black/50">
              Wu-Tang Clan · Staten Island
            </p>
            <h2 className="mt-3 max-w-[12ch] font-display text-[clamp(36px,5vw,56px)] font-black uppercase leading-[0.9] tracking-tight text-black">
              Ghostface
              <br />
              <span className="text-[color:var(--accent)]">Killah</span>
            </h2>
            <p className="mt-5 max-w-[40ch] text-[15px] font-medium leading-relaxed text-black/70">
              A shoutout from Ghostface Killah of the Wu-Tang Clan — respect from
              Shaolin to Hamburg. Chosenfewrecords keeps that frequency.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-black/10 pt-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/45">
              ~13 sec · Vertical clip
            </p>
            <button
              type="button"
              onClick={toggle}
              className="stamp-btn ml-auto inline-flex min-h-11 items-center justify-center bg-black px-6 py-3 font-display text-sm font-black uppercase tracking-[0.08em] text-cream transition-colors duration-fast hover:bg-accent hover:text-black"
            >
              {playing ? "Pause" : "Play shoutout"} →
            </button>
          </div>
        </div>

        <div className="relative flex items-center justify-center border-t border-cream/15 bg-[#0c0b0a] px-6 py-10 lg:border-l lg:border-t-0 lg:py-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 50% 30%, rgba(255,106,0,0.35), transparent 55%)",
            }}
          />
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause shoutout" : "Play shoutout"}
            className="group relative w-[min(220px,70vw)] overflow-hidden border-2 border-cream/25 bg-black shadow-[0_28px_70px_rgba(0,0,0,0.65)] transition-transform duration-fast hover:scale-[1.02] hover:border-accent"
          >
            <div className="roots-stripe h-0.5 w-full" />
            <video
              ref={videoRef}
              src={SRC}
              poster={POSTER}
              playsInline
              preload="metadata"
              className="aspect-[9/16] w-full object-cover"
              onEnded={() => setPlaying(false)}
              onPause={() => setPlaying(false)}
              onPlay={() => setPlaying(true)}
            />
            {!playing ? (
              <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                <span className="flex h-14 w-14 items-center justify-center border-2 border-accent bg-black/70 font-display text-lg font-black text-accent transition-colors group-hover:bg-accent group-hover:text-black">
                  ▶
                </span>
              </span>
            ) : null}
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-8 text-left">
              <span className="block font-mono text-[8px] uppercase tracking-[0.2em] text-accent">
                Wu-Tang
              </span>
              <span className="mt-0.5 block font-display text-sm font-black uppercase text-cream">
                Ghostface Killah
              </span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

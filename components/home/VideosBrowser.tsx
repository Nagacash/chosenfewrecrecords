"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "@/i18n/navigation";
import type { CuratedVideo } from "@/lib/youtube";
import { youtubeThumb, YOUTUBE_CHANNEL } from "@/lib/youtube";
import { notifyExternalMedia } from "@/lib/ambient";

gsap.registerPlugin(useGSAP);

type VideosBrowserProps = {
  videos: CuratedVideo[];
  label: string;
  allLabel: string;
  mode?: "home" | "full";
};

export function VideosBrowser({
  videos,
  label,
  allLabel,
  mode = "home",
}: VideosBrowserProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(videos[0]?.id ?? "");
  const [playing, setPlaying] = useState(false);

  const active = useMemo(
    () => videos.find((v) => v.id === activeId) ?? videos[0] ?? null,
    [videos, activeId],
  );

  const strip = mode === "home" ? videos.slice(0, 8) : videos;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".vid-thumb", {
          autoAlpha: 0,
          y: 14,
          duration: 0.4,
          stagger: 0.04,
          ease: "power3.out",
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [mode], revertOnUpdate: true },
  );

  if (!active) return null;

  return (
    <section
      ref={rootRef}
      id="videos"
      className="scroll-mt-20 bg-background px-5 py-[var(--section-y-tight)] md:px-10 md:py-14"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
            {label} ·{" "}
            <a
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent no-underline hover:underline"
            >
              @chosenfewrecords
            </a>
          </p>
          <h2 className="mt-2 font-display text-[clamp(32px,5vw,52px)] font-black uppercase leading-[0.9] tracking-tight text-cream">
            Archive
          </h2>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          {strip.length} clips
        </p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.35fr_0.9fr] lg:gap-8">
        {/* Mobile: strip first */}
        <div className="order-1 min-w-0 lg:order-2">
          <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-gold">
            Pick a clip
          </p>
          <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 hide-scrollbar lg:grid lg:grid-cols-2 lg:gap-2 lg:overflow-visible">
            {strip.map((video) => {
              const on = video.id === active.id;
              return (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => {
                    setActiveId(video.id);
                    setPlaying(false);
                  }}
                  aria-pressed={on}
                  className={`vid-thumb relative w-[72%] shrink-0 snap-start overflow-hidden border text-left sm:w-[46%] lg:w-full ${
                    on ? "border-accent" : "border-cream/10 hover:border-cream/35"
                  }`}
                >
                  <div className="relative aspect-video bg-surface2">
                    <Image
                      src={youtubeThumb(video.id)}
                      alt=""
                      fill
                      sizes="(max-width:1024px) 70vw, 20vw"
                      className="object-cover brightness-[0.7]"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-2.5 pt-8">
                      <p className="line-clamp-2 font-mono text-[9px] uppercase tracking-[0.08em] text-cream">
                        {video.title}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="order-2 lg:order-1">
          <div className="overflow-hidden border border-cream/15 bg-surface">
            <div className="relative aspect-video bg-black">
              {playing ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
                  title={active.title}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    notifyExternalMedia();
                    setPlaying(true);
                  }}
                  className="group absolute inset-0"
                  aria-label={`Play ${active.title}`}
                >
                  <Image
                    src={youtubeThumb(active.id)}
                    alt={active.title}
                    fill
                    priority
                    sizes="(max-width:1024px) 100vw, 55vw"
                    className="object-cover brightness-[0.6] transition duration-slow group-hover:brightness-75"
                  />
                  <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-accent stamp-btn sm:h-16 sm:w-16">
                    <span className="ml-1 border-y-[8px] border-l-[14px] border-y-transparent border-l-black" />
                  </span>
                </button>
              )}
            </div>
            <div className="kraft-panel p-4 sm:p-5">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-black/50">
                Now playing
              </p>
              <p className="mt-2 font-display text-lg font-black uppercase leading-tight text-black sm:text-xl">
                {active.title}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        {mode === "home" ? (
          <Link
            href="/videos"
            className="inline-flex min-h-11 items-center border-2 border-white/35 px-8 py-3 font-display text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors duration-fast hover:border-accent hover:text-accent"
          >
            {allLabel}
          </Link>
        ) : (
          <a
            href={YOUTUBE_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center border-2 border-white/35 px-8 py-3 font-display text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors duration-fast hover:border-accent hover:text-accent"
          >
            {allLabel}
          </a>
        )}
      </div>
    </section>
  );
}

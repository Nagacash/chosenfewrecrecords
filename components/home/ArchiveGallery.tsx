"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ARCHIVE_SHOTS, type ArchiveShot } from "@/lib/archive";
import { Stamp } from "@/components/ui/Stamp";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Frame({
  shot,
  className = "",
  sizes,
  badge,
  priority = false,
  onOpen,
}: {
  shot: ArchiveShot;
  className?: string;
  sizes: string;
  badge?: string;
  priority?: boolean;
  onOpen: (shot: ArchiveShot) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(shot)}
      className={`archive-frame group relative block w-full overflow-hidden bg-surface text-left ${className}`}
      aria-label={`Open full size: ${shot.caption}`}
    >
      <Image
        src={shot.src}
        alt={shot.alt}
        fill
        priority={priority}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        sizes={sizes}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-fast group-hover:opacity-100">
        <span className="border border-cream/40 bg-black/55 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-cream backdrop-blur-sm">
          View full
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
        <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-cream">
          {shot.caption}
        </span>
        {shot.story ? (
          <span className="mt-1 block max-w-[42ch] font-mono text-[7px] uppercase leading-relaxed tracking-[0.1em] text-cream/55">
            {shot.story}
          </span>
        ) : null}
        {badge ? (
          <span className="mt-2 inline-block font-mono text-[8px] uppercase tracking-[0.18em] text-accent">
            {badge}
          </span>
        ) : null}
      </div>
    </button>
  );
}

function Lightbox({
  shot,
  onClose,
}: {
  shot: ArchiveShot;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  useGSAP(
    () => {
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, scale: 0.96 },
        { autoAlpha: 1, scale: 1, duration: 0.35, ease: "power3.out" },
      );
    },
    { dependencies: [shot.src] },
  );

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={shot.caption}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              Full frame
            </p>
            <p className="mt-1 font-display text-lg font-black uppercase leading-tight text-cream md:text-xl">
              {shot.caption}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 border border-cream/25 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cream transition-colors hover:border-accent hover:text-accent"
          >
            Close ✕
          </button>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden border border-cream/15 bg-black">
          <div className="relative mx-auto flex max-h-[78vh] items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={shot.src}
              alt={shot.alt}
              className="max-h-[78vh] w-auto max-w-full object-contain"
            />
          </div>
        </div>

        {shot.story ? (
          <p className="mt-3 max-w-[70ch] font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-cream/60">
            {shot.story}
          </p>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}

function Chapter({
  num,
  kicker,
  title,
  children,
  tone = "cream",
}: {
  num: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
  tone?: "cream" | "accent" | "gold";
}) {
  const toneClass =
    tone === "accent" ? "text-accent" : tone === "gold" ? "text-gold" : "text-cream/50";

  return (
    <div className="archive-chapter relative">
      <div className="mb-4 flex items-end gap-3 border-b border-cream/10 pb-3">
        <span className={`font-mono text-[11px] font-bold tracking-[0.28em] ${toneClass}`}>
          {num}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
            {kicker}
          </p>
          <h3 className="mt-1 font-display text-[clamp(22px,3vw,32px)] font-black uppercase leading-none tracking-tight text-cream">
            {title}
          </h3>
        </div>
      </div>
      {children}
    </div>
  );
}

/** Photo essay — chronological Chosenfew story with GSAP scroll reveals */
export function ArchiveGallery() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<ArchiveShot | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const open = useCallback((shot: ArchiveShot) => setActive(shot), []);
  const close = useCallback(() => setActive(null), []);

  const twoRuff = ARCHIVE_SHOTS.find((s) => s.src.includes("2ruff-1995"));
  const nnekaFirst = ARCHIVE_SHOTS.find((s) =>
    s.src.includes("nneka-first-concert"),
  );
  const nagaTour = ARCHIVE_SHOTS.find((s) => s.src.includes("img_3961"));
  const nagaNow = ARCHIVE_SHOTS.find((s) => s.src.includes("img_0958"));
  const studio = ARCHIVE_SHOTS.find((s) =>
    s.src.includes("img_20260301"),
  );
  const film = ARCHIVE_SHOTS.filter(
    (s) =>
      s.era === "then" &&
      !s.src.includes("2ruff-1995") &&
      !s.src.includes("img_3961") &&
      !s.src.includes("nneka-first-concert"),
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".archive-intro", {
          autoAlpha: 0,
          y: 28,
          duration: 0.7,
          ease: "power3.out",
        });

        gsap.utils.toArray<HTMLElement>(".archive-chapter").forEach((chapter) => {
          gsap.from(chapter.querySelectorAll(".archive-frame, .archive-copy"), {
            autoAlpha: 0,
            y: 36,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: chapter,
              start: "top 82%",
              once: true,
            },
          });
        });

        gsap.from(".archive-film .archive-frame", {
          autoAlpha: 0,
          x: 40,
          duration: 0.55,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".archive-film",
            start: "top 85%",
            once: true,
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".archive-intro, .archive-frame, .archive-copy", {
          autoAlpha: 1,
          clearProps: "transform",
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="relative scroll-mt-20 border-t border-cream/10 bg-background px-5 py-[var(--section-y)] md:px-10 md:py-[var(--section-y-lg)]"
    >
      <div className="roots-stripe absolute inset-x-0 top-0 h-1" />

      <div className="archive-intro mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
            Film reel · Story
          </p>
          <h2 className="mt-2 max-w-[14ch] font-display text-[clamp(32px,5vw,52px)] font-black uppercase leading-[0.9] tracking-tight text-cream">
            Back in the days
          </h2>
          <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-cream/60">
            One continuous run — first heat to Boogiepark, mentors to full circle.
            Tap any frame for full size.
          </p>
        </div>
        <Stamp tone="cream">Chosenfewrecords · Film</Stamp>
      </div>

      <div className="space-y-10 md:space-y-12">
        {twoRuff ? (
          <Chapter num="01" kicker="1995 · Metronome / Polydor" title="First heat">
            <div className="grid gap-px bg-cream/10 md:grid-cols-[0.85fr_1.15fr]">
              <Frame
                shot={twoRuff}
                badge="Then"
                priority
                onOpen={open}
                className="aspect-square md:aspect-auto md:min-h-[380px]"
                sizes="(max-width:768px) 100vw, 40vw"
              />
              <div className="archive-copy flex flex-col justify-end bg-surface2 p-6 md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  2ruff — Ya Ready?
                </p>
                <p className="mt-3 max-w-[40ch] font-display text-2xl font-black uppercase leading-tight text-cream md:text-3xl">
                  Shortlord&apos;s first heat on the B-side
                </p>
                <p className="mt-4 max-w-[42ch] text-[14px] leading-relaxed text-cream/65">
                  {twoRuff.story}
                </p>
              </div>
            </div>
          </Chapter>
        ) : null}

        <Chapter num="02" kicker="Booth · Stage · Crew" title="Underground film">
          <div className="archive-film -mx-5 flex gap-px overflow-x-auto px-5 pb-1 hide-scrollbar md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0">
            {film.map((shot) => (
              <Frame
                key={shot.src}
                shot={shot}
                badge="Then"
                onOpen={open}
                className="aspect-[3/4] w-[58vw] shrink-0 sm:w-[42vw] md:w-auto md:aspect-[4/5]"
                sizes="(max-width:768px) 60vw, 25vw"
              />
            ))}
          </div>
        </Chapter>

        {nnekaFirst ? (
          <Chapter num="03" kicker="Mentor · Friend" title="Nneka first concert" tone="gold">
            <div className="grid gap-px bg-cream/10 lg:grid-cols-[0.9fr_1.1fr]">
              <Frame
                shot={nnekaFirst}
                badge="First show"
                onOpen={open}
                className="min-h-[420px] aspect-[3/4] lg:aspect-auto"
                sizes="(max-width:1024px) 100vw, 45vw"
              />
              <div className="archive-copy kraft-panel flex flex-col justify-between p-7 md:p-9">
                <div>
                  <Stamp tone="gold">Mentor · Friend</Stamp>
                  <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-black/50">
                    Tommy · Nneka · Shortlord
                  </p>
                  <h4 className="mt-3 max-w-[12ch] font-display text-[clamp(28px,4vw,44px)] font-black uppercase leading-[0.9] text-black">
                    First ever
                    <br />
                    <span className="text-[color:var(--accent)]">show</span>
                  </h4>
                  <p className="mt-4 max-w-[44ch] text-[15px] font-medium leading-relaxed text-black/70">
                    {nnekaFirst.story}
                  </p>
                </div>
                <div className="mt-8 grid gap-3 border-t border-black/10 pt-5 sm:grid-cols-3">
                  {[
                    ["Shortlord", "Mentor · Friend"],
                    ["Tommy", "Manager then"],
                    ["Nneka", "First ever show"],
                  ].map(([a, b]) => (
                    <div key={a}>
                      <p className="font-display text-base font-black uppercase text-black">
                        {a}
                      </p>
                      <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-black/45">
                        {b}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Chapter>
        ) : null}

        {nagaTour && nagaNow ? (
          <Chapter
            num="04"
            kicker="Vision · NAGA Apparel"
            title="Tour night → full circle"
            tone="accent"
          >
            <div className="grid gap-px bg-cream/10 lg:grid-cols-2">
              <div className="grid gap-px sm:grid-cols-[1.1fr_0.9fr] lg:col-span-2 lg:grid-cols-[1.05fr_0.95fr_1fr]">
                <Frame
                  shot={nagaTour}
                  badge="Tour night"
                  onOpen={open}
                  className="min-h-[280px] aspect-[16/11] sm:aspect-auto sm:min-h-[360px] lg:min-h-[440px]"
                  sizes="(max-width:1024px) 100vw, 35vw"
                />
                <div className="archive-copy flex flex-col justify-center bg-surface2 p-6 md:p-7">
                  <Stamp tone="accent">Exact night</Stamp>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                    Big Twins · DE tour
                  </p>
                  <p className="mt-2 font-display text-xl font-black uppercase leading-tight text-cream md:text-2xl">
                    Bonn · Köln · Die P first concert
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-cream/65">
                    {nagaTour.story}
                  </p>
                  <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.2em] text-gold">
                    ↓ Years later · Hamburg
                  </p>
                </div>
                <Frame
                  shot={nagaNow}
                  badge="Now"
                  priority
                  onOpen={open}
                  className="min-h-[360px] aspect-[3/4] sm:col-span-2 sm:aspect-[16/10] lg:col-span-1 lg:aspect-auto lg:min-h-[440px]"
                  sizes="(max-width:1024px) 100vw, 30vw"
                />
              </div>
              <div className="archive-copy kraft-panel p-6 md:p-8 lg:col-span-2">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-black/50">
                      After her Hamburg show
                    </p>
                    <h4 className="mt-2 font-display text-[clamp(26px,3.5vw,40px)] font-black uppercase leading-[0.9] text-black">
                      Die P ·{" "}
                      <span className="text-[color:var(--accent)]">full circle</span>
                    </h4>
                  </div>
                  <Stamp tone="accent">Manager admitted it</Stamp>
                </div>
                <p className="mt-4 max-w-[62ch] text-[14px] font-medium leading-relaxed text-black/70">
                  {nagaNow.story}
                </p>
              </div>
            </div>
          </Chapter>
        ) : null}

        {studio ? (
          <Chapter num="05" kicker="30 years later" title="Boogiepark · hustle" tone="gold">
            <div className="grid gap-px bg-cream/10 lg:grid-cols-[1.25fr_0.85fr]">
              <Frame
                shot={studio}
                badge="Now"
                onOpen={open}
                className="aspect-[16/10] min-h-[300px] lg:aspect-auto lg:min-h-[400px]"
                sizes="(max-width:1024px) 100vw, 60vw"
              />
              <div className="archive-copy flex flex-col justify-between bg-surface2 p-7 md:p-9">
                <div>
                  <Stamp tone="gold">For Shortlord&apos;s hustle</Stamp>
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
                    Where it all started
                  </p>
                  <h4 className="mt-2 font-display text-[clamp(28px,4vw,40px)] font-black uppercase leading-[0.9] text-cream">
                    Shortlord
                    <br />
                    <span className="text-accent">&amp; Lyn T</span>
                  </h4>
                  <p className="mt-4 text-[15px] leading-relaxed text-cream/70">
                    {studio.story}
                  </p>
                </div>
                <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                  End of reel · Still building
                </p>
              </div>
            </div>
          </Chapter>
        ) : null}
      </div>

      {mounted && active ? <Lightbox shot={active} onClose={close} /> : null}
    </section>
  );
}

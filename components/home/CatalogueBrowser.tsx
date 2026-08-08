"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "@/i18n/navigation";
import type { Release } from "@/lib/toolost";
import { getSpotifyForRelease, spotifyOpenUrl } from "@/lib/spotify";
import {
  CATALOGUE_FILTERS,
  ERA_SHELVES,
  matchesCatalogueFilter,
  releaseYear,
  sortReleasesNewest,
  type CatalogueFilter,
} from "@/lib/catalogue-ui";
import { SpotifyEmbed } from "@/components/ui/SpotifyEmbed";

gsap.registerPlugin(useGSAP);

type Labels = {
  label: string;
  headline: string;
  empty: string;
  listen: string;
  all: string;
  count: string;
  open: string;
  onSpotify: string;
  pick: string;
  archive: string;
  shelf: Record<(typeof ERA_SHELVES)[number], string>;
};

type CatalogueBrowserProps = {
  releases: Release[];
  labels: Labels;
  /** Home teaser can stay tighter; full page shows every shelf */
  mode?: "home" | "full";
};

function filterLabel(filter: CatalogueFilter, labels: Labels): string {
  if (filter === "all") return labels.all;
  if (filter === "listen") return labels.listen;
  return labels.shelf[filter];
}

export function CatalogueBrowser({
  releases,
  labels,
  mode = "home",
}: CatalogueBrowserProps) {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const crateRef = useRef<HTMLDivElement>(null);

  const sorted = useMemo(
    () => [...releases].sort(sortReleasesNewest),
    [releases],
  );

  const defaultId =
    sorted.find((r) => r.id === "top-floor")?.id ??
    sorted.find((r) => getSpotifyForRelease(r))?.id ??
    sorted[0]?.id ??
    "";

  const [filter, setFilter] = useState<CatalogueFilter>("all");
  const [activeId, setActiveId] = useState(defaultId);

  const filtered = useMemo(
    () => sorted.filter((r) => matchesCatalogueFilter(r, filter)),
    [sorted, filter],
  );

  const countLabel = useMemo(
    () => labels.count.replace(/\{count\}|\d+/, String(filtered.length)),
    [labels.count, filtered.length],
  );

  const active =
    filtered.find((r) => r.id === activeId) ??
    filtered[0] ??
    sorted[0] ??
    null;

  const spotify = active ? getSpotifyForRelease(active) : null;

  const shelves = useMemo(() => {
    if (filter !== "all") {
      return [
        {
          key: filter,
          title: filterLabel(filter, labels),
          items: filtered,
        },
      ] as const;
    }
    return ERA_SHELVES.map((era) => ({
      key: era,
      title: labels.shelf[era],
      items: sorted.filter((r) => matchesCatalogueFilter(r, era)),
    })).filter((s) => s.items.length > 0);
  }, [filter, filtered, sorted, labels]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { motion } = context.conditions!;

          gsap.from(".cat-chip", {
            autoAlpha: 0,
            y: motion ? 10 : 0,
            duration: motion ? 0.45 : 0.15,
            stagger: motion ? 0.04 : 0,
            ease: "power3.out",
          });

          gsap.from(".cat-stage", {
            autoAlpha: 0,
            x: motion ? -24 : 0,
            duration: motion ? 0.7 : 0.2,
            ease: "power3.out",
          });
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".cat-shelf-item",
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            stagger: { each: 0.03, from: "start" },
            ease: "power3.out",
            overwrite: "auto",
          },
        );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.fromTo(
          ".cat-shelf-item",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.15, stagger: 0.01, overwrite: "auto" },
        );
      });
      return () => mm.revert();
    },
    {
      scope: rootRef,
      dependencies: [filter],
      revertOnUpdate: true,
    },
  );

  useGSAP(
    () => {
      if (!stageRef.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          stageRef.current,
          { autoAlpha: 0.4, y: 12 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          },
        );
      });
      return () => mm.revert();
    },
    {
      scope: rootRef,
      dependencies: [active?.id],
      revertOnUpdate: true,
    },
  );

  if (!active) {
    return (
      <section
        id="releases-grid"
        className="scroll-mt-20 bg-background px-5 py-[var(--section-y)] md:px-10"
      >
        <p className="font-mono text-sm uppercase tracking-wider text-muted">
          {labels.empty}
        </p>
      </section>
    );
  }

  const year = releaseYear(active);
  const meta =
    active.meta ||
    [year || null, active.format].filter(Boolean).join(" · ");

  return (
    <section
      ref={rootRef}
      id="releases-grid"
      className="relative scroll-mt-20 overflow-hidden bg-background px-5 py-[var(--section-y)] md:px-10 md:py-[var(--section-y-lg)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "url(/textures/vinyl.png)",
          backgroundSize: "cover",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background/92 to-background" />

      <div className="relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
              {labels.label}
            </p>
            <h2 className="mt-2 font-display text-[clamp(36px,5vw,64px)] font-black uppercase leading-[0.9] tracking-tight text-cream">
              {labels.headline}
            </h2>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            {countLabel}
          </p>
        </div>

        <div
          className="mt-6 flex gap-2 overflow-x-auto pb-1 hide-scrollbar"
          role="tablist"
          aria-label="Catalogue filters"
        >
          {CATALOGUE_FILTERS.map((key) => {
            const on = filter === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={on}
                className={`cat-chip inline-flex min-h-11 shrink-0 items-center border px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-fast ${
                  on
                    ? "border-accent bg-accent text-black"
                    : "border-cream/20 bg-black/30 text-cream/70 hover:border-cream/45 hover:text-cream"
                }`}
                onClick={() => {
                  setFilter(key);
                  const next = sorted.filter((r) =>
                    matchesCatalogueFilter(r, key),
                  );
                  if (next.length && !next.some((r) => r.id === activeId)) {
                    setActiveId(next[0].id);
                  }
                }}
              >
                {filterLabel(key, labels)}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(280px,0.95fr)_1.35fr] lg:gap-8">
          {/* Mobile: browse shelves first; desktop: sticky stage left */}
          <div
            ref={stageRef}
            className="cat-stage order-2 lg:sticky lg:top-24 lg:order-1 lg:self-start"
          >
            <div className="border border-cream/15 bg-surface">
              <div className="relative mx-auto aspect-square w-full max-w-[360px] overflow-hidden lg:max-w-none">
                <Image
                  src={active.artwork_url}
                  alt={`${active.title} cover`}
                  fill
                  priority
                  sizes="(max-width:1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 ink-outline" />
                <div className="absolute left-3 top-3">
                  <span className="inline-block rotate-[-3deg] border-2 border-accent bg-background/85 px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-accent backdrop-blur-sm">
                    {year || "—"}
                  </span>
                </div>
              </div>

              <div className="kraft-panel p-4 sm:p-5 md:p-6">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-black/50">
                  {labels.pick}
                </p>
                <h3 className="mt-2 font-display text-[clamp(26px,7vw,44px)] font-black uppercase leading-[0.9] tracking-tight text-black">
                  {active.title}
                </h3>
                <p className="mt-2 font-display text-base font-bold uppercase text-black/60">
                  {active.artist}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-black/45">
                  {meta}
                </p>
              </div>

              <div className="space-y-4 bg-surface p-4 sm:p-5 md:p-6">
                {spotify ? (
                  <>
                    <SpotifyEmbed
                      spotify={spotify}
                      size="standard"
                      title={`${active.title} on Spotify`}
                    />
                    <a
                      href={spotifyOpenUrl(spotify)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center font-mono text-[10px] uppercase tracking-[0.16em] text-accent hover:underline"
                    >
                      {labels.onSpotify} →
                    </a>
                  </>
                ) : (
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    {labels.archive}
                  </p>
                )}

                <Link
                  href={`/releases/${active.id}`}
                  className="stamp-btn inline-flex min-h-11 w-full items-center justify-center bg-accent px-7 py-3.5 font-display text-sm font-black uppercase tracking-[0.08em] text-black transition-colors duration-fast hover:bg-accent-hover sm:w-auto"
                >
                  {labels.open}
                </Link>
              </div>
            </div>
          </div>

          {/* Crate shelves */}
          <div ref={crateRef} className="order-1 min-w-0 space-y-7 lg:order-2">
            {shelves.map((shelf) => (
              <div key={shelf.key}>
                <div className="mb-3 flex items-baseline justify-between gap-3">
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                    {shelf.title}
                  </h3>
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                    {shelf.items.length}
                  </span>
                </div>

                <div
                  className={
                    mode === "full" && filter !== "all"
                      ? "grid grid-cols-2 gap-2 sm:grid-cols-3"
                      : "flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 hide-scrollbar sm:gap-2.5"
                  }
                >
                  {shelf.items.map((release) => {
                    const on = release.id === active.id;
                    const y = releaseYear(release);
                    const hasSpotify = Boolean(getSpotifyForRelease(release));
                    return (
                      <button
                        key={release.id}
                        type="button"
                        onClick={() => {
                          setActiveId(release.id);
                          if (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) {
                            stageRef.current?.scrollIntoView({
                              behavior: "smooth",
                              block: "nearest",
                            });
                          }
                        }}
                        aria-pressed={on}
                        className={`cat-shelf-item group relative shrink-0 snap-start overflow-hidden border text-left transition-[border-color,transform] duration-fast ${
                          mode === "full" && filter !== "all"
                            ? "w-full"
                            : "w-[42vw] max-w-[168px] min-w-[132px] sm:w-[168px]"
                        } ${
                          on
                            ? "border-accent"
                            : "border-cream/10 hover:border-cream/35"
                        }`}
                      >
                        <div className="relative aspect-square bg-surface2">
                          <Image
                            src={release.artwork_url}
                            alt=""
                            fill
                            sizes="168px"
                            className="object-cover transition-transform duration-slow ease-out group-hover:scale-[1.04]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                          {hasSpotify ? (
                            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_3px_rgba(255,106,0,0.25)]" />
                          ) : null}
                          <div className="absolute inset-x-0 bottom-0 p-2.5">
                            <p className="line-clamp-2 font-display text-[13px] font-black uppercase leading-tight text-cream">
                              {release.title}
                            </p>
                            <p className="mt-0.5 truncate font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
                              {y || "—"} · {release.artist}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {filtered.length === 0 ? (
              <p className="font-mono text-xs uppercase tracking-wider text-muted">
                {labels.empty}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

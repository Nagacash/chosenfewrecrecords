"use client";

import { useAmbient } from "./AmbientProvider";

/** Fixed beat control — opt-in (browsers block unmuted autoplay). */
export function AmbientDock() {
  const { playing, toggle } = useAmbient();

  return (
    <div className="fixed bottom-4 left-4 z-[250] md:bottom-6 md:left-6">
      <button
        type="button"
        onClick={toggle}
        onContextMenu={(e) => e.preventDefault()}
        aria-pressed={playing}
        aria-label={playing ? "Pause background beat" : "Play background beat"}
        className="group flex min-h-11 items-center gap-2.5 border-2 border-cream/25 bg-background/90 px-3.5 py-2.5 font-mono text-[9px] uppercase tracking-[0.18em] text-cream backdrop-blur-md transition-colors duration-fast hover:border-accent hover:text-accent"
      >
        <span
          className={`flex h-2 w-2 rounded-full ${
            playing
              ? "bg-accent shadow-[0_0_0_3px_rgba(255,106,0,0.25)]"
              : "bg-muted"
          }`}
          aria-hidden
        />
        <span>{playing ? "Beat on" : "Beat"}</span>
        <span className="hidden text-muted sm:inline" aria-hidden>
          · Viby
        </span>
      </button>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

type AmbientVideoProps = {
  src: string;
  poster?: string;
  className?: string;
};

/** Muted looping background plate — respects prefers-reduced-motion */
export function AmbientVideo({ src, poster, className }: AmbientVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (mq.matches) {
        el.pause();
        return;
      }
      void el.play().catch(() => {
        /* autoplay can fail before user gesture; muted loop usually ok */
      });
    };

    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      tabIndex={-1}
    />
  );
}

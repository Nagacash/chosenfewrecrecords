"use client";

import { useState } from "react";
import Image from "next/image";
import { youtubeThumb } from "@/lib/youtube";

export function VideoCard({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative aspect-video w-full overflow-hidden bg-surface2 text-left"
      aria-label={`Play ${title}`}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="autoplay; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <>
          <Image
            src={youtubeThumb(id)}
            alt={title}
            fill
            sizes="(max-width:768px) 100vw, 25vw"
            className="object-cover brightness-[0.65] transition duration-500 group-hover:scale-105 group-hover:brightness-90"
          />
          <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/90 via-transparent to-transparent p-3">
            <span className="flex h-9 w-9 items-center justify-center bg-accent [clip-path:polygon(0_0,calc(100%-6px)_0,100%_6px,100%_100%,6px_100%,0_calc(100%-6px))]">
              <span className="ml-0.5 border-y-[6px] border-l-[11px] border-y-transparent border-l-black" />
            </span>
            <span className="line-clamp-2 font-mono text-[9px] uppercase tracking-[0.08em] text-white">
              {title}
            </span>
          </div>
        </>
      )}
    </button>
  );
}

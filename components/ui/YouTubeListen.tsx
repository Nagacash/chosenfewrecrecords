"use client";

import { useState } from "react";
import Image from "next/image";
import {
  youtubeEmbedUrl,
  youtubeThumb,
  youtubeWatchUrl,
} from "@/lib/youtube";
import { notifyExternalMedia } from "@/lib/ambient";

/** Compact YouTube listen surface for catalogue / release pages */
export function YouTubeListen({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="space-y-3">
      <div className="relative aspect-video overflow-hidden bg-black">
        {playing ? (
          <iframe
            src={youtubeEmbedUrl(id, true)}
            title={title}
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
            aria-label={`Play ${title} on YouTube`}
          >
            <Image
              src={youtubeThumb(id)}
              alt=""
              fill
              sizes="(max-width:1024px) 100vw, 40vw"
              className="object-cover brightness-[0.65] transition duration-slow group-hover:brightness-75"
            />
            <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-accent stamp-btn">
              <span className="ml-0.5 border-y-[7px] border-l-[12px] border-y-transparent border-l-black" />
            </span>
            <span className="absolute bottom-3 left-3 border border-cream/30 bg-background/80 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-cream backdrop-blur-sm">
              YouTube
            </span>
          </button>
        )}
      </div>
      <a
        href={youtubeWatchUrl(id)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center font-mono text-[10px] uppercase tracking-[0.16em] text-accent hover:underline"
      >
        Open on YouTube →
      </a>
    </div>
  );
}

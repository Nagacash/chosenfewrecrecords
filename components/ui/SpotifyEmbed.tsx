"use client";

import { useState } from "react";
import type { SpotifyRef } from "@/lib/spotify";
import { spotifyEmbedUrl } from "@/lib/spotify";
import { notifyExternalMedia } from "@/lib/ambient";

type SpotifyEmbedProps = {
  spotify: SpotifyRef;
  /** compact = catalogue bar; standard = track player; list = album tracklist */
  size?: "compact" | "standard" | "list";
  className?: string;
  title?: string;
};

export function SpotifyEmbed({
  spotify,
  size = "standard",
  className = "",
  title = "Spotify player",
}: SpotifyEmbedProps) {
  const height =
    size === "compact" ? 80 : size === "list" ? 352 : 152;
  const [unlocked, setUnlocked] = useState(false);

  const unlock = () => {
    notifyExternalMedia();
    setUnlocked(true);
  };

  return (
    <div
      className={`relative overflow-hidden bg-black ${className}`}
      onMouseEnter={() => {
        // Soft pause as soon as user aims at Spotify
        notifyExternalMedia();
      }}
    >
      <iframe
        src={spotifyEmbedUrl(spotify)}
        width="100%"
        height={height}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title={title}
        className="block w-full border-0"
      />
      {!unlocked ? (
        <button
          type="button"
          onClick={unlock}
          className="absolute inset-0 z-10 flex items-center justify-center bg-background/55 px-3 backdrop-blur-[1px] transition-opacity duration-fast hover:bg-background/40"
          aria-label="Play on Spotify — pauses site beat"
        >
          <span className="border border-accent bg-background/90 px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-accent">
            Play on Spotify
          </span>
        </button>
      ) : null}
    </div>
  );
}

"use client";

import { useEffect, useId, useState } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

type Props = {
  /** Full Instagram post / reel / TV URL */
  permalink: string;
  caption?: string;
};

function normalizePermalink(url: string) {
  const trimmed = url.split("?")[0].replace(/\/$/, "");
  return `${trimmed}/`;
}

/** Official Instagram embed — loads embed.js and processes the blockquote. */
export function InstagramEmbed({ permalink, caption }: Props) {
  const id = useId();
  const href = normalizePermalink(permalink);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let poll: number | undefined;

    const process = () => {
      if (cancelled) return;
      try {
        window.instgrm?.Embeds.process();
      } catch {
        if (!cancelled) setFailed(true);
      }
    };

    const watchForIframe = () => {
      poll = window.setInterval(() => {
        const root = document.getElementById(id);
        if (root?.querySelector("iframe")) {
          if (!cancelled) setReady(true);
          if (poll) window.clearInterval(poll);
        }
      }, 200);
    };

    const failTimer = window.setTimeout(() => {
      const root = document.getElementById(id);
      const iframe = root?.querySelector("iframe");
      if (!iframe && !cancelled) setFailed(true);
    }, 5000);

    watchForIframe();

    if (window.instgrm) {
      process();
      return () => {
        cancelled = true;
        window.clearTimeout(failTimer);
        if (poll) window.clearInterval(poll);
      };
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.instagram.com/embed.js"]',
    );

    if (existing) {
      existing.addEventListener("load", process);
      process();
      return () => {
        cancelled = true;
        window.clearTimeout(failTimer);
        if (poll) window.clearInterval(poll);
        existing.removeEventListener("load", process);
      };
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.instagram.com/embed.js";
    script.onload = process;
    script.onerror = () => {
      if (!cancelled) setFailed(true);
    };
    document.body.appendChild(script);

    return () => {
      cancelled = true;
      window.clearTimeout(failTimer);
      if (poll) window.clearInterval(poll);
    };
  }, [href, id]);

  const shell =
    "relative w-full overflow-hidden border border-cream/20 bg-[#0c0b0a] shadow-[0_24px_60px_rgba(0,0,0,0.55)]";

  if (failed) {
    return (
      <div className={shell}>
        <div className="roots-stripe h-1 w-full" />
        <iframe
          title={caption || "Instagram post"}
          src={`${href}embed`}
          className="h-[min(680px,78vh)] w-full bg-black"
          loading="lazy"
          allow="encrypted-media; picture-in-picture; clipboard-write"
          allowFullScreen
        />
        <div className="flex items-center justify-between gap-4 border-t border-cream/10 px-4 py-3.5">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
            Official @bundesliga post
          </p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent transition-colors hover:text-accent-hover"
          >
            Open →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={shell}>
      <div className="roots-stripe h-1 w-full" />
      {!ready ? (
        <div
          aria-hidden
          className="absolute inset-x-0 top-1 z-[1] flex h-[420px] flex-col items-center justify-center gap-3 bg-[#0c0b0a] md:h-[520px]"
        >
          <div className="h-10 w-10 animate-pulse border-2 border-accent/50" />
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-cream/40">
            Loading Instagram…
          </p>
        </div>
      ) : null}
      <div
        id={id}
        className={`instagram-embed flex w-full justify-center px-2 pb-2 pt-3 transition-opacity duration-500 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <blockquote
          className="instagram-media !m-0 !min-w-0 !max-w-full"
          data-instgrm-permalink={href}
          data-instgrm-version="14"
          style={{
            background: "transparent",
            border: 0,
            margin: 0,
            maxWidth: "100%",
            minWidth: "0",
            padding: 0,
            width: "100%",
          }}
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent"
          >
            {caption || "View on Instagram"}
          </a>
        </blockquote>
      </div>
    </div>
  );
}

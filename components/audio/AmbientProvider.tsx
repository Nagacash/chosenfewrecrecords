"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  AMBIENT_EXTERNAL_EVENT,
  AMBIENT_STREAM,
} from "@/lib/ambient";

type AmbientContextValue = {
  playing: boolean;
  ready: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
};

const AmbientContext = createContext<AmbientContextValue | null>(null);

export function useAmbient() {
  const ctx = useContext(AmbientContext);
  if (!ctx) {
    throw new Error("useAmbient must be used within AmbientProvider");
  }
  return ctx;
}

export function useAmbientOptional() {
  return useContext(AmbientContext);
}

export function AmbientProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  /** User hit pause on the dock — don't force-restart */
  const userPausedRef = useRef(false);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
  }, []);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    userPausedRef.current = false;
    if (!audio.src) {
      audio.src = AMBIENT_STREAM;
    }
    void audio.play().catch(() => {
      setPlaying(false);
    });
  }, []);

  const toggle = useCallback(() => {
    if (playing) {
      userPausedRef.current = true;
      pause();
    } else {
      play();
    }
  }, [playing, pause, play]);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = 0.28;
    audio.src = AMBIENT_STREAM;
    audio.setAttribute("controlsList", "nodownload noplaybackrate");
    audio.setAttribute("disableRemotePlayback", "true");
    audioRef.current = audio;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onCanPlay = () => setReady(true);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("canplay", onCanPlay);

    const unlockEvents = ["pointerdown", "keydown", "touchstart"] as const;
    const unlock = () => {
      if (userPausedRef.current) return;
      void audio.play().catch(() => {});
      for (const ev of unlockEvents) {
        window.removeEventListener(ev, unlock, true);
      }
    };

    // Try unmuted autoplay; if the browser blocks it, start on first tap/key
    void audio.play().catch(() => {
      for (const ev of unlockEvents) {
        window.addEventListener(ev, unlock, { capture: true, passive: true });
      }
    });

    return () => {
      for (const ev of unlockEvents) {
        window.removeEventListener(ev, unlock, true);
      }
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("canplay", onCanPlay);
      audioRef.current = null;
    };
  }, []);

  // YouTube postMessage + Spotify / video unlock
  useEffect(() => {
    const onExternal = () => {
      pause();
    };

    const onMessage = (event: MessageEvent) => {
      const okOrigin =
        event.origin === "https://www.youtube.com" ||
        event.origin === "https://www.youtube-nocookie.com";
      if (!okOrigin) return;

      let data: unknown = event.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }
      if (!data || typeof data !== "object") return;

      const payload = data as { event?: string; info?: number | string };
      if (payload.event === "onStateChange" && payload.info === 1) {
        pause();
      }
      if (payload.event === "infoDelivery" && payload.info === 1) {
        pause();
      }
    };

    window.addEventListener(AMBIENT_EXTERNAL_EVENT, onExternal);
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener(AMBIENT_EXTERNAL_EVENT, onExternal);
      window.removeEventListener("message", onMessage);
    };
  }, [pause]);

  const value = useMemo(
    () => ({ playing, ready, play, pause, toggle }),
    [playing, ready, play, pause, toggle],
  );

  return (
    <AmbientContext.Provider value={value}>{children}</AmbientContext.Provider>
  );
}

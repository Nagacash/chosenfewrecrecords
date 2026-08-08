"use client";

import { useEffect } from "react";

/** Scroll to #hash on first load / soft navigations (fixes Next dropping hash scroll). */
export function HashScroll() {
  useEffect(() => {
    const scroll = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash) return;
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    scroll();
    window.addEventListener("hashchange", scroll);
    return () => window.removeEventListener("hashchange", scroll);
  }, []);

  return null;
}

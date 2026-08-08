"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";

/** Logo that actually flexes — frame, pulse, scale */
export function BrandMark({
  size = "nav",
  href = "/",
}: {
  size?: "nav" | "hero" | "footer";
  href?: string;
}) {
  const dims =
    size === "hero"
      ? { w: 420, h: 112, className: "h-16 w-auto md:h-24" }
      : size === "footer"
        ? { w: 280, h: 72, className: "h-12 w-auto md:h-14" }
        : { w: 200, h: 52, className: "h-10 w-auto md:h-11" };

  const inner = (
    <span
      className={`logo-mark group relative inline-flex items-center justify-center ${size === "nav" ? "px-1" : "px-2"}`}
    >
      {/* Orange heat ring */}
      <span
        aria-hidden
        className="logo-pulse pointer-events-none absolute -inset-2 rounded-sm border border-accent/40 md:-inset-3"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-1 bg-accent/10 opacity-0 blur-xl transition-opacity duration-fast group-hover:opacity-100"
      />
      <Image
        src="/chosenfew_logo_white.png"
        alt="Chosenfewrecords"
        width={dims.w}
        height={dims.h}
        className={`${dims.className} relative z-10 mix-blend-screen drop-shadow-[0_0_24px_rgba(255,106,0,0.35)] transition-transform duration-fast group-hover:scale-[1.04]`}
        priority={size === "nav" || size === "hero"}
        unoptimized
      />
    </span>
  );

  if (!href) return inner;
  return (
    <Link href={href} className="relative z-10 block shrink-0" aria-label="Chosenfewrecords home">
      {inner}
    </Link>
  );
}

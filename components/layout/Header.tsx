"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { BrandMark } from "@/components/ui/BrandMark";

const PRIMARY = [
  { hash: "releases", key: "releases" as const },
  { hash: "artist", key: "artist" as const },
  { hash: "about", key: "label" as const },
  { hash: "demo", key: "demo" as const },
];

const MORE = [
  { hash: "roots", key: "roots" as const },
  { hash: "releases-grid", key: "catalogue" as const },
  { hash: "collabs", key: "features" as const },
  { hash: "videos", key: "videos" as const },
  { hash: "partners", key: "partners" as const },
];

function scrollToHash(hash: string) {
  const el = document.getElementById(hash);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

export function Header() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const goToSection = (hash: string) => {
    setOpen(false);
    setMoreOpen(false);

    if (pathname === "/") {
      if (scrollToHash(hash)) {
        window.history.replaceState(null, "", `/${locale}#${hash}`);
      }
      return;
    }

    router.push(`/#${hash}`);
    window.setTimeout(() => scrollToHash(hash), 120);
    window.setTimeout(() => scrollToHash(hash), 400);
  };

  const linkClass =
    "inline-flex min-h-11 items-center px-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55 transition-colors duration-fast hover:text-accent";

  return (
    <header className="fixed inset-x-0 top-0 z-nav border-b border-cream/10 bg-background/90 backdrop-blur-md">
      <div className="roots-stripe h-0.5 w-full" />
      <nav className="flex h-[4.25rem] items-center justify-between gap-3 px-5 md:px-10">
        <BrandMark size="nav" />

        <ul className="hidden items-center gap-5 lg:flex">
          {PRIMARY.map((link) => (
            <li key={link.hash}>
              <a
                href={`/${locale}#${link.hash}`}
                onClick={(e) => {
                  e.preventDefault();
                  goToSection(link.hash);
                }}
                className={linkClass}
              >
                {t(link.key)}
              </a>
            </li>
          ))}
          <li className="relative">
            <button
              type="button"
              className={linkClass}
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((v) => !v)}
            >
              {t("more")}
            </button>
            {moreOpen ? (
              <ul className="absolute right-0 top-full mt-2 min-w-[10rem] border-2 border-white/10 bg-background py-1 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                {MORE.map((link) => (
                  <li key={link.hash}>
                    <a
                      href={`/${locale}#${link.hash}`}
                      onClick={(e) => {
                        e.preventDefault();
                        goToSection(link.hash);
                      }}
                      className="block px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70 transition-colors hover:bg-surface2 hover:text-accent"
                    >
                      {t(link.key)}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        </ul>

        <div className="flex items-center gap-3 sm:gap-4">
          <LanguageSwitcher />
          <span className="hidden bg-accent px-3 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-black sm:inline">
            {t("badge")}
          </span>
          <button
            type="button"
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block h-[2px] w-[18px] bg-white transition-transform duration-fast ${open ? "translate-y-[5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-[2px] w-[18px] bg-white transition-transform duration-fast ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-[2px] w-[18px] bg-white transition-transform duration-fast ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t-2 border-white/[0.08] bg-background px-5 py-2 lg:hidden">
          {[...PRIMARY, ...MORE].map((link) => (
            <li key={link.hash} className="border-b border-white/[0.06]">
              <a
                href={`/${locale}#${link.hash}`}
                onClick={(e) => {
                  e.preventDefault();
                  goToSection(link.hash);
                }}
                className="flex min-h-12 items-center font-mono text-[11px] uppercase tracking-[0.22em] text-white/85"
              >
                {t(link.key)}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

const SECTION_LINKS = [
  { hash: "releases", key: "releases" as const },
  { hash: "releases-grid", key: "catalogue" as const },
  { hash: "artist", key: "artist" as const },
  { hash: "collabs", key: "features" as const },
  { hash: "videos", key: "videos" as const },
  { hash: "about", key: "label" as const },
  { hash: "demo", key: "demo" as const },
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

  const goToSection = (hash: string) => {
    setOpen(false);

    if (pathname === "/") {
      if (scrollToHash(hash)) {
        window.history.replaceState(null, "", `/${locale}#${hash}`);
      }
      return;
    }

    router.push(`/#${hash}`);
    // After client navigation, scroll once the home section exists
    window.setTimeout(() => scrollToHash(hash), 120);
    window.setTimeout(() => scrollToHash(hash), 400);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[200] border-b border-white/[0.06] bg-background/90 backdrop-blur-xl">
      <nav className="flex h-16 items-center justify-between gap-3 px-5 md:px-10">
        <Link href="/" className="relative z-10 block shrink-0">
          <Image
            src="/chosenfew_logo_white.png"
            alt="Chosenfewrecords"
            width={180}
            height={48}
            className="h-9 w-auto mix-blend-screen"
            priority
            unoptimized
          />
        </Link>

        <ul className="hidden items-center gap-4 lg:flex xl:gap-5">
          {SECTION_LINKS.map((link) => (
            <li key={link.hash}>
              <a
                href={`/${locale}#${link.hash}`}
                onClick={(e) => {
                  e.preventDefault();
                  goToSection(link.hash);
                }}
                className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/45 transition hover:text-accent"
              >
                {t(link.key)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 sm:gap-4">
          <LanguageSwitcher />
          <span className="hidden bg-accent px-3 py-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-black sm:inline">
            {t("badge")}
          </span>
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block h-[1.5px] w-[18px] bg-white transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-[1.5px] w-[18px] bg-white transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-white/[0.06] bg-background/97 px-5 py-3 lg:hidden">
          {SECTION_LINKS.map((link) => (
            <li key={link.hash} className="border-b border-white/[0.06]">
              <a
                href={`/${locale}#${link.hash}`}
                onClick={(e) => {
                  e.preventDefault();
                  goToSection(link.hash);
                }}
                className="block py-3.5 font-mono text-[9px] uppercase tracking-[0.22em] text-white/80"
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

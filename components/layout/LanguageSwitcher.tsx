"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { AppLocale } from "@/lib/locale";

const LOCALES: AppLocale[] = ["en", "de", "fr"];

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em]">
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => router.replace(pathname, { locale: code })}
          className={
            locale === code
              ? "text-accent"
              : "text-muted transition-colors hover:text-cream"
          }
          aria-label={`Switch to ${code}`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

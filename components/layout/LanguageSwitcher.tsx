"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em]">
      {(["en", "de"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => router.replace(pathname, { locale: code })}
          className={
            locale === code
              ? "text-accent"
              : "text-muted transition-colors hover:text-cream"
          }
        >
          {code}
        </button>
      ))}
    </div>
  );
}

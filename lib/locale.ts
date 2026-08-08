import { routing } from "@/i18n/routing";

export type AppLocale = (typeof routing.locales)[number];

export function isAppLocale(value: string): value is AppLocale {
  return (routing.locales as readonly string[]).includes(value);
}

/** Pick localized content with English fallback */
export function pickLocaleText(
  map: Partial<Record<AppLocale, string>> & { en: string },
  locale: string
): string {
  if (isAppLocale(locale) && map[locale]) return map[locale] as string;
  return map.en;
}

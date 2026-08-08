import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Archivo_Black, Outfit, Space_Mono } from "next/font/google";
import { routing } from "@/i18n/routing";
import { isAppLocale } from "@/lib/locale";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AmbientProvider } from "@/components/audio/AmbientProvider";
import { AmbientDock } from "@/components/audio/AmbientDock";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/site";

const display = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

/** Fresh body — Outfit reads modern, not 2004 UI */
const body = Outfit({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Meta" });
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `/${l}`]),
  ) as Record<string, string>;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: `%s · ${t("brand")}`,
    },
    description: t("description"),
    keywords: t("keywords")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    authors: [{ name: "Chosenfewrecords" }],
    creator: "Chosenfewrecords",
    publisher: "Chosenfewrecords",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...languages,
        "x-default": `/${routing.defaultLocale}`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale,
      siteName: t("brand"),
      url: `/${locale}`,
      images: [
        {
          url: "/og.jpg",
          width: 1200,
          height: 630,
          alt: t("ogAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isAppLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-background font-body text-base leading-relaxed text-cream antialiased">
        <JsonLd locale={locale} />
        <NextIntlClientProvider messages={messages}>
          <AmbientProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <AmbientDock />
          </AmbientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

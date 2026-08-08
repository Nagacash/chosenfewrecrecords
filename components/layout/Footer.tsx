import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PARTNERS } from "@/lib/content";
import { SOCIAL } from "@/lib/social";
import { BrandMark } from "@/components/ui/BrandMark";

export async function Footer() {
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-[3px] border-accent bg-background px-5 pb-8 pt-16 md:px-10">
      <div className="roots-stripe mb-10 h-1 w-full" />
      <div className="mb-12 grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-4">
            <BrandMark size="footer" href="/" />
          </div>
          <p className="max-w-xs font-display text-xl font-bold uppercase leading-snug text-muted">
            {t("tagline")}
          </p>
          <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-cream/40">
            Guyane · Chicago · Hamburg
          </p>
        </div>

        <div>
          <div className="mb-5 font-mono text-[9px] uppercase tracking-[0.22em] text-accent">
            {t("navigate")}
          </div>
          <ul className="space-y-2.5">
            <li>
              <Link href="/releases" className="font-display text-sm font-bold uppercase text-muted hover:text-accent">
                Releases
              </Link>
            </li>
            <li>
              <Link href="/artists/shortlord" className="font-display text-sm font-bold uppercase text-muted hover:text-accent">
                Shortlord
              </Link>
            </li>
            <li>
              <Link href="/videos" className="font-display text-sm font-bold uppercase text-muted hover:text-accent">
                Videos
              </Link>
            </li>
            <li>
              <Link href="/about" className="font-display text-sm font-bold uppercase text-muted hover:text-accent">
                About
              </Link>
            </li>
            <li>
              <Link href="/features" className="font-display text-sm font-bold uppercase text-muted hover:text-accent">
                Features
              </Link>
            </li>
            <li>
              <Link href="/roots" className="font-display text-sm font-bold uppercase text-muted hover:text-accent">
                Roots
              </Link>
            </li>
            <li>
              <Link href="/demo" className="font-display text-sm font-bold uppercase text-muted hover:text-accent">
                Demo
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="mb-5 font-mono text-[9px] uppercase tracking-[0.22em] text-accent">
            {t("connect")}
          </div>
          <ul className="space-y-2.5">
            <li>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-sm font-bold uppercase text-muted hover:text-accent"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={SOCIAL.spotifyArtist}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-sm font-bold uppercase text-muted hover:text-accent"
              >
                Spotify
              </a>
            </li>
            <li>
              <a
                href={SOCIAL.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-sm font-bold uppercase text-muted hover:text-accent"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="mb-5 font-mono text-[9px] uppercase tracking-[0.22em] text-accent">
            {t("partners")}
          </div>
          <ul className="space-y-4">
            {PARTNERS.map((p) => (
              <li key={p.url}>
                <p className="mb-1 font-mono text-[8px] uppercase tracking-[0.16em] text-gold">
                  {t("officialPartner")}
                </p>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-sm font-bold uppercase text-muted transition hover:text-accent"
                >
                  {p.name}
                </a>
                <p className="mt-1 text-[11px] leading-snug text-muted/80">
                  {p.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        id="partners"
        className="mb-8 scroll-mt-20 border border-white/[0.06] bg-surface px-5 py-4 sm:flex sm:items-center sm:justify-between sm:gap-6"
      >
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-gold">
            {t("officialPartner")}
          </p>
          <p className="mt-1 font-display text-lg font-black uppercase text-white">
            NAGA Club
          </p>
        </div>
        <a
          href="https://nagaclub.de"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block border border-white/20 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-cream transition hover:border-accent hover:text-accent sm:mt-0"
        >
          nagaclub.de →
        </a>
      </div>

      <div className="flex flex-col gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
          {t("copy", { year })}
        </p>
        <div className="flex gap-6">
          <Link href="/impressum" className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted hover:text-accent">
            {t("impressum")}
          </Link>
          <Link href="/datenschutz" className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted hover:text-accent">
            {t("datenschutz")}
          </Link>
        </div>
      </div>
    </footer>
  );
}

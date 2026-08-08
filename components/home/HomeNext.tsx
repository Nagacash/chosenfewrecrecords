import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const LINKS = [
  {
    href: "/releases",
    key: "catalogue" as const,
    num: "03",
    hint: "The Crate",
  },
  {
    href: "/artists/shortlord",
    key: "artist" as const,
    num: "04",
    hint: "Shortlord",
  },
  {
    href: "/videos",
    key: "videos" as const,
    num: "06",
    hint: "Archive",
  },
  {
    href: "/about",
    key: "label" as const,
    num: "07",
    hint: "Label",
  },
];

export async function HomeNext() {
  const t = await getTranslations("Nav");

  return (
    <section className="border-t border-cream/10 bg-background px-5 py-[var(--section-y)] md:px-10 md:py-[var(--section-y-lg)]">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
        Next
      </p>
      <h2 className="mt-2 font-display text-[clamp(32px,5vw,52px)] font-black uppercase leading-[0.9] tracking-tight text-cream">
        Keep digging
      </h2>

      <div className="mt-8 grid gap-px bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
        {LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex min-h-[140px] flex-col justify-between bg-surface p-5 transition-colors duration-fast hover:bg-surface2 sm:min-h-[180px] sm:p-6"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold">
              {item.num}
            </span>
            <div>
              <p className="font-display text-2xl font-black uppercase leading-none text-cream transition-colors duration-fast group-hover:text-accent">
                {t(item.key)}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                {item.hint} →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

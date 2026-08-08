import Image from "next/image";
import { ARCHIVE_SHOTS } from "@/lib/archive";
import { Stamp } from "@/components/ui/Stamp";

/** Back-in-the-days + now — real Chosenfew frames */
export function ArchiveGallery() {
  const nnekaFirst = ARCHIVE_SHOTS.find((s) =>
    s.src.includes("nneka-first-concert"),
  );
  const nagaTour = ARCHIVE_SHOTS.find((s) => s.src.includes("img_3961"));
  const then = ARCHIVE_SHOTS.filter(
    (s) =>
      s.era === "then" &&
      !s.src.includes("img_3961") &&
      !s.src.includes("nneka-first-concert"),
  );
  const nagaNow = ARCHIVE_SHOTS.find((s) => s.src.includes("img_0958"));
  const studio = ARCHIVE_SHOTS.find((s) =>
    s.src.includes("img_20260301"),
  );

  return (
    <section className="relative scroll-mt-20 border-t border-cream/10 bg-background px-5 py-[var(--section-y)] md:px-10 md:py-[var(--section-y-lg)]">
      <div className="roots-stripe absolute inset-x-0 top-0 h-1" />

      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
            Archive
          </p>
          <h2 className="mt-2 max-w-[16ch] font-display text-[clamp(32px,5vw,52px)] font-black uppercase leading-[0.9] tracking-tight text-cream">
            Back in the days
          </h2>
          <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-cream/60">
            Booth banners, merch drops, stage heat, crew nights — Hamburg underground
            on film.
          </p>
        </div>
        <Stamp tone="cream">Chosenfewrecords · Film</Stamp>
      </div>

      <div className="grid grid-cols-2 gap-px bg-cream/10 md:grid-cols-4">
        {then.map((shot, i) => (
          <figure
            key={shot.src}
            className={`group relative overflow-hidden bg-surface ${
              shot.span === "wide"
                ? "col-span-2 aspect-[16/10]"
                : shot.span === "tall"
                  ? "aspect-[3/4] md:row-span-2 md:aspect-auto md:min-h-[420px]"
                  : "aspect-square"
            } ${i === 0 ? "md:col-span-2 md:aspect-[16/11]" : ""}`}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes={
                shot.span === "wide" || i === 0
                  ? "(max-width:768px) 100vw, 50vw"
                  : "(max-width:768px) 50vw, 25vw"
              }
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80" />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 md:p-4">
              <span className="min-w-0">
                <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-cream/90">
                  {shot.caption}
                </span>
                {shot.story ? (
                  <span className="mt-1 block font-mono text-[7px] uppercase tracking-[0.12em] text-cream/55">
                    {shot.story}
                  </span>
                ) : null}
              </span>
              <span className="shrink-0 font-mono text-[8px] uppercase tracking-[0.14em] text-accent">
                Then
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {nnekaFirst ? (
        <div className="mt-14 overflow-hidden border border-cream/15">
          <div className="roots-stripe h-1.5 w-full" />
          <div className="grid lg:grid-cols-[minmax(260px,0.9fr)_1.2fr]">
            <figure className="relative min-h-[420px] bg-surface lg:min-h-[480px]">
              <Image
                src={nnekaFirst.src}
                alt={nnekaFirst.alt}
                fill
                className="object-cover object-[center_20%]"
                sizes="(max-width:1024px) 100vw, 40vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent lg:hidden" />
              <figcaption className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2 lg:hidden">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream">
                  {nnekaFirst.caption}
                </span>
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-gold">
                  First show
                </span>
              </figcaption>
            </figure>

            <div className="kraft-panel flex flex-col justify-between p-7 md:p-10">
              <div>
                <Stamp tone="gold">Mentor · Friend</Stamp>
                <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-black/50">
                  Tommy · Nneka · Shortlord
                </p>
                <h3 className="mt-3 max-w-[12ch] font-display text-[clamp(32px,4.5vw,48px)] font-black uppercase leading-[0.9] tracking-tight text-black">
                  Nneka
                  <br />
                  <span className="text-[color:var(--accent)]">first concert</span>
                </h3>
                <p className="mt-5 max-w-[46ch] text-[15px] font-medium leading-relaxed text-black/70">
                  {nnekaFirst.story}
                </p>
              </div>
              <div className="mt-8 grid gap-4 border-t border-black/10 pt-6 sm:grid-cols-3">
                <div>
                  <p className="font-display text-lg font-black uppercase text-black">
                    Shortlord
                  </p>
                  <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-black/45">
                    Mentor · Friend
                  </p>
                </div>
                <div>
                  <p className="font-display text-lg font-black uppercase text-black">
                    Tommy
                  </p>
                  <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-black/45">
                    Manager then
                  </p>
                </div>
                <div>
                  <p className="font-display text-lg font-black uppercase text-black">
                    Nneka
                  </p>
                  <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-black/45">
                    First ever show
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {nagaTour ? (
        <div className="mt-8 overflow-hidden border border-cream/15">
          <div className="grid lg:grid-cols-[1.15fr_0.95fr]">
            <figure className="relative min-h-[320px] bg-surface md:min-h-[420px]">
              <Image
                src={nagaTour.src}
                alt={nagaTour.alt}
                fill
                className="object-cover object-center"
                sizes="(max-width:1024px) 100vw, 55vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-background/35" />
              <figcaption className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2 lg:hidden">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream">
                  {nagaTour.caption}
                </span>
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-accent">
                  Tour night
                </span>
              </figcaption>
            </figure>

            <div className="flex flex-col justify-between bg-surface2 p-7 md:p-9">
              <div>
                <Stamp tone="accent">Exact night</Stamp>
                <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-accent">
                  Shortlord × NAGA Apparel Jam
                </p>
                <h3 className="mt-3 max-w-[14ch] font-display text-[clamp(28px,4vw,42px)] font-black uppercase leading-[0.9] text-cream">
                  Big Twins
                  <br />
                  <span className="text-gold">Germany tour</span>
                </h3>
                <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-cream/70">
                  {nagaTour.story}
                </p>
              </div>
              <div className="mt-8 grid gap-4 border-t border-cream/10 pt-6 sm:grid-cols-3">
                <div>
                  <p className="font-display text-base font-black uppercase text-cream">
                    Bonn · Köln
                  </p>
                  <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                    Touchdowns
                  </p>
                </div>
                <div>
                  <p className="font-display text-base font-black uppercase text-cream">
                    Die P
                  </p>
                  <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                    First concert
                  </p>
                </div>
                <div>
                  <p className="font-display text-base font-black uppercase text-cream">
                    Manager
                  </p>
                  <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-muted">
                    Hooked that night
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {nagaNow ? (
        <div className="mt-8 overflow-hidden border border-cream/15">
          <div className="grid lg:grid-cols-[minmax(260px,0.95fr)_1.15fr]">
            <figure className="relative min-h-[420px] bg-surface lg:min-h-[520px]">
              <Image
                src={nagaNow.src}
                alt={nagaNow.alt}
                fill
                className="object-cover object-center"
                sizes="(max-width:1024px) 100vw, 45vw"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-background/40" />
              <figcaption className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2 lg:hidden">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream">
                  {nagaNow.caption}
                </span>
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-gold">
                  Now
                </span>
              </figcaption>
            </figure>

            <div className="kraft-panel flex flex-col justify-between p-7 md:p-10">
              <div>
                <Stamp tone="accent">Now · After the show</Stamp>
                <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-black/50">
                  Hamburg · Die P · Manager run-in
                </p>
                <h3 className="mt-3 max-w-[14ch] font-display text-[clamp(32px,4.5vw,48px)] font-black uppercase leading-[0.9] tracking-tight text-black">
                  Die P
                  <br />
                  <span className="text-[color:var(--accent)]">full circle</span>
                </h3>
                <p className="mt-5 max-w-[46ch] text-[15px] font-medium leading-relaxed text-black/70">
                  {nagaNow.story}
                </p>
              </div>

              <div className="mt-8 grid gap-4 border-t border-black/10 pt-6 sm:grid-cols-3">
                <div>
                  <p className="font-display text-lg font-black uppercase text-black">
                    Hamburg
                  </p>
                  <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-black/45">
                    After her show
                  </p>
                </div>
                <div>
                  <p className="font-display text-lg font-black uppercase text-black">
                    Tour night
                  </p>
                  <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-black/45">
                    Frame above · Origin
                  </p>
                </div>
                <div>
                  <p className="font-display text-lg font-black uppercase text-black">
                    Admitted
                  </p>
                  <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-black/45">
                    Manager said it
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {studio ? (
        <div className="mt-8 overflow-hidden border border-cream/15">
          <div className="grid lg:grid-cols-[1.2fr_0.9fr]">
            <figure className="group relative aspect-[16/10] overflow-hidden bg-surface lg:aspect-auto lg:min-h-[380px]">
              <Image
                src={studio.src}
                alt={studio.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width:1024px) 100vw, 60vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-background/30" />
            </figure>
            <div className="flex flex-col justify-between bg-surface2 p-7 md:p-9">
              <div>
                <Stamp tone="gold">30 years later</Stamp>
                <p className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
                  Boogiepark studio
                </p>
                <h3 className="mt-3 max-w-[12ch] font-display text-[clamp(28px,4vw,40px)] font-black uppercase leading-[0.9] text-cream">
                  Shortlord
                  <br />
                  <span className="text-accent">&amp; Lyn T</span>
                </h3>
                <p className="mt-4 max-w-[40ch] text-[15px] leading-relaxed text-cream/70">
                  {studio.story}
                </p>
              </div>
              <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                Where it all started · for Shortlord’s hustle
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

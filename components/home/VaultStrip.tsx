import Image from "next/image";
import { Stamp } from "@/components/ui/Stamp";
import { FlagBarrage } from "@/components/ui/Flags";
import { AmbientVideo } from "@/components/ui/AmbientVideo";

/** From-the-vault object strip — real sleeve + vinyl motif */
export function VaultStrip() {
  return (
    <section className="border-y border-cream/10 bg-surface">
      <div className="grid md:grid-cols-[1.1fr_1fr_1fr]">
        <div className="relative min-h-[220px] overflow-hidden md:min-h-[280px]">
          <Image
            src="/2ruff.jpg"
            alt="2ruff Wicked Witch vinyl sleeve — 1995"
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <Stamp>From the vault · 1995</Stamp>
            <p className="mt-2 font-display text-xl font-black uppercase text-cream">
              2ruff — Ya Ready?
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
              B-side · Metronome / Polydor
            </p>
          </div>
        </div>

        <div className="relative min-h-[180px] overflow-hidden border-t border-cream/10 md:border-l md:border-t-0 md:min-h-full">
          <AmbientVideo
            src="/videos/vinyl-spin.mp4"
            poster="/textures/vinyl.png"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-background/35" />
          <div className="absolute bottom-4 left-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
              Object
            </p>
            <p className="mt-1 font-display text-lg font-black uppercase text-cream">
              Vinyl grooves
            </p>
          </div>
        </div>

        <div className="kraft-panel relative flex min-h-[180px] flex-col justify-end border-t border-black/10 p-6 md:border-l md:border-t-0 md:min-h-full">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-black/50">
            Chosenfewrecords
          </p>
          <p className="mt-2 font-display text-2xl font-black uppercase leading-none text-black">
            Always
            <br />
            Independent
          </p>
          <p className="mt-3 max-w-[28ch] text-sm font-medium leading-snug text-black/70">
            Guyanese roots. American blood. German home. Black independent forever.
          </p>
          <div className="mt-5">
            <FlagBarrage size="sm" />
          </div>
        </div>
      </div>
    </section>
  );
}

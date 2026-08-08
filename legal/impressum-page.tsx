// app/[locale]/impressum/page.tsx
// Drop this file into your Next.js App Router project at that path.
// Address: 20355 Hamburg · chosenfewrecords@hotmail.de

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum — Chosenfewrecords',
  robots: { index: false },
}

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-[#090909] text-[#F0EDE6] pt-24 pb-24 px-6 md:px-14 lg:px-24">
      <div className="max-w-2xl mx-auto">

        {/* Section label */}
        <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#FF6A00] mb-6">
          Rechtliches
        </p>

        <h1 className="font-display text-4xl md:text-5xl uppercase tracking-tight mb-12">
          Impressum
        </h1>

        {/* ── Angaben gemäß § 5 TMG ── */}
        <section className="mb-10">
          <h2 className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#C8A84B] mb-4">
            Angaben gemäß § 5 TMG
          </h2>
          <p className="text-sm leading-relaxed opacity-80">
            Maurice Holda<br />
            Chosenfewrecords<br />
            20355 Hamburg<br />
            Deutschland
          </p>
        </section>

        {/* ── Kontakt ── */}
        <section className="mb-10 border-t border-white/8 pt-8">
          <h2 className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#C8A84B] mb-4">
            Kontakt
          </h2>
          <p className="text-sm leading-relaxed opacity-80">
            E-Mail: <a href="mailto:chosenfewrecords@hotmail.de" className="text-[#FF6A00] hover:underline">chosenfewrecords@hotmail.de</a>
          </p>
          {/* Telefon nur angeben, wenn öffentlich zugänglich */}
          {/* <p className="text-sm leading-relaxed opacity-80 mt-1">Telefon: [TELEFON]</p> */}
        </section>

        {/* ── Umsatzsteuer-ID ── */}
        <section className="mb-10 border-t border-white/8 pt-8">
          <h2 className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#C8A84B] mb-4">
            Umsatzsteuer-Identifikationsnummer
          </h2>
          <p className="text-sm leading-relaxed opacity-80">
            Sofern vorhanden: Umsatzsteuer-Identifikationsnummer gemäß § 27 a
            Umsatzsteuergesetz: Nicht vorhanden — Abschnitt kann entfernt werden
          </p>
        </section>

        {/* ── Verantwortlich für den Inhalt ── */}
        <section className="mb-10 border-t border-white/8 pt-8">
          <h2 className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#C8A84B] mb-4">
            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
          </h2>
          <p className="text-sm leading-relaxed opacity-80">
            Maurice Holda<br />
            20355 Hamburg
          </p>
        </section>

        {/* ── Haftung für Inhalte ── */}
        <section className="mb-10 border-t border-white/8 pt-8">
          <h2 className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#C8A84B] mb-4">
            Haftung für Inhalte
          </h2>
          <p className="text-sm leading-relaxed opacity-80">
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen
            Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir
            als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
            rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
            Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
            Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer
            konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
            Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>
        </section>

        {/* ── Haftung für Links ── */}
        <section className="mb-10 border-t border-white/8 pt-8">
          <h2 className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#C8A84B] mb-4">
            Haftung für Links
          </h2>
          <p className="text-sm leading-relaxed opacity-80">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
            keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
            Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
            Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum
            Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
            Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
            inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte
            einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen
            werden wir derartige Links umgehend entfernen.
          </p>
        </section>

        {/* ── Urheberrecht ── */}
        <section className="mb-10 border-t border-white/8 pt-8">
          <h2 className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#C8A84B] mb-4">
            Urheberrecht
          </h2>
          <p className="text-sm leading-relaxed opacity-80">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
            unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
            Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
            bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen
            Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
            wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte
            Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
            Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden
            Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte
            umgehend entfernen.
          </p>
        </section>

        <div className="border-t border-white/8 pt-8">
          <a href="/datenschutz" className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#FF6A00] hover:underline">
            → Datenschutzerklärung
          </a>
        </div>

      </div>
    </main>
  )
}

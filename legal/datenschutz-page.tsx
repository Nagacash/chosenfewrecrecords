// app/[locale]/datenschutz/page.tsx
// Drop this file into your Next.js App Router project at that path.
// Address: 20355 Hamburg · chosenfewrecords@hotmail.de
// This policy covers: contact/demo form, YouTube nocookie embeds, no analytics.
// If you later add analytics (Plausible, GA, etc.), update Section 5.

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutz — Chosenfewrecords',
  robots: { index: false },
}

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-[#090909] text-[#F0EDE6] pt-24 pb-24 px-6 md:px-14 lg:px-24">
      <div className="max-w-2xl mx-auto">

        <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#FF6A00] mb-6">
          Rechtliches
        </p>

        <h1 className="font-display text-4xl md:text-5xl uppercase tracking-tight mb-4">
          Datenschutzerklärung
        </h1>
        <p className="font-mono text-[10px] tracking-[0.14em] text-[#666] mb-12">
          Stand: August 2026
        </p>

        {/* ── 1. Verantwortlicher ── */}
        <Section number="1" title="Verantwortlicher">
          <p>
            Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
          </p>
          <p className="mt-3">
            Maurice Holda<br />
            Chosenfewrecords<br />
            20355 Hamburg<br />
            Deutschland<br />
            E-Mail:{' '}
            <a href="mailto:chosenfewrecords@hotmail.de" className="text-[#FF6A00] hover:underline">
              chosenfewrecords@hotmail.de
            </a>
          </p>
        </Section>

        {/* ── 2. Allgemeines ── */}
        <Section number="2" title="Allgemeines zur Datenverarbeitung">
          <p>
            Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst und behandeln Ihre
            personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
            Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </p>
          <p className="mt-3">
            Diese Website erhebt beim bloßen Aufrufen der Seiten{' '}
            <strong>keine personenbezogenen Daten</strong>, speichert keine Tracking-Cookies
            und setzt keine Analyse-Dienste (z. B. Google Analytics) ein. Daten werden nur in
            den unten beschriebenen Fällen verarbeitet.
          </p>
        </Section>

        {/* ── 3. Hosting & Server-Logs ── */}
        <Section number="3" title="Hosting und Server-Log-Dateien">
          <p>
            Diese Website wird bei <strong>Vercel Inc.</strong>, 340 Pine Street Suite 701,
            San Francisco, CA 94104, USA, gehostet. Beim Aufruf der Website werden durch den
            Hosting-Anbieter automatisch sogenannte Server-Log-Dateien erhoben, die Ihr Browser
            automatisch übermittelt. Dies sind:
          </p>
          <ul className="mt-3 space-y-1 text-sm opacity-80 list-none pl-0">
            {[
              'Browsertyp und Browserversion',
              'Verwendetes Betriebssystem',
              'Referrer URL',
              'Hostname des zugreifenden Rechners',
              'Uhrzeit der Serveranfrage',
              'IP-Adresse (anonymisiert)',
            ].map((item) => (
              <li key={item} className="before:content-['—'] before:text-[#FF6A00] before:mr-2">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-3">
            Diese Daten sind nicht bestimmten Personen zuordenbar. Eine Zusammenführung dieser
            Daten mit anderen Datenquellen wird nicht vorgenommen. Rechtsgrundlage ist Art. 6
            Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren Betrieb der Website).
            Vercel verarbeitet diese Daten gemäß seiner{' '}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF6A00] hover:underline"
            >
              Datenschutzrichtlinie
            </a>
            . Für die Übermittlung in die USA gelten die EU-US-Standardvertragsklauseln.
          </p>
        </Section>

        {/* ── 4. Kontakt- und Demo-Formular ── */}
        <Section number="4" title="Kontakt- und Demo-Einreichungsformular">
          <p>
            Wenn Sie uns über das Kontakt- oder Demo-Formular auf dieser Website eine Anfrage
            zukommen lassen, werden Ihre Angaben aus dem Formular inklusive der von Ihnen dort
            angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von
            Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre
            Einwilligung weiter.
          </p>
          <p className="mt-3">
            Die Verarbeitung der in das Formular eingegebenen Daten erfolgt auf Grundlage von{' '}
            <strong>Art. 6 Abs. 1 lit. b DSGVO</strong> (vorvertragliche Maßnahmen auf Anfrage
            der betroffenen Person) sowie <strong>Art. 6 Abs. 1 lit. f DSGVO</strong>{' '}
            (berechtigtes Interesse an der Beantwortung von Anfragen).
          </p>
          <p className="mt-3">
            Die von Ihnen im Formular eingegebenen Daten verbleiben bei uns, bis Sie uns zur
            Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für
            die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer
            Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen –
            bleiben unberührt. Wir speichern Formularanfragen in der Regel nicht länger als{' '}
            <strong>3 Monate</strong>, sofern kein weitergehendes berechtigtes Interesse
            besteht.
          </p>
        </Section>

        {/* ── 5. YouTube ── */}
        <Section number="5" title="Eingebettete YouTube-Videos">
          <p>
            Auf dieser Website sind Videos des Videoportals YouTube eingebunden. Betreiber der
            Seiten ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
          </p>
          <p className="mt-3">
            Wir verwenden YouTube im{' '}
            <strong>erweiterten Datenschutzmodus</strong> (
            <code className="text-[#FF6A00] bg-white/5 px-1 py-0.5 rounded text-[11px]">
              youtube-nocookie.com
            </code>
            ). Videos werden auf dieser Seite{' '}
            <strong>nicht automatisch geladen</strong>. Ein YouTube-Iframe wird erst dann
            erzeugt, wenn Sie aktiv auf das Vorschaubild eines Videos klicken. Erst in diesem
            Moment stellt Ihr Browser eine Verbindung zu den Servern von YouTube her.
          </p>
          <p className="mt-3">
            Durch Ihren Klick (Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO) können
            Informationen über Ihren Websitebesuch an YouTube übermittelt werden, darunter Ihre
            IP-Adresse. Weitere Informationen zum Datenschutz bei YouTube finden Sie in der
            Datenschutzerklärung von Google:{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF6A00] hover:underline"
            >
              https://policies.google.com/privacy
            </a>
            .
          </p>
          <p className="mt-3">
            Wenn Sie keine Daten an YouTube übertragen möchten, klicken Sie bitte nicht auf
            die Play-Schaltflächen der eingebetteten Videos.
          </p>
        </Section>

        {/* ── 6. Cookies ── */}
        <Section number="6" title="Cookies">
          <p>
            Diese Website setzt{' '}
            <strong>keine Tracking-Cookies oder Marketing-Cookies</strong> ein. Es werden
            ausschließlich technisch notwendige Cookies verwendet, die für den Betrieb der
            Website erforderlich sind (z. B. Spracheinstellung). Diese Cookies werden auf
            Grundlage von Art. 6 Abs. 1 lit. f DSGVO gesetzt und erfordern keine
            Einwilligung.
          </p>
          <p className="mt-3">
            YouTube-Cookies werden erst gesetzt, wenn Sie aktiv auf ein Video klicken (siehe
            Abschnitt 5).
          </p>
        </Section>

        {/* ── 7. Betroffenenrechte ── */}
        <Section number="7" title="Ihre Rechte als betroffene Person">
          <p>Sie haben gegenüber uns folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:</p>
          <ul className="mt-3 space-y-2 text-sm opacity-80 list-none pl-0">
            {[
              { right: 'Recht auf Auskunft', basis: 'Art. 15 DSGVO' },
              { right: 'Recht auf Berichtigung', basis: 'Art. 16 DSGVO' },
              { right: 'Recht auf Löschung', basis: 'Art. 17 DSGVO' },
              { right: 'Recht auf Einschränkung der Verarbeitung', basis: 'Art. 18 DSGVO' },
              { right: 'Recht auf Datenübertragbarkeit', basis: 'Art. 20 DSGVO' },
              { right: 'Recht auf Widerspruch gegen die Verarbeitung', basis: 'Art. 21 DSGVO' },
              { right: 'Recht auf Widerruf einer Einwilligung', basis: 'Art. 7 Abs. 3 DSGVO' },
            ].map(({ right, basis }) => (
              <li key={right} className="before:content-['—'] before:text-[#FF6A00] before:mr-2">
                {right}{' '}
                <span className="font-mono text-[9px] tracking-[0.1em] text-[#C8A84B]">
                  ({basis})
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4">
            Zur Geltendmachung Ihrer Rechte wenden Sie sich bitte per E-Mail an:{' '}
            <a href="mailto:chosenfewrecords@hotmail.de" className="text-[#FF6A00] hover:underline">
              chosenfewrecords@hotmail.de
            </a>
          </p>
          <p className="mt-3">
            Sie haben außerdem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die
            Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren. Die für Hamburg
            zuständige Behörde ist der{' '}
            <a
              href="https://datenschutz.hamburg.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF6A00] hover:underline"
            >
              Hamburgische Beauftragte für Datenschutz und Informationsfreiheit
            </a>
            .
          </p>
        </Section>

        {/* ── 8. Aktualität ── */}
        <Section number="8" title="Aktualität und Änderung dieser Datenschutzerklärung">
          <p>
            Diese Datenschutzerklärung ist aktuell gültig und hat den Stand August 2026. Durch
            die Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher
            beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese
            Datenschutzerklärung zu ändern.
          </p>
        </Section>

        <div className="border-t border-white/8 pt-8">
          <a href="/impressum" className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#FF6A00] hover:underline">
            → Impressum
          </a>
        </div>

      </div>
    </main>
  )
}

// ── Helper component ──────────────────────────────────────────────────────────
function Section({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-10 border-t border-white/8 pt-8">
      <h2 className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#C8A84B] mb-1">
        {number}.
      </h2>
      <h3 className="font-display text-lg uppercase tracking-tight text-[#F0EDE6] mb-4">
        {title}
      </h3>
      <div className="text-sm leading-relaxed opacity-80 space-y-2">{children}</div>
    </section>
  )
}

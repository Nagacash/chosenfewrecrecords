export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-section text-accent">
      <span className="shrink-0">{children}</span>
      <span className="h-px flex-1 bg-white/15" />
      <span aria-hidden className="h-1.5 w-1.5 shrink-0 bg-accent" />
    </div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-section text-accent">
      <span>{children}</span>
      <span className="h-px flex-1 bg-white/10" />
    </div>
  );
}

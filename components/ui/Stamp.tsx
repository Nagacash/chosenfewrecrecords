export function Stamp({
  children,
  tone = "accent",
}: {
  children: React.ReactNode;
  tone?: "accent" | "cream" | "gold" | "caribbean";
}) {
  const tones = {
    accent: "border-accent text-accent",
    cream: "border-cream/50 text-cream",
    gold: "border-gold text-gold",
    caribbean: "border-caribbean text-caribbean",
  };

  return (
    <span
      className={`inline-flex rotate-[-2deg] items-center border-2 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.22em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

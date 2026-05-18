export function SectionEyebrow({
  index,
  label,
  sub,
}: {
  index: number;
  label: string;
  sub?: string;
}) {
  return (
    <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-foreground/60">
      <span className="font-mono text-saffron">
        {String(index).padStart(2, "0")}
      </span>
      <span className="h-px w-10 bg-gradient-to-r from-saffron to-transparent" />
      <span>{label}</span>
      {sub ? <span className="text-foreground/40">· {sub}</span> : null}
    </div>
  );
}

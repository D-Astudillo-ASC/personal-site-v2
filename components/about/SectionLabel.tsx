interface SectionLabelProps {
  index: string;
  label: string;
  className?: string;
}

export default function SectionLabel({
  index,
  label,
  className = "mb-8",
}: SectionLabelProps) {
  return (
    <h2
      className={`font-mono text-xs tracking-[0.2em] uppercase text-muted ${className}`}
    >
      <span className="text-accent">{index}</span>
      <span className="px-2 text-muted/40">/</span>
      {label}
    </h2>
  );
}

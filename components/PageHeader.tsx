interface PageHeaderProps {
  index?: string;
  label: string;
  title: string;
  description?: string;
  className?: string;
}

export default function PageHeader({
  index,
  label,
  title,
  description,
  className = "mb-12",
}: PageHeaderProps) {
  return (
    <header className={className}>
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted">
        {index ? (
          <>
            <span className="text-accent">{index}</span>
            <span className="text-muted/40"> / </span>
            {label}
          </>
        ) : (
          label
        )}
      </p>
      <h1 className="font-display text-[clamp(2.75rem,8vw,5rem)] italic leading-[0.95] tracking-tight text-text">
        {title}
      </h1>
      {description ? (
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted text-balance">
          {description}
        </p>
      ) : null}
    </header>
  );
}

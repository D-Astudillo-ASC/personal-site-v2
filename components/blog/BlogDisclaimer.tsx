export default function BlogDisclaimer() {
  return (
    <aside
      className="mb-10 rounded-lg border border-border bg-surface/60 px-4 py-3 text-sm leading-relaxed text-muted"
      aria-label="Case study disclaimer"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
        Case study note
      </span>
      <p className="mt-2">
        These essays describe engineering approaches in generalized form. Names of
        companies, products, and internal systems are intentionally omitted. Some
        work is still in development. This is not official documentation or a
        statement on behalf of any employer.
      </p>
    </aside>
  );
}

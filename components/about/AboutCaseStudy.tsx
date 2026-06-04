import Link from "next/link";

export default function AboutCaseStudy() {
  return (
    <article className="mb-16 rounded-lg border border-border bg-surface p-6 sm:p-8">
      <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-accent">
        Case study
      </p>
      <p className="mt-3 font-display text-3xl italic text-text sm:text-4xl">
        21s → &lt;2s → ~250ms
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        A Data-as-a-Service API was running BigQuery DML on the hot path — 20–30
        second queries under load. Storage Write API over gRPC got responses
        under 2 seconds. Moving the read path to PostgreSQL + EF Core brought hot
        queries down to roughly 200–300ms. Three architectural decisions, not
        query tuning.
      </p>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <Link
          href="/blog/cutting-a-data-api-from-21s-to-250ms"
          className="font-medium text-text transition-fast hover:text-accent"
        >
          Read the latency essay
          <span aria-hidden="true"> →</span>
        </Link>
        <Link
          href="/blog/building-a-microfrontend-data-platform"
          className="font-medium text-muted transition-fast hover:text-accent"
        >
          Data Studio platform
          <span aria-hidden="true"> →</span>
        </Link>
      </div>
    </article>
  );
}

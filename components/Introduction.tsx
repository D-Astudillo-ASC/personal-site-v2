import Link from "next/link";

export default function Introduction() {
  return (
    <div className="space-y-10">
      <p className="font-display text-2xl italic leading-snug text-text sm:text-3xl">
        Backend-first full-stack engineer — I make data paths fast and platforms
        maintainable.
      </p>

      <div className="space-y-5 text-base leading-relaxed text-muted">
        <p>
          I&apos;m Daniel, based in New York. I target senior full-stack and
          backend roles where the work is APIs, data stores, and the systems
          around them — subscription platforms, payment rails, market data. Most
          of my experience is there: .NET and Spring Boot services at{" "}
          <Link
            href="/blog/bridging-amqps-and-jms-for-real-time-events"
            className="text-text transition-fast hover:text-accent"
          >
            Visa
          </Link>
          , a self-directed stretch building realtime and CRDT systems, and
          data infrastructure plus frontend platform work at{" "}
          <Link
            href="/about"
            className="text-text transition-fast hover:text-accent"
          >
            S&amp;P Global
          </Link>
          .
        </p>
        <p>
          I&apos;m strongest on the backend — schema design, migrations, gRPC,
          message pipelines — but I routinely own the full path when it
          matters: Next.js frontends, Auth0, multi-pod caching, microfrontend
          shells. The pattern is the same: find the bottleneck, pick the right
          tool, ship with tests and measurable latency.
        </p>
      </div>

      <article className="rounded-lg border border-border bg-surface p-6 sm:p-8">
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-accent">
          Case study
        </p>
        <p className="mt-3 font-display text-3xl italic text-text sm:text-4xl">
          21s → &lt;2s → ~250ms
        </p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          A Data-as-a-Service API was running BigQuery DML on the hot path —
          20–30 second queries under load. Storage Write API over gRPC got
          responses under 2 seconds. Moving the read path to PostgreSQL + EF Core
          brought hot queries down to roughly 200–300ms. Three architectural
          decisions, not query tuning.
        </p>
        <Link
          href="/blog/cutting-a-data-api-from-21s-to-250ms"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-text transition-fast hover:text-accent"
        >
          Read the full write-up
          <span aria-hidden="true">→</span>
        </Link>
      </article>

      <p className="text-base leading-relaxed text-muted">
        On my own time I ship end-to-end — auth, realtime sync, deploy pipelines
        — including a{" "}
        <Link
          href="/projects"
          className="text-text transition-fast hover:text-accent"
        >
          collaborative editor
        </Link>{" "}
        with Yjs CRDTs, durable Postgres persistence, and production-style
        sharing and rate limiting.{" "}
        <Link
          href="/about"
          className="text-text transition-fast hover:text-accent"
        >
          Full background →
        </Link>
      </p>
    </div>
  );
}

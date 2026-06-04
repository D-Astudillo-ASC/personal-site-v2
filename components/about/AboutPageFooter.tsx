import Link from "next/link";

export default function AboutPageFooter() {
  return (
    <section className="rounded-lg border border-border bg-surface p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
      <div className="max-w-xl">
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-accent">
          Next
        </p>
        <p className="mt-2 font-display text-2xl italic text-text sm:text-3xl">
          Compare notes on something you&apos;re building
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Performance bottlenecks, realtime sync, payment rails, or how you
          triage a messy dependency tree — I read every message.
        </p>
      </div>
      <div className="mt-6 flex flex-wrap gap-3 sm:mt-0">
        <Link
          href="/projects"
          className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2.5 text-sm font-medium text-text transition-fast hover:border-accent/40 hover:text-accent"
        >
          Selected work
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-md bg-text px-4 py-2.5 text-sm font-medium text-background transition-fast hover:bg-accent"
        >
          Contact
        </Link>
      </div>
    </section>
  );
}

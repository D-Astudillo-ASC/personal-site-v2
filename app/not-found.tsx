import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";

export default function NotFound() {
  return (
    <PageShell maxWidth="2xl">
      <PageHeader
        index="404"
        label="Not found"
        title="This page doesn't exist."
        description="The URL might be stale, mistyped, or from a deploy that moved on. Nothing broke — you're just early to a route I haven't shipped yet."
        className="mb-10"
      />

      <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
        <Link
          href="/projects"
          className="group bg-background p-6 transition-fast hover:bg-surface"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted/70">
            Selected work
          </span>
          <span className="mt-2 block font-display text-xl italic text-text transition-fast group-hover:text-accent">
            See what shipped →
          </span>
        </Link>
        <Link
          href="/blog"
          className="group bg-background p-6 transition-fast hover:bg-surface"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted/70">
            Writing
          </span>
          <span className="mt-2 block font-display text-xl italic text-text transition-fast group-hover:text-accent">
            Read the deep dives →
          </span>
        </Link>
      </div>

      <p className="mt-10 font-mono text-xs text-muted/70">
        Or{" "}
        <Link href="/" className="text-muted transition-fast hover:text-accent">
          head home
        </Link>
        . If you opened DevTools looking for secrets — check the console. You&apos;re
        my kind of visitor.
      </p>
    </PageShell>
  );
}

import React from "react";
import Link from "next/link";

const Hero = React.memo(() => {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24"
      role="banner"
    >
      <div className="relative w-full max-w-4xl">
        <p className="hero-enter mb-6 font-mono text-xs tracking-[0.22em] text-muted uppercase [animation-delay:0ms]">
          Backend-first · Full-stack
        </p>

        <h1 className="hero-enter mb-4 font-display italic text-[clamp(3.25rem,10vw,7.5rem)] leading-[0.92] tracking-tight text-text [animation-delay:80ms]">
          Daniel Astudillo
        </h1>

        <p className="hero-enter mb-10 font-mono text-xs tracking-[0.18em] text-muted/70 uppercase [animation-delay:160ms]">
          APIs &nbsp;·&nbsp; Data platforms &nbsp;·&nbsp; Real-time &nbsp;·&nbsp; NYC
        </p>

        <p className="hero-enter mb-12 max-w-xl text-base leading-relaxed text-muted [animation-delay:240ms]">
          Cut a production data path from{" "}
          <span className="text-text">21s to ~250ms</span>, took{" "}
          <span className="text-text">40% off p95</span> on a payment API
          migration, and shipped realtime pipelines at{" "}
          <span className="text-text">99.99% uptime</span>. Backend-first —
          schema design, gRPC, brokers, migrations — with full-stack ownership
          when that&apos;s what ships. I find the wrong layer on the critical
          path, replace it, and prove the win in production.
        </p>

        <div className="hero-enter flex flex-wrap items-center gap-x-6 gap-y-3 [animation-delay:320ms]">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium text-text transition-fast hover:border-accent/40 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            View work
            <span aria-hidden="true" className="text-accent">
              →
            </span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-fast hover:text-text"
          >
            Get in touch
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;

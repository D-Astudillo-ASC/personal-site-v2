import type { ReactNode } from "react";

/* ── Compound-component API for MDX architecture diagrams ── */

function Connector({ label }: { label?: string }) {
  return (
    <div
      className="flex w-full max-w-xs flex-col items-center py-0.5"
      aria-hidden="true"
    >
      <div className="h-4 w-px bg-border/80" />
      {label ? (
        <span className="my-1.5 max-w-[16rem] px-2 text-center font-mono text-[10px] leading-snug tracking-wide text-muted">
          {label}
        </span>
      ) : null}
      <div className="h-4 w-px bg-border/80" />
      <svg
        width="10"
        height="6"
        viewBox="0 0 10 6"
        className="text-border/80"
        aria-hidden="true"
      >
        <path d="M0 0 L5 6 L10 0" fill="currentColor" />
      </svg>
    </div>
  );
}

function Step({
  title,
  caption,
  highlight = false,
}: {
  title: string;
  caption?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`w-full max-w-[11rem] rounded-lg border px-3 py-2.5 text-center shadow-sm sm:max-w-[10.5rem] ${
        highlight
          ? "border-accent/50 bg-accent/[0.07] ring-1 ring-accent/25"
          : "border-border/80 bg-surface/80"
      }`}
    >
      <p className="text-[13px] font-medium leading-snug text-text">{title}</p>
      {caption ? (
        <p className="mt-1.5 font-mono text-[10px] leading-snug text-muted">
          {caption}
        </p>
      ) : null}
    </div>
  );
}

function Fork({
  caption,
  children,
}: {
  caption?: string;
  children: ReactNode;
}) {
  const childArray = Array.isArray(children) ? children : [children];

  return (
    <div className="flex w-full flex-col items-center">
      {caption ? <Connector label={caption} /> : <Connector />}
      <div className="relative flex w-full flex-wrap items-start justify-center gap-x-3 gap-y-3 sm:gap-x-5">
        {/* horizontal rail for 2+ branches on sm+ */}
        {childArray.length > 1 ? (
          <div
            className="pointer-events-none absolute top-0 hidden h-px bg-border/70 sm:block"
            style={{
              left: "calc(50% - min(42%, 9rem))",
              width: "min(84%, 18rem)",
            }}
            aria-hidden="true"
          />
        ) : null}
        {childArray.map((child, i) => (
          <div key={i} className="flex flex-col items-center pt-3 sm:pt-4">
            <div className="mb-2 hidden h-3 w-px bg-border/70 sm:block" />
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

function Root({ children }: { children: ReactNode }) {
  return (
    <figure
      className="not-prose my-10 overflow-hidden rounded-xl border border-border/80 bg-gradient-to-b from-surface/40 to-background/30 px-4 py-6 sm:px-8 sm:py-8"
      aria-label="Architecture diagram"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center">
        {children}
      </div>
    </figure>
  );
}

const FlowDiagram = Object.assign(Root, { Step, Fork, Connector });

export default FlowDiagram;

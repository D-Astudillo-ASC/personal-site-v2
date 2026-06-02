"use client";

import { useState } from "react";
import type { TocHeading } from "@/lib/posts";

interface MobileTableOfContentsProps {
  headings: TocHeading[];
}

export default function MobileTableOfContents({
  headings,
}: MobileTableOfContentsProps) {
  const [open, setOpen] = useState(false);

  if (headings.length < 2) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="not-prose mb-8 rounded-lg border border-border bg-surface/50 lg:hidden"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
        aria-expanded={open}
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          On this page
        </span>
        <span className="font-mono text-xs text-muted" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>
      {open ? (
        <ul className="space-y-2 border-t border-border px-4 py-3">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={heading.level === 3 ? "pl-3" : undefined}
            >
              <a
                href={`#${heading.id}`}
                onClick={() => setOpen(false)}
                className="block text-sm leading-snug text-muted transition-fast hover:text-accent"
              >
                {heading.title}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </nav>
  );
}

"use client";

import { useEffect, useState } from "react";
import type { TocHeading } from "@/lib/posts";

interface TableOfContentsProps {
  headings: TocHeading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(
    headings[0]?.id ?? "",
  );

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0 && visible[0].target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-32 max-h-[calc(100dvh-9rem)] overflow-y-auto pb-8 pl-1"
    >
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted/80">
        On this page
      </p>
      <ul className="space-y-1.5 border-l border-border/80 pl-3">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li
              key={heading.id}
              className={heading.level === 3 ? "pl-3" : undefined}
            >
              <a
                href={`#${heading.id}`}
                className={`block py-0.5 text-[13px] leading-snug transition-fast ${
                  isActive
                    ? "font-medium text-accent"
                    : "text-muted/90 hover:text-text"
                }`}
                aria-current={isActive ? "location" : undefined}
              >
                {heading.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

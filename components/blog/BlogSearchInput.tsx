"use client";

import { useState } from "react";

interface BlogSearchInputProps {
  initialQuery: string;
  onApply: (query: string) => void;
  onClear: () => void;
}

export default function BlogSearchInput({
  initialQuery,
  onApply,
  onClear,
}: BlogSearchInputProps) {
  const [draft, setDraft] = useState(initialQuery);

  return (
    <div className="mb-8">
      <label htmlFor="blog-search" className="sr-only">
        Search writing
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          id="blog-search"
          type="search"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onApply(draft);
            }
          }}
          placeholder="Search titles, excerpts, tags…"
          className="w-full rounded-lg border border-border bg-surface/40 px-4 py-2.5 font-mono text-sm text-text placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          type="button"
          onClick={() => onApply(draft)}
          className="shrink-0 rounded-lg bg-accent px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-stone-900 transition-fast hover:brightness-110"
        >
          Search
        </button>
      </div>
      {initialQuery ? (
        <p className="mt-2 font-mono text-[10px] text-muted/80">
          Matching &ldquo;{initialQuery}&rdquo; —{" "}
          <button
            type="button"
            className="text-accent underline decoration-accent/40 underline-offset-2"
            onClick={onClear}
          >
            clear search
          </button>
        </p>
      ) : null}
    </div>
  );
}

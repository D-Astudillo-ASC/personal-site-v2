"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy } from "@/lib/fontawesome-icons";
import { useRef, useState, type HTMLAttributes, type ReactNode } from "react";

type CodeBlockProps = HTMLAttributes<HTMLPreElement> & {
  "data-language"?: string;
  "data-theme"?: string;
  children?: ReactNode;
};

const LANGUAGE_LABELS: Record<string, string> = {
  plaintext: "Text",
  text: "Text",
  ts: "TypeScript",
  typescript: "TypeScript",
  tsx: "TSX",
  js: "JavaScript",
  javascript: "JavaScript",
  jsx: "JSX",
  cs: "C#",
  csharp: "C#",
  sql: "SQL",
  bash: "Bash",
  shell: "Shell",
  sh: "Shell",
  yml: "YAML",
  yaml: "YAML",
  md: "Markdown",
  markdown: "Markdown",
  json: "JSON",
  xml: "XML",
  html: "HTML",
  css: "CSS",
  go: "Go",
  rust: "Rust",
  python: "Python",
  py: "Python",
};

function formatLanguage(lang: string): string {
  const key = lang.toLowerCase();
  return LANGUAGE_LABELS[key] ?? lang;
}

export default function CodeBlock({
  children,
  "data-language": language,
  className,
  ...props
}: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const lang = formatLanguage(language ?? "text");

  const copy = async () => {
    const text =
      preRef.current?.querySelector("code")?.textContent?.trim() ?? "";
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard denied — fail silently */
    }
  };

  return (
    <figure className="code-block not-prose group/code my-8 overflow-hidden rounded-xl border border-border/70 bg-surface shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-background/50 px-3 py-2 sm:px-4">
        <span className="font-mono text-[11px] tracking-wide text-muted">
          {lang}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-background px-2.5 py-1 font-mono text-[11px] text-muted transition-fast hover:border-border hover:text-text"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          <FontAwesomeIcon
            icon={copied ? faCheck : faCopy}
            className="h-3 w-3"
            aria-hidden="true"
          />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre
        ref={preRef}
        tabIndex={0}
        className={`code-block-pre m-0 overflow-x-auto px-0 py-0 text-[0.6875rem] leading-[1.65] sm:text-[0.8125rem] ${className ?? ""}`}
        data-language={language}
        {...props}
      >
        {children}
      </pre>
    </figure>
  );
}

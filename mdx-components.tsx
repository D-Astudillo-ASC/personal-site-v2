import Image from "next/image";
import type { HTMLAttributes, ImgHTMLAttributes } from "react";
import type { MDXComponents } from "mdx/types";
import CodeBlock from "@/components/blog/CodeBlock";
import FlowDiagram from "@/components/blog/FlowDiagram";
import HeadingLink from "@/components/blog/HeadingLink";

const parseDimension = (value: unknown): number | undefined => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number.parseInt(value, 10);
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
};

type MDXImgProps = ImgHTMLAttributes<HTMLImageElement> & {
  src?: string;
};

const MDXImage = (props: MDXImgProps) => {
  const { src, alt, width, height, className, ...rest } = props;
  if (!src) return null;

  const w = parseDimension(width) ?? 1200;
  const h = parseDimension(height) ?? 800;

  return (
    <Image
      src={src}
      alt={alt ?? ""}
      width={w}
      height={h}
      sizes="100vw"
      className={`my-8 h-auto max-w-full rounded-lg ring-1 ring-border ${className ?? ""}`}
      {...rest}
    />
  );
};

type CodeProps = HTMLAttributes<HTMLElement> & {
  "data-language"?: string;
  "data-line"?: string;
};

function isBlockCode(props: CodeProps): boolean {
  return (
    props["data-language"] !== undefined || props["data-line"] !== undefined
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="sr-only" {...props} />,
    h2: ({ id, className, ...props }) => (
      <HeadingLink
        level={2}
        id={id}
        className={`mt-14 mb-4 text-2xl font-medium tracking-tight text-text ${className ?? ""}`}
        {...props}
      />
    ),
    h3: ({ id, className, ...props }) => (
      <HeadingLink
        level={3}
        id={id}
        className={`mt-10 mb-3 text-xl font-semibold text-text ${className ?? ""}`}
        {...props}
      />
    ),
    h4: (props) => (
      <h4 className="mt-8 mb-2 text-lg font-medium text-text" {...props} />
    ),
    h5: (props) => (
      <h5 className="mt-6 mb-2 text-base font-medium text-text" {...props} />
    ),
    h6: (props) => (
      <h6
        className="mt-6 mb-2 font-mono text-xs uppercase tracking-[0.14em] text-muted"
        {...props}
      />
    ),
    p: (props) => (
      <p className="mb-5 text-base leading-relaxed text-text/80" {...props} />
    ),
    a: (props) => (
      <a
        className="text-accent underline decoration-accent/40 underline-offset-2 transition-fast hover:decoration-accent"
        {...props}
      />
    ),
    ul: (props) => (
      <ul
        className="mb-5 list-disc space-y-2 pl-6 text-text/80 marker:text-accent"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="mb-5 list-decimal space-y-2 pl-6 text-text/80 marker:text-muted"
        {...props}
      />
    ),
    li: (props) => <li className="text-base leading-relaxed" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="my-6 border-l-2 border-accent pl-5 italic text-muted"
        {...props}
      />
    ),
    code: ({ className, ...props }: CodeProps) => {
      if (isBlockCode(props)) {
        return <code className={className} {...props} />;
      }
      return (
        <code
          className="rounded bg-text/5 px-1.5 py-0.5 font-mono text-[0.85em] text-text ring-1 ring-border"
          {...props}
        />
      );
    },
    pre: (props) => <CodeBlock {...props} />,
    hr: (props) => <hr className="my-10 border-t border-border" {...props} />,
    table: (props) => (
      <div className="my-8 overflow-x-auto rounded-lg ring-1 ring-border">
        <table
          className="w-full min-w-[28rem] border-collapse text-sm"
          {...props}
        />
      </div>
    ),
    thead: (props) => <thead className="bg-surface text-left" {...props} />,
    tbody: (props) => (
      <tbody className="divide-y divide-border bg-background" {...props} />
    ),
    tr: (props) => (
      <tr className="transition-fast hover:bg-surface/60" {...props} />
    ),
    th: (props) => (
      <th
        className="border-b border-border px-4 py-3 text-left font-semibold text-text"
        {...props}
      />
    ),
    td: (props) => (
      <td
        className="px-4 py-3 align-top text-text/80 [&>code]:text-[0.8125rem]"
        {...props}
      />
    ),
    strong: (props) => (
      <strong className="font-semibold text-text" {...props} />
    ),
    em: (props) => <em className="italic" {...props} />,
    img: (props) => <MDXImage {...props} />,
    FlowDiagram,
    ...components,
  };
}

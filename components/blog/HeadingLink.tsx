import type { HTMLAttributes, ReactNode } from "react";
import { slugify } from "@/lib/slugify";
import { getTextFromReactNode } from "@/utils/react-node-text";

/** Prefer rehype-slug id when present; fall back to client-side slugify. */
function resolveId(provided: string | undefined, text: string): string {
  return provided && provided.length > 0 ? provided : slugify(text);
}

type HeadingLevel = 2 | 3 | 4 | 5 | 6;

const tagByLevel = {
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

interface HeadingLinkProps extends HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel;
  id?: string;
  className?: string;
  children?: ReactNode;
}

export default function HeadingLink({
  level,
  id: providedId,
  className,
  children,
  ...rest
}: HeadingLinkProps) {
  const Tag = tagByLevel[level];
  const text = getTextFromReactNode(children);
  const id = resolveId(providedId, text);

  return (
    <Tag
      id={id}
      className={`group/heading relative scroll-mt-28 ${className ?? ""}`}
      {...rest}
    >
      <a
        href={`#${id}`}
        className="absolute -left-5 top-1/2 -translate-y-1/2 font-mono text-sm text-accent/70 opacity-0 transition-fast hover:text-accent group-hover/heading:opacity-100 focus:opacity-100"
        aria-label={`Link to section: ${text}`}
      >
        #
      </a>
      {children}
    </Tag>
  );
}

"use client";

import type React from "react";

interface ObfuscatedContentProps {
  content: string;
  type?: "email" | "phone" | "text" | "link";
  href?: string;
  className?: string;
  children?: React.ReactNode;
  placeholder?: string;
  fakeContent?: string;
  onClick?: (decodedContent: string) => void;
  onContextMenu?: (e: React.MouseEvent) => void;
}

export default function ObfuscatedContent({
  content,
  type = "text",
  href,
  className,
  children,
  placeholder = "Loading...",
  fakeContent,
  onClick,
  onContextMenu,
}: ObfuscatedContentProps) {
  const isClient = typeof window !== "undefined";
  const decodedContent = isClient ? content : "";
  const displayContent = isClient
    ? children?.toString() || decodedContent
    : fakeContent || placeholder;

  // SSR + pre-hydration: placeholder only — real content after mount.
  if (!isClient) {
    return <span className={className}>{displayContent}</span>;
  }

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick(decodedContent);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    if (onContextMenu) {
      onContextMenu(e);
    } else {
      e.preventDefault();
    }
  };

  switch (type) {
    case "email":
      return (
        <a
          href={`mailto:${decodedContent}`}
          className={className}
          onClick={handleClick}
          onContextMenu={handleContextMenu}
        >
          {displayContent}
        </a>
      );

    case "phone":
      return (
        <a
          href={`tel:${decodedContent}`}
          className={className}
          onClick={handleClick}
          onContextMenu={handleContextMenu}
        >
          {displayContent}
        </a>
      );

    case "link":
      return (
        <a
          href={href || decodedContent}
          className={className}
          onClick={handleClick}
          onContextMenu={handleContextMenu}
          target="_blank"
          rel="noopener noreferrer"
        >
          {displayContent}
        </a>
      );

    default:
      return (
        <span
          className={className}
          onClick={handleClick}
          onContextMenu={handleContextMenu}
        >
          {displayContent}
        </span>
      );
  }
}

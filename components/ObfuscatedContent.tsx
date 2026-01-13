"use client";

import type React from "react";
import NoSSR from "./NoSSR";

interface ObfuscatedContentProps {
  content: string;
  type?: "email" | "phone" | "text" | "link";
  href?: string;
  className?: string;
  children?: React.ReactNode;
  placeholder?: string;
  fakeContent?: string; // Fake content for initial render
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
    ? (children?.toString() || decodedContent)
    : (fakeContent || placeholder);

  // On the server (and before hydration), render placeholder/fake content to reduce scraping.
  if (!isClient) {
    return (
      <NoSSR>
        <span className={className}>{displayContent}</span>
      </NoSSR>
    );
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

  // Render different elements based on type
  switch (type) {
    case "email":
      return (
        <NoSSR>
          <a
            href={`mailto:${decodedContent}`}
            className={className}
            onClick={handleClick}
            onContextMenu={handleContextMenu}
          >
            {displayContent}
          </a>
        </NoSSR>
      );

    case "phone":
      return (
        <NoSSR>
          <a
            href={`tel:${decodedContent}`}
            className={className}
            onClick={handleClick}
            onContextMenu={handleContextMenu}
          >
            {displayContent}
          </a>
        </NoSSR>
      );

    case "link":
      return (
        <NoSSR>
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
        </NoSSR>
      );

    default:
      return (
        <NoSSR>
          <span
            className={className}
            onClick={handleClick}
            onContextMenu={handleContextMenu}
          >
            {displayContent}
          </span>
        </NoSSR>
      );
  }
}

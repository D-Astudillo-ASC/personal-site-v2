"use client";

import { useState, useEffect } from "react";
import NoSSR from "./NoSSR";

interface ObfuscatedContentProps {
  content: string;
  type?: 'email' | 'phone' | 'text' | 'link';
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
  type = 'text',
  href,
  className, 
  children, 
  placeholder = "Loading...",
  fakeContent,
  onClick,
  onContextMenu
}: ObfuscatedContentProps) {
  const [decodedContent, setDecodedContent] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [displayContent, setDisplayContent] = useState<string>(fakeContent || placeholder);

  useEffect(() => {
    // Simple obfuscation: reverse the content and encode parts
    const obfuscated = content
      .split('')
      .reverse()
      .map(char => char.charCodeAt(0).toString(16))
      .join('');
    
    // Decode on client side
    const decoded = obfuscated
      .match(/.{1,2}/g)
      ?.map(hex => String.fromCharCode(parseInt(hex, 16)))
      .reverse()
      .join('') || content;
    
    setDecodedContent(decoded);
    setDisplayContent(children?.toString() || decoded);
    setIsVisible(true);
  }, [content, children]);

  if (!isVisible) {
    return (
      <NoSSR>
        <span className={className}>
          {displayContent}
        </span>
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
    case 'email':
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
    
    case 'phone':
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
    
    case 'link':
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
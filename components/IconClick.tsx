"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";

interface IconClickProps {
  icon: IconDefinition;
  href: string;
  label: string;
  className?: string;
}

export default function IconClick({ icon, href, label, className = "" }: IconClickProps) {
  return (
    <Link
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`text-text/70 hover:text-text transition-standard ${className}`}
      aria-label={label}
    >
      <FontAwesomeIcon icon={icon} className="w-4 h-4" />
    </Link>
  );
}

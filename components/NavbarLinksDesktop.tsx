"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants/navigation";
import ClientToggles from "./ClientToggles";

export default function NavbarLinksDesktop() {
  const pathname = usePathname();

  return (
    <ul className="hidden md:flex items-center gap-6">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`relative pb-1 text-sm font-medium transition-fast ${
                isActive ? "text-text" : "text-muted hover:text-text"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {link.label}
              {isActive ? (
                <span
                  className="absolute inset-x-0 -bottom-px h-px bg-accent"
                  aria-hidden="true"
                />
              ) : null}
            </Link>
          </li>
        );
      })}
      <li>
        <a
          href="/Daniel-Astudillo-Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-muted hover:text-text transition-fast"
        >
          Resume
        </a>
      </li>
      <li className="flex items-center gap-3 pl-4 border-l border-border">
        <ClientToggles />
      </li>
    </ul>
  );
}

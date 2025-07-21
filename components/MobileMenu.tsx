"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@/lib/fontawesome-icons";
import ThemeToggle from "@/components/theme/ThemeToggle";
import FontToggle from "@/components/font/FontToggle";
import { createPortal } from "react-dom";

interface NavLink {
  href: string;
  label: string;
  ariaLabel: string;
}

export default function MobileMenu({ navLinks }: { navLinks: ReadonlyArray<NavLink> }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dropdownContent = (
    <div
      className={`
        fixed left-0 right-0 top-0 bottom-0 z-[100] relative
        flex flex-col items-center justify-center
        backdrop-blur-lg bg-white/80 dark:bg-black/80
        border-y border-white/20 dark:border-black/20
        shadow-lg md:hidden
        transition-opacity duration-500
        ${isOpen ? "opacity-100 pointer-events-auto visible" : "opacity-0 pointer-events-none invisible"}
      `}
      suppressHydrationWarning
    >
      {/* Absolutely positioned close button at top right, always visible */}
      <button
        onClick={() => setIsOpen(false)}
        aria-label="Close menu"
        className="absolute top-0 right-0 p-2 m-2 focus:outline-none z-[200] bg-white shadow-lg rounded-full border border-gray-300 text-gray-900 hover:bg-gray-100"
      >
        <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
      </button>
      {/* Menu links */}
      <div className="w-full max-w-2xl mx-auto px-4">
        <ul className="py-8 flex flex-col items-center gap-4">
          {navLinks.map((link) => (
            <li key={link.href} className="w-full text-center">
              <Link
                href={link.href}
                className="block py-3 text-xl font-thin transition-standard cursor-pointer text-text/90 hover:text-gray-300 dark:hover:text-gray-600"
                aria-label={link.ariaLabel}
                onClick={() => setIsOpen(false)}
              >
                <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:transition-standard hover:after:w-full after:bg-gray-300 dark:after:bg-gray-600">
                  {link.label}
                </span>
                <span className="sr-only">{link.ariaLabel}</span>
              </Link>
            </li>
          ))}
          <li className="mt-4 px-4 w-full text-center">
            <a
              href="/Daniel-Astudillo-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 text-xl font-thin transition-colors duration-300 cursor-pointer text-text/80 hover:text-text bg-background/80 rounded shadow"
            >
              Resume
            </a>
          </li>
          <li className="mt-6 flex justify-center gap-4">
            <FontToggle />
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="relative" suppressHydrationWarning>
      {/* Hamburger menu button: only show when menu is closed */}
      {!isOpen && (
        <button
          className="p-2 text-text/70 hover:text-gray-300 dark:hover:text-gray-600 transition-standard absolute top-0 right-0 m-2 z-[101]"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
        </button>
      )}
      {/* Mobile Menu Dropdown (Portal) */}
      {mounted && createPortal(dropdownContent, document.body)}
    </div>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@/lib/fontawesome-icons";
import ThemeToggle from "@/components/theme/ThemeToggle";
import FontToggle from "@/components/font/FontToggle";
import { createPortal } from "react-dom";
import { useFont } from "@/app/providers/FontProvider";
import { navLinks } from "@/constants/navigation";

export default function Navbar(): JSX.Element {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { font } = useFont();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => pathname === path;

  const dropdownContent = (
    <div
      className={`
        fixed left-0 right-0 top-[calc(4rem+2rem)] z-[100]
        transition-slow
        backdrop-blur-md bg-white/10 dark:bg-black/10
        border-y border-white/20 dark:border-black/20
        shadow-lg md:hidden
        ${font === "helvetica" ? "font-helvetica" : font === "monospace" ? "font-mono" : "font-neue-montreal"}
        ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-2 invisible"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4">
        <ul className="py-4 flex flex-col items-center">
          {navLinks.map((link) => (
            <li key={link.href} className="w-full text-center">
              <Link
                href={link.href}
                className={`
                  block py-2 text-sm font-thin transition-standard cursor-pointer
                  ${
                    isActive(link.href)
                      ? "text-text"
                      : "text-text/70 hover:text-gray-300 dark:hover:text-gray-600"
                  }
                `}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span
                  className={`relative inline-block after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:transition-standard hover:after:w-full ${isActive(link.href) ? "after:w-full after:bg-current" : "after:bg-gray-300 dark:after:bg-gray-600"}`}
                >
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
          <li className="mt-2 px-4">
            <a
              href="/Daniel-Astudillo-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`
      block px-4 py-2 text-sm font-thin transition-colors duration-300 cursor-pointer
      text-text/70 hover:text-text
    `}
            >
              Resume
            </a>
          </li>
          <li className="mt-2 flex justify-center">
            <FontToggle />
          </li>
          <li className="mt-2 flex justify-center">
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <nav className="relative">
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8">
        <ul className="flex space-x-8 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`
                  relative py-2 text-lg font-thin transition-standard cursor-pointer
                  text-text/70 hover:text-gray-300 dark:hover:text-gray-600
                  after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 
                  after:transition-slow
                  hover:after:w-full hover:after:bg-gray-300 dark:hover:after:bg-gray-600
                  ${isActive(link.href) ? "after:w-full after:bg-current" : ""}
                `}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href="/Daniel-Astudillo-Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={`
            relative text-lg font-thin py-1 transition-standard cursor-pointer
            text-text/70 hover:text-gray-300 dark:hover:text-gray-600
            transition-standard cursor-pointer
            after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 
            after:transition-slow
            hover:after:w-full hover:after:bg-gray-300 dark:hover:after:bg-gray-600
          `}
        >
          Resume
        </a>
        <div className="flex items-center space-x-4 pl-4 border-l border-border/50">
          <FontToggle />
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-text/70 hover:text-gray-300 dark:hover:text-gray-600 transition-standard"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon
          icon={isMobileMenuOpen ? faXmark : faBars}
          className="w-5 h-5"
        />
      </button>

      {/* Mobile Menu Dropdown */}
      {mounted && createPortal(dropdownContent, document.body)}
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@/lib/fontawesome-icons";
import { createPortal } from "react-dom";
import { navLinks } from "@/constants/navigation";
import ClientToggles from "./ClientToggles";

export default function Navbar(): JSX.Element {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 

  const isActive = (path: string) => pathname === path;

  // Always render overlay, toggle classes for smooth fade transition
  const dropdownContent = (
    <div
      className={`
        fixed left-0 right-0 top-[calc(4rem+2rem)] bottom-0 z-[100]
        flex flex-col items-center justify-center
        bg-white/80 dark:bg-black/80
        backdrop-blur-lg md:backdrop-blur-lg backdrop-blur-none
        shadow-lg md:hidden
        transition-opacity duration-500
        ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
    >
      {/* Close (X) button at top right, same size/position as hamburger */}
      {/* <button
        onClick={() => setIsMobileMenuOpen(false)}
        aria-label="Close menu"
        className="p-2 text-text/70 hover:text-gray-300 dark:hover:text-gray-600 transition-standard absolute top-0 right-0 m-2 z-[101]"
      >
        <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
      </button> */}
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
            <ClientToggles />
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
            <ClientToggles />
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
      {isMobileMenuOpen && createPortal(dropdownContent, document.body)}
    </nav>
  );
}

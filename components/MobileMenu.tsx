"use client";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@/lib/fontawesome-icons";
import type { NavLink } from "@/types/navigation";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import ClientToggles from "./ClientToggles";

interface MobileMenuProps {
  navLinks: ReadonlyArray<NavLink>;
};

export default function MobileMenu({ navLinks }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();

  return (
    <div>
      <button
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <FontAwesomeIcon icon={isOpen ? faXmark : faBars} className="w-5 h-5" />
      </button>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: "104px",
            left: 0,
            right: 0,
            zIndex: 100,
            height: "calc(100vh - 104px)",
            background:
              resolvedTheme === "dark"
                ? "rgba(17,24,39,0.7)"
                : "rgba(255,255,255,0.6)",
            backdropFilter: "blur(32px) saturate(180%)",
            WebkitBackdropFilter: "blur(32px) saturate(180%)",
            border:
              resolvedTheme === "dark"
                ? "1.5px solid rgba(255,255,255,0.18)"
                : "1.5px solid rgba(0,0,0,0.12)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
            color: resolvedTheme === "dark" ? "white" : "black",
            overflowY: "auto",
          }}
          className="md:hidden"
        >
          <ul className="py-12 flex flex-col items-center space-y-8 w-full pb-32">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href} className="w-full text-center">
                  <Link
                    href={link.href}
                    className={`
                        block py-2 text-2xl font-thin transition-colors duration-200 cursor-pointer
                        hover:text-gray-700 dark:hover:text-gray-300
                        ${isActive ? "text-text dark:text-white" : "text-text/80"}
                      `}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="w-full text-center">
              <a
                href="/Daniel-Astudillo-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2 text-2xl font-thin transition-colors duration-200 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
              >
                Resume
              </a>
            </li>
            {/* Toggles are now part of the scrollable list */}
            <li className="flex justify-center space-x-2 mt-8 mb-8">
              <ClientToggles />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

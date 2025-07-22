"use client";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@/lib/fontawesome-icons";
import ThemeToggle from "@/components/theme/ThemeToggle";
import FontToggle from "@/components/font/FontToggle";
import type { NavLink } from "@/types/navigation";
import { usePathname } from "next/navigation";

type Props = {
  navLinks: ReadonlyArray<NavLink>;
};

export default function MobileMenu({ navLinks }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
          className="
            backdrop-blur-md
            fixed left-0 right-0 top-[88px] z-[100]
            flex flex-col items-center justify-center
            shadow-xl md:hidden
            pointer-events-auto
          "
        >
          <div className="max-w-7xl mx-auto px-4">
            <ul className="py-4 flex flex-col items-center">
              {navLinks.map((link) => {
                 const isActive = pathname === link.href;
                 return (
                    <li key={link.href} className="w-full text-center">
                    <Link
                        href={link.href}
                        className={`
                        block py-2 text-sm font-thin transition-colors duration-200 cursor-pointer
                        hover:text-gray-700 dark:hover:text-gray-300
                        ${isActive ? "font-bold after:w-full after:bg-current" : ""}`}
                        onClick={() => setIsOpen(false)}
                    >
                        <span
                        className={`
                            inline-block
                            after:absolute after:bottom-0 after:left-0 after:h-[1px]
                            after:transition-all after:duration-300
                            ${isActive ? "after:w-full after:bg-current" : "after:w-0"}
                            hover:after:w-full hover:after:bg-gray-700 dark:hover:after:bg-gray-300
                        `}
                        >
                        {link.label}
                        </span>
                    </Link>
                    </li>
                );
              })}
              <li className="mt-2 px-4">
                <a
                  href="/Daniel-Astudillo-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    block py-2 text-sm font-thin transition-colors duration-200 cursor-pointer
                    hover:text-gray-700 dark:hover:text-gray-300
                  `}
                >
                  <span
                    className="inline-block after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:transition-all after:duration-300 hover:after:w-full hover:after:bg-gray-700 dark:hover:after:bg-gray-300"
                  >
                    Resume
                  </span>
                </a>
              </li>
              <li className="mt-2 flex justify-center">
                <FontToggle />
                <ThemeToggle />
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
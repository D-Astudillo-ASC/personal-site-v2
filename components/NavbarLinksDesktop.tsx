"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants/navigation";
import ClientToggles from "./ClientToggles";

export default function NavbarLinksDesktop() {
  const pathname = usePathname();

  return (
    <ul className="hidden md:flex items-center space-x-8">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`
                block py-2 text-lg font-thin transition-colors duration-200 cursor-pointer
                relative
                hover:text-gray-700 dark:hover:text-gray-300
                after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0
                after:transition-all after:duration-300
                hover:after:w-full hover:after:bg-gray-700 dark:hover:after:bg-gray-300
                ${isActive ? "font-bold after:w-full after:bg-current" : ""}
              `}
            >
              <span className="relative z-10">{link.label}</span>
            </Link>
          </li>
        );
      })}
      {/* Resume Button */}
      <li>
        <a
          href="/Daniel-Astudillo-Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={`
            block py-2 text-lg font-thin transition-colors duration-200 cursor-pointer
            relative
            hover:text-gray-700 dark:hover:text-gray-300
            after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0
            after:transition-all after:duration-300
            hover:after:w-full hover:after:bg-gray-700 dark:hover:after:bg-gray-300
          `}
        >
          <span className="relative z-10">Resume</span>
        </a>
      </li>
      <li className="flex items-center space-x-4 pl-4 border-l border-border/50">
        <ClientToggles />
      </li>
    </ul>
  );
} 
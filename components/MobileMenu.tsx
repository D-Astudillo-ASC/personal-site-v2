"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants/navigation";
import ClientToggles from "./ClientToggles";

const RESUME_HREF = "/Daniel-Astudillo-Resume.pdf";
const MENU_TRANSITION_MS = 300;

function subscribeNoop() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export default function MobileMenu() {
  const [isMounted, setIsMounted] = useState(false);
  const [isPresented, setIsPresented] = useState(false);
  const [isIconOpen, setIsIconOpen] = useState(false);
  const hasPresentedRef = useRef(false);
  const isClient = useSyncExternalStore(
    subscribeNoop,
    getClientSnapshot,
    getServerSnapshot,
  );
  const pathname = usePathname();

  const isOpen = isMounted && isPresented;
  const showToggleAsOpen = isIconOpen;

  const openMenu = useCallback(() => {
    setIsIconOpen(true);
    setIsMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsPresented(true);
      });
    });
  }, []);

  const closeMenu = useCallback((instant = false) => {
    setIsIconOpen(false);
    setIsPresented(false);
    if (instant) {
      hasPresentedRef.current = false;
      setIsMounted(false);
    }
  }, []);

  useEffect(() => {
    if (isPresented) {
      hasPresentedRef.current = true;
      return;
    }

    if (!hasPresentedRef.current || !isMounted) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsMounted(false);
      setIsIconOpen(false);
      hasPresentedRef.current = false;
    }, MENU_TRANSITION_MS);

    return () => window.clearTimeout(timer);
  }, [isPresented, isMounted]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const onViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        closeMenu(true);
      }
    };
    mediaQuery.addEventListener("change", onViewportChange);
    return () => mediaQuery.removeEventListener("change", onViewportChange);
  }, [closeMenu]);

  useEffect(() => {
    const root = document.documentElement;

    if (isMounted) {
      root.setAttribute("data-mobile-menu-open", "");
    } else {
      root.removeAttribute("data-mobile-menu-open");
    }

    return () => root.removeAttribute("data-mobile-menu-open");
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMounted, closeMenu]);

  const overlay =
    isMounted &&
    isClient &&
    createPortal(
      <div
        className={`fixed inset-x-0 bottom-0 top-16 z-[100000] flex flex-col overflow-hidden bg-background text-text transition-[transform,opacity] duration-300 ease-smooth motion-reduce:transition-none md:hidden ${
          isPresented
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!isPresented}
      >
        <nav
          aria-label="Primary"
          className="flex-1 overflow-y-auto overscroll-contain px-6 py-6"
        >
          <ul className="m-0 flex list-none flex-col gap-1 p-0">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <li
                  key={link.href}
                  className={`transition-[transform,opacity] duration-300 ease-smooth motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
                    isPresented
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isPresented
                      ? `${80 + index * 40}ms`
                      : `${index * 25}ms`,
                  }}
                >
                  <Link
                    href={link.href}
                    aria-label={link.ariaLabel}
                    aria-current={isActive ? "page" : undefined}
                    className={`block py-3.5 font-medium transition-fast ${
                      isActive
                        ? "text-lg text-text"
                        : "text-lg text-muted hover:text-text"
                    }`}
                    onClick={() => closeMenu()}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li
              className={`mt-3 border-t border-border pt-3 transition-[transform,opacity] duration-300 ease-smooth motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
                isPresented
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
              style={{
                transitionDelay: isPresented
                  ? `${80 + navLinks.length * 40}ms`
                  : `${navLinks.length * 25}ms`,
              }}
            >
              <a
                href={RESUME_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-3.5 text-lg font-medium text-muted transition-fast hover:text-text"
                onClick={() => closeMenu()}
              >
                Resume ↗
              </a>
            </li>
          </ul>
        </nav>

        <footer
          className={`flex shrink-0 items-center gap-3 border-t border-border px-6 py-4 transition-[transform,opacity] duration-300 ease-smooth motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
            isPresented
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0"
          }`}
          style={{
            transitionDelay: isPresented ? "280ms" : "0ms",
          }}
        >
          <ClientToggles />
        </footer>
      </div>,
      document.body,
    );

  return (
    <>
      <button
        type="button"
        className={`inline-flex h-11 w-11 shrink-0 items-center justify-center text-muted transition-fast hover:text-text md:hidden ${
          showToggleAsOpen ? "text-text" : ""
        }`}
        aria-label={isMounted ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => (isMounted ? closeMenu() : openMenu())}
      >
        <span
          className="grid h-5 w-5 shrink-0 place-items-center"
          aria-hidden="true"
        >
          <span
            className={`col-start-1 row-start-1 h-0.5 w-5 origin-center rounded-full bg-current transition-all duration-300 ease-smooth motion-reduce:transition-none ${
              showToggleAsOpen
                ? "rotate-45"
                : "-translate-y-[6px] rotate-0"
            }`}
          />
          <span
            className={`col-start-1 row-start-1 h-0.5 w-5 origin-center rounded-full bg-current transition-all duration-300 ease-smooth motion-reduce:transition-none ${
              showToggleAsOpen
                ? "scale-x-0 opacity-0"
                : "scale-x-100 opacity-100"
            }`}
          />
          <span
            className={`col-start-1 row-start-1 h-0.5 w-5 origin-center rounded-full bg-current transition-all duration-300 ease-smooth motion-reduce:transition-none ${
              showToggleAsOpen
                ? "-rotate-45"
                : "translate-y-[6px] rotate-0"
            }`}
          />
        </span>
      </button>
      {overlay}
    </>
  );
}

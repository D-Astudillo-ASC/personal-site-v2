"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

    let currentPath = "";
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // Convert segment to readable label
      let label = segment.charAt(0).toUpperCase() + segment.slice(1);

      // Handle special cases
      if (segment === "welcome-to-my-blog") {
        label = "Welcome to My Blog";
      }

      breadcrumbs.push({
        label,
        href: currentPath,
        current: index === segments.length - 1,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (breadcrumbs.length <= 1) {
    return null;
  }

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <nav
      className="flex items-center space-x-2 text-sm font-thin text-text/60 mb-8"
      aria-label="Breadcrumb"
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center">
          {index > 0 && (
            <svg
              className="h-4 w-4 mx-2 text-text/40"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {breadcrumb.current ? (
            <span className="text-text/80 font-medium" aria-current="page">
              {breadcrumb.label}
            </span>
          ) : (
            <Link
              href={breadcrumb.href}
              className="hover:text-primary transition-colors"
            >
              {breadcrumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}

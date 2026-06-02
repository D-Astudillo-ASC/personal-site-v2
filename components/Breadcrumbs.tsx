"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useCallback } from "react";

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

export default function Breadcrumbs() {
  const pathname = usePathname();

  const generateBreadcrumbs = useCallback((): BreadcrumbItem[] => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

    let currentPath = "";
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // Convert slug-style segments into a readable, title-cased label
      const label = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      breadcrumbs.push({
        label,
        href: currentPath,
        current: index === segments.length - 1,
      });
    });

    return breadcrumbs;
  }, [pathname]);

  const breadcrumbs = useMemo(
    () => generateBreadcrumbs(),
    [generateBreadcrumbs],
  );

  // Don't show breadcrumbs on home page
  if (breadcrumbs.length <= 1) {
    return null;
  }

  // Generate BreadcrumbList structured data
  const breadcrumbListSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.label,
      item: `https://danielastudillo.io${breadcrumb.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbListSchema),
        }}
      />
      <nav
        className="mb-10 flex items-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted"
        aria-label="Breadcrumb"
      >
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={breadcrumb.href} className="flex items-center">
            {index > 0 && <span className="mx-2 text-muted/40">/</span>}
            {breadcrumb.current ? (
              <span className="text-text" aria-current="page">
                {breadcrumb.label}
              </span>
            ) : (
              <Link
                href={breadcrumb.href}
                className="transition-fast hover:text-accent"
              >
                {breadcrumb.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}

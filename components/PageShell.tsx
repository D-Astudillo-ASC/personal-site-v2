import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";

interface PageShellProps {
  children: ReactNode;
  maxWidth?: "2xl" | "4xl" | "5xl" | "6xl";
  className?: string;
}

const maxWidthClass: Record<NonNullable<PageShellProps["maxWidth"]>, string> = {
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
};

export default function PageShell({
  children,
  maxWidth = "6xl",
  className = "",
}: PageShellProps) {
  return (
    <div
      className={`mx-auto w-full ${maxWidthClass[maxWidth]} px-6 py-24 pt-32 ${className}`}
    >
      <Breadcrumbs />
      {children}
    </div>
  );
}

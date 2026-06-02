import Link from "next/link";
import { externalLinks } from "@/constants/navigation";
import IconClick from "./IconClick";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-6">
        <div className="flex flex-1 items-center">
          <Link
            href="/"
            aria-label="Daniel Astudillo — home"
            className="inline-flex transition-fast hover:opacity-80"
          >
            <span
              aria-hidden="true"
              className="select-none font-display text-2xl italic leading-none tracking-tight text-text"
            >
              DA<span className="text-accent">.</span>
            </span>
          </Link>
        </div>

        <p className="shrink-0 font-mono text-xs text-muted">
          © {year} Daniel Astudillo
        </p>

        <div className="flex flex-1 items-center justify-end gap-4">
          {externalLinks.map((link) => (
            <IconClick
              key={link.href}
              icon={link.icon}
              href={link.href}
              label={link.label}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}

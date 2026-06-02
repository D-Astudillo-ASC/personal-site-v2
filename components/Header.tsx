import Link from "next/link";
import Navbar from "./Navbar";
import { JSX } from "react";
import Logo from "@/components/Logo";

export default function Header(): JSX.Element {
  return (
    <header className="site-header fixed top-0 left-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md transition-standard">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          aria-label="Daniel Astudillo Home"
          className="flex items-center opacity-90 hover:opacity-100 transition-fast"
        >
          <Logo />
          <span className="sr-only">Daniel Astudillo Home</span>
        </Link>
        <Navbar />
      </div>
    </header>
  );
}

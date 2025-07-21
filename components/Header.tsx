import Link from "next/link";
import Navbar from "./Navbar";
import { JSX } from "react";
import Logo from "@/components/Logo";

export default function Header(): JSX.Element {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-transparent transition-standard backdrop-blur-sm shadow-md border-t border-gray-200 dark:border-gray-800 px-8 py-5">
      <div className="flex items-center justify-between w-full max-w-8xl mx-auto">
        <Link href="/" aria-label="Daniel Astudillo Home">
          <Logo />
          <span className="sr-only">Daniel Astudillo Home</span>
        </Link>
        <div className="flex items-center gap-8">
          <Navbar />
        </div>
      </div>
    </header>
  );
}

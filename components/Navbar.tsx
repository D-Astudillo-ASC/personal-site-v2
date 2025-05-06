import Link from "next/link";
import { JSX } from "react";

export default function Navbar(): JSX.Element {
  const linkClassName = "navbar-link";
  return (
    <nav>
      <ul className="flex space-x-8 list-none">
        <li>
          <Link href="/" className={linkClassName}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className={linkClassName}>
            About
          </Link>
        </li>
        <li>
          <Link href="/projects" className={linkClassName}>
            Projects
          </Link>
        </li>
        <li>
          <Link href="/contact" className={linkClassName}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

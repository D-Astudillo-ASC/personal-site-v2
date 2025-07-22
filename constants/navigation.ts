import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faCode } from "@fortawesome/free-solid-svg-icons";

export const navLinks = [
  { href: "/", label: "Home", ariaLabel: "Daniel Astudillo Home" },
  { href: "/about", label: "About", ariaLabel: "Daniel Astudillo About" },
  {
    href: "/projects",
    label: "Projects",
    ariaLabel: "Daniel Astudillo Projects",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  { href: "/contact", label: "Contact", ariaLabel: "Daniel Astudillo Contact" },
] as const;

export const externalLinks = [
  {
    href: "https://github.com/D-Astudillo-ASC",
    label: "GitHub",
    icon: faGithub,
    isExternal: true,
  },
  {
    href: "https://linkedin.com/in/daniel-m-astudillo",
    label: "LinkedIn",
    icon: faLinkedin,
    isExternal: true,
  },
  {
    href: "https://leetcode.com/dtm99",
    label: "LeetCode",
    icon: faCode,
    isExternal: true,
  },
  {
    href: "mailto:daniel.astudillo404@gmail.com",
    label: "Email",
    icon: faEnvelope,
    isExternal: true,
  },
] as const;

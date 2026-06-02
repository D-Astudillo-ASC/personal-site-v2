import { JSX } from "react";

export default function Logo(): JSX.Element {
  return (
    <span
      aria-hidden="true"
      className="select-none font-display text-3xl italic leading-none tracking-tight text-text"
    >
      DA<span className="text-accent">.</span>
    </span>
  );
}

"use client";

export default function Logo() {
  return (
    <div className="w-16 h-16">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        fill="none" // Make sure the fill also uses currentColor
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-current"
      >
        <ellipse cx="50" cy="50" rx="30" ry="12" transform="rotate(0 50 50)" />
        <ellipse cx="50" cy="50" rx="30" ry="12" transform="rotate(60 50 50)" />
        <ellipse
          cx="50"
          cy="50"
          rx="30"
          ry="12"
          transform="rotate(120 50 50)"
        />
        <line x1="35" y1="80" x2="65" y2="80" />
        <line x1="40" y1="88" x2="60" y2="88" />
        <line x1="45" y1="95" x2="55" y2="95" />
      </svg>
    </div>
  );
}

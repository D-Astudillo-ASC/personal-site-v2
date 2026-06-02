import type { ReactElement } from "react";

/** Open Graph image dimensions (standard 1.91:1). */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const BG = "#0C0C0C";
const TEXT = "#F2F0EC";
const MUTED = "#8A8A8A";
const ACCENT = "#F59E0B";

/**
 * Branded OG card. Dark, precise, amber accent — matches the site's identity.
 * Font-less by design so image generation never depends on a remote fetch.
 */
export function renderOgCard({
  title,
  eyebrow = "danielastudillo.io",
}: {
  title: string;
  eyebrow?: string;
}): ReactElement {
  // Scale the headline down for longer titles so they stay on a few lines.
  const titleSize = title.length > 60 ? 64 : title.length > 38 ? 78 : 96;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: BG,
        color: TEXT,
        padding: "72px 80px",
        borderTop: `8px solid ${ACCENT}`,
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 24,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: MUTED,
        }}
      >
        {eyebrow}
      </div>

      <div
        style={{
          display: "flex",
          fontSize: titleSize,
          fontWeight: 600,
          lineHeight: 1.05,
          letterSpacing: -1.5,
          maxWidth: 1000,
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 44,
            fontWeight: 600,
          }}
        >
          <span style={{ display: "flex" }}>DA</span>
          <span style={{ display: "flex", color: ACCENT }}>.</span>
          <span
            style={{
              display: "flex",
              marginLeft: 20,
              fontSize: 28,
              fontWeight: 400,
              color: MUTED,
            }}
          >
            Daniel Astudillo
          </span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 4,
            color: MUTED,
            textTransform: "uppercase",
          }}
        >
          Software Engineer · NYC
        </div>
      </div>
    </div>
  );
}

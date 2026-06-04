/**
 * Editorial config for /blog — start-here pillars and themed series.
 * BlogReadingGuide and series footers read from here (single source of truth).
 */

export type BlogSeriesId =
  | "mobile-platform"
  | "enterprise-platform"
  | "side-projects"
  | "earlier-work";

export interface BlogSeriesLink {
  slug: string;
  label: string;
}

export interface BlogSeries {
  id: BlogSeriesId;
  title: string;
  description: string;
  links: readonly BlogSeriesLink[];
}

/** Pillar essays — order is the “Start here” reading order on /blog. */
export const START_HERE_SLUGS = [
  "cutting-a-data-api-from-21s-to-250ms",
  "building-a-crdt-collaborative-editor",
  "lessons-from-building-a-mobile-events-social-platform",
] as const;

export const START_HERE_SLUG_SET = new Set<string>(START_HERE_SLUGS);

/**
 * Optional card/OG art for pillar essays (paths under /public).
 * Employer-adjacent / anonymized pillars intentionally omit art — case-study tone only.
 */
export const PILLAR_COVERS: Partial<
  Record<(typeof START_HERE_SLUGS)[number], string>
> = {
  "building-a-crdt-collaborative-editor": "/images/projects/personal-site-v2.avif",
};

/** Index + article chrome: employer-safe or coursework essays (no hero thumbnails). */
export function isCaseStudyPost(slug: string): boolean {
  const series = getSeriesForSlug(slug);
  if (!series) return false;
  return (
    seriesUsesCaseStudyDisclaimer(series.id) || series.id === "earlier-work"
  );
}

export const BLOG_SERIES: readonly BlogSeries[] = [
  {
    id: "mobile-platform",
    title: "Mobile platform",
    description:
      "Expo + Firebase archive — architecture, security, TestFlight, AI backends, and RN spikes.",
    links: [
      {
        label: "Architecture",
        slug: "lessons-from-building-a-mobile-events-social-platform",
      },
      {
        label: "Firebase security",
        slug: "securing-firebase-for-a-social-mobile-app",
      },
      { label: "TestFlight", slug: "shipping-an-expo-app-through-testflight" },
      { label: "Gemini + SSE", slug: "building-a-gemini-ai-backend-with-sse" },
      {
        label: "GPU vLLM",
        slug: "hosting-a-quantized-llm-on-gpu-websocket-vs-sse",
      },
      {
        label: "Expo sandboxes",
        slug: "expo-react-native-experiments",
      },
    ],
  },
  {
    id: "enterprise-platform",
    title: "Enterprise & platform",
    description:
      "Production-scale latency, microfrontends, and cross-stack messaging.",
    links: [
      {
        label: "21s → 250ms API",
        slug: "cutting-a-data-api-from-21s-to-250ms",
      },
      {
        label: "Microfrontends",
        slug: "building-a-microfrontend-data-platform",
      },
      {
        label: "AMQP ↔ JMS",
        slug: "bridging-amqps-and-jms-for-real-time-events",
      },
    ],
  },
  {
    id: "side-projects",
    title: "Side projects",
    description:
      "Bounded experiments — editor, audio, static landings, games, desktop utilities.",
    links: [
      {
        label: "CRDT editor",
        slug: "building-a-crdt-collaborative-editor",
      },
      {
        label: "Music visualizer",
        slug: "building-a-browser-music-visualizer-with-goose",
      },
      { label: "Astro + Bun", slug: "astro-bun-landing-template-experiment" },
      {
        label: "Perpetual Gems",
        slug: "building-perpetual-gems-jewelry-repair-site",
      },
      {
        label: "Roguelike + Vite",
        slug: "modernizing-a-winter-study-roguelike",
      },
      {
        label: "macOS wallpaper",
        slug: "macos-wallpaper-picker-unsplash",
      },
      {
        label: "npm supply chain",
        slug: "triaging-shai-hulud-and-npm-audit-on-nextjs",
      },
    ],
  },
  {
    id: "earlier-work",
    title: "Earlier work",
    description:
      "MERN through capstones, API exercises, coursework, and portfolio generations.",
    links: [
      {
        label: "First MERN deploy",
        slug: "first-mern-stack-production-deploy",
      },
      {
        label: "MERN capstone",
        slug: "team-mern-exam-workflow-capstone",
      },
      {
        label: "Public API dashboard",
        slug: "public-api-course-enrollment-dashboard",
      },
      {
        label: "MasterPlan",
        slug: "student-advisor-course-matching-simulator",
      },
      {
        label: "Portfolio v1 → v2",
        slug: "portfolio-v1-gatsby-to-next-v2",
      },
    ],
  },
] as const;

const SERIES_BY_SLUG = new Map<string, BlogSeries>(
  BLOG_SERIES.flatMap((series) =>
    series.links.map((link) => [link.slug, series] as const),
  ),
);

export function getSeriesForSlug(slug: string): BlogSeries | undefined {
  return SERIES_BY_SLUG.get(slug);
}

const EARLIER_WORK_SERIES = BLOG_SERIES.find((s) => s.id === "earlier-work");

/** Slugs in the “Earlier work” series — demoted on /blog when unfiltered. */
export const EARLIER_WORK_SLUGS = (EARLIER_WORK_SERIES?.links.map((l) => l.slug) ??
  []) as readonly string[];

export const EARLIER_WORK_SLUG_SET = new Set<string>(EARLIER_WORK_SLUGS);

/** Series that use the employer-safe case study disclaimer. */
export function seriesUsesCaseStudyDisclaimer(
  seriesId: BlogSeriesId,
): boolean {
  return seriesId === "mobile-platform" || seriesId === "enterprise-platform";
}

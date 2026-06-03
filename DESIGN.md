# DESIGN.md — Daniel Astudillo Personal Site v2

> **Source of truth** for the visual design system. All component styling decisions should trace back to this document.

---

## Product Context

- **What this is:** Personal portfolio + blog for Daniel Astudillo, a full-stack software engineer building high-performance financial systems (Visa, S&P Global).
- **Who it's for:** Senior engineering managers and technical recruiters at top-tier companies; technical collaborators; engineers searching the long-tail technical topics Daniel writes about.
- **Space/industry:** Engineering portfolio — peers include Linear, Oxide, Raycast, and other precision-forward developer tooling companies.
- **Project type:** Marketing site with blog capability.

---

## Brand

### Positioning

> **Daniel Astudillo — backend-first full-stack engineer who modernizes data-heavy products.**

NYC-based. Senior-scope work across APIs, data stores, and the platforms around them (Visa payment infrastructure, S&P Global DaaS and Data Studio). The memorable hook: **wrong tool on the hot path → replace → measure.** Targets senior full-stack and backend roles.

### Voice & Tone

- **Precise, not promotional.** State what was built, how, and the measured result. Numbers over adjectives ("21s → ~250ms", not "blazing fast").
- **Engineer-to-engineer.** Assume a technical reader. Explain the *why* and the trade-offs, not the basics.
- **Quietly confident.** The work signals seniority; the copy never has to claim it. No "rockstar", no "passionate about", no "open to work".
- **First person, active voice.** "I cut the query time", not "Query time was reduced".

### Do

- Lead with the system and the constraint it solved.
- Quote real metrics tied to real projects.
- Use NYC as an honest entity signal (schema `address`, natural mentions) — never as keyword bait.
- Keep the long-tail technical topics (BigQuery Storage Write API, CRDT sync, AMQPS↔JMS) front and center — that's the winnable SEO surface.

### Don't

- Don't chase the "Software Engineer NYC" head term — wrong intent, unwinnable.
- Don't stuff keywords in metadata or alt text.
- Don't use job-seeking language ("hire me", "available", "seeking opportunities").
- Don't decorate. No gradient blobs, no emoji in copy, no exclamation-driven hype.

### The Mark

- **Wordmark:** `DA.` — initials in Instrument Serif italic, with the period in the amber accent. Renders in `currentColor` for the letters so it adapts to theme; the accent dot is the one fixed brand color.
- **Favicon:** `app/icon.svg` — `DA.` reversed out of near-black (`#0C0C0C`) in a rounded square, cream letters, amber dot. Self-contained background so it reads on any browser chrome.
- **Never** reuse the old React-atom logo; the brand is the person, not the framework.

---

## Aesthetic Direction

- **Direction:** Dark + Precise — minimal decoration, high information density, confident negative space.
- **Decoration level:** Intentional. Every element earns its place. No gradient blobs, no floating shapes.
- **Mood:** The portfolio of an engineer who has shipped real systems that handle real money. Quiet confidence, not noise. A senior hiring manager should see this and think: *this person doesn't need to decorate mediocrity.*
- **Reference aesthetic:** Oxide Computer, Linear.app, are.na

---

## Typography

### Typeface Roles

| Role | Font | Rationale |
|------|------|-----------|
| Display/Hero | **Instrument Serif** (italic 400) | Humanist serif creates warmth and distinctiveness in an otherwise mono/sans world. The italic cut is the personality move. |
| Body/UI | **Geist** (variable 400–600) | Vercel's precision sans — technically sharp, highly legible at small sizes, designed for developer tooling. |
| Code/Labels | **JetBrains Mono** (variable 400–500) | The standard for serious engineering contexts. Used for tech tags, metadata labels, and code. |
| Font toggle alt | System mono fallback | Existing font toggle: `data-font="helvetica"` = Geist, `data-font="monospace"` = JetBrains Mono. |

### Type Scale

| Name | Size | Weight | Usage |
|------|------|--------|-------|
| Hero | `clamp(3.5rem, 11vw, 8rem)` | 400 italic (Instrument Serif) | Name in hero |
| H1 | `2.25rem` (36px) | 500 | Page titles (About, Contact, etc.) |
| Article title | `clamp(2.25rem, 6vw, 3.25rem)` | 400 italic (Instrument Serif) | Blog post titles in `ArticleHeader` |
| H2 | `1.5rem` (24px) | 500 | Section headings |
| H3 | `1.125rem` (18px) | 500 | Card titles |
| Body | `1rem` (16px) | 400 | Running prose |
| Small | `0.875rem` (14px) | 400 | Secondary content |
| Label | `0.75rem` (12px) | 500, `tracking-[0.15em]` | Metadata, overlines |
| Mono tag | `0.6875rem` (11px) | 400 | Technology tags |

### Loading

Loaded via `next/font/google` at build time — zero runtime requests to Google. Served from `/_next/static/media/` with immutable 1-year cache headers.

---

## Color System

### Approach

Restrained. One accent color (amber) used sparingly as an action signal — never decoratively. Surfaces are near-monochromatic. The accent should feel like a signal, not a decoration.

### Tokens

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--background-color` | `#F9F8F5` | `#0C0C0C` | Page background |
| `--surface-color` | `#F0EDE6` | `#151515` | Cards, elevated surfaces |
| `--text-color` | `#1A1A1A` | `#F2F0EC` | Primary text |
| `--muted-color` | `#6B6B6B` | `#8A8A8A` | Secondary text, metadata |
| `--border-color` | `rgba(0,0,0,0.10)` | `rgba(255,255,255,0.08)` | Dividers, card borders |
| `--accent-color` | `#D97706` | `#F59E0B` | CTAs, highlights, hover accents |

### Dark Mode Strategy

Dark mode is the default aesthetic. Light mode exists but is not the primary target. CSS variables swap via the `html.dark` class managed by `next-themes`.

---

## Spacing

- **Base unit:** 4px (Tailwind's default scale)
- **Density:** Comfortable — generous negative space signals quality
- **Page horizontal padding:** `px-6 md:px-12 lg:px-24`
- **Section vertical gap:** `py-20 md:py-28`
- **Card internal padding:** `p-6`
- **Max content width:** `max-w-6xl` (72rem / 1152px) for main content

---

## Layout

- **Approach:** Grid-disciplined. Everything aligns to columns.
- **Grid:** 12-column, `gap-8`
- **Max content width:** 72rem (1152px)
- **Border radius:** None on hero/section-level. `rounded` (4px) on tags. `rounded-lg` (8px) on cards. No pill shapes in UI unless it's a tag.
- **Header:** Fixed top, `h-16` (64px), backdrop blur, bottom border.
- **Footer:** Static (not fixed), border-top, minimal.

### Homepage Layout

Numbered section labels (`01 /`, `02 /`, …) use mono overlines with the index in accent.

```
┌─────────────────────────────────────────┐
│ HEADER (fixed, h-16)                    │
├─────────────────────────────────────────┤
│                                         │
│  HERO                                   │
│  [label]                                │
│  [NAME — Instrument Serif italic]       │
│  [role line — mono]                     │
│  [one-liner claim]                      │
│  [CTA] [secondary link]                 │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  01 / FEATURED PROJECTS                 │
│  [large card — 1 project]               │
│  [small card] [small card]              │
│  [view all →]                           │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  02 / WRITING                           │
│  [post row: title + excerpt | date]     │
│  [post row] [post row]                  │
│  [all writing →]                        │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  03 / ABOUT (stats-forward)             │
│  3 stat blocks + one-liner bio          │
│  [full story →]                         │
│                                         │
├─────────────────────────────────────────┤
│ FOOTER (static, minimal)                │
└─────────────────────────────────────────┘
```

### Blog Post Layout

At `lg+`, article body and TOC share a two-column grid (`blog-post-layout`). TOC rail is sticky; hidden when fewer than two headings.

```
┌──────────────────────────────────────────────────────────┐
│ HEADER (fixed, h-16)                                     │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ARTICLE (min-w-0)              │  TOC RAIL (13–14.5rem) │
│  [ArticleHeader]                │  On this page          │
│  [Mobile TOC — below lg]        │  — section links       │
│  [BlogDisclaimer — conditional] │  (sticky, scroll-spy)  │
│  [MDX prose]                    │                        │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  MORE IN {SERIES} (themed neighbors, guide order)        │
├──────────────────────────────────────────────────────────┤
│  OLDER / NEWER BY DATE (1 or 2 columns)                  │
│  [← Back to writing]                                     │
├──────────────────────────────────────────────────────────┤
│ FOOTER                                                   │
└──────────────────────────────────────────────────────────┘
```

---

## Motion

- **Approach:** Minimal-functional. Transitions signal state changes, never entertain.
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (Tailwind's default smooth)
- **Duration:**
  - `150ms` — hover state changes (color, opacity)
  - `200ms` — border/shadow changes
  - `300ms` — image zooms
  - `500ms` — page-level transitions (if any)
- **Never:** auto-playing animations, infinite spin, entrance animations that block reading

---

## Component Specs

### Hero

- Section: `min-h-screen`, centered vertically
- Label: `font-mono text-xs tracking-[0.2em] text-muted uppercase`
- Name: `font-display italic text-[clamp(3.5rem,11vw,8rem)] leading-[0.95] text-text`
- Role: `font-mono text-xs tracking-[0.15em] text-muted/70 uppercase`
- Claim: `text-base text-muted max-w-md`
- Primary CTA: `bg-accent text-stone-900 px-6 py-3 text-sm font-medium`
- Secondary link: `text-muted hover:text-text text-sm border-b border-transparent hover:border-muted/40`

### Header

- Height: `h-16`
- Background: `bg-background/90 backdrop-blur-md`
- Border: `border-b border-border`
- Logo: `DA.` text wordmark — `font-display text-3xl italic`, amber period (`Logo.tsx`)
- Nav links: `text-sm font-medium text-muted hover:text-text`
- Active: `text-text`

### Footer

- Layout: `border-t border-border py-8`
- NOT fixed — in normal document flow
- Copyright: `font-mono text-xs text-muted`
- Icons: `text-muted hover:text-text`

### Project Card

- Container: `bg-surface`, `border border-border`, `rounded-lg`, `hover:border-accent/25`, `hover:shadow-lg hover:shadow-text/5`
- Media: fixed aspect (`16/10` default, `16/9` large); image `object-cover` with subtle scale on hover; bottom gradient into surface
- No image: accent radial placeholder + mono “Case study” label (mobile archive)
- Highlight: `font-mono text-[11px] uppercase tracking-[0.14em] text-accent` (one measured line)
- Title: `font-display italic` with `group-hover:text-accent` (matches Writing rows)
- Description: `cardDescription` when set — `text-sm` / `line-clamp-2` (scannable, not paragraph dumps)
- Tech tags: `font-mono text-[11px] text-muted/80 bg-text/5 px-2 py-0.5 rounded ring-1 ring-border` (cap 4 default / 7 large)
- Footer: optional `Case study →` (`blogSlug`), external live (IconClick), GitHub — `border-t border-border`
- Primary click target: `liveUrl`, else `githubUrl`, else `/blog/{blogSlug}`; internal links do not use `target="_blank"`

### Writing (Blog)

**Routes:** `/blog` (index), `/blog/[slug]` (article). Nav label: **Writing**.

#### Blog index & homepage list

- Index uses `PageHeader` (`max-w-2xl`): label “Writing”, title “Notes & deep dives”.
- **Start here** (`BlogStartHere`): accent-tinted panel (`border-accent/25`, `bg-accent/5`) — three pillar essays in editorial order (numbered circles, display-italic titles). Config: `constants/blog.ts` → `START_HERE_SLUGS`.
- **How to read this** (`BlogReadingGuide`): neutral surface panel — four themed series with pill links to every essay in that spine. Same config file (`BLOG_SERIES`); chip labels are human-readable, not slug fragments.
- **Catalog list** (`BlogIndexClient`): tag filters (OR semantics via `?tag=`). When no tags are active, pillar slugs are **excluded** from the main list so they are not duplicated under Start here; filtering by tag can surface them again.
- Post rows: `divide-y divide-border border-y` — date + reading time in mono overline, title `text-2xl font-medium`, excerpt in muted body.
- Homepage writing rows: same divider pattern; titles use `font-display text-2xl italic` with accent hover (stronger editorial feel than the index).

#### Editorial config

- Single source: `constants/blog.ts` — pillars, series membership, series order, and which series require the case-study disclaimer (`mobile-platform`, `enterprise-platform` only).
- Post metadata: MDX `metadata` export; optional `dateModified` (ISO date) for materially updated essays. `featured` is derived from pillar membership, not set in frontmatter.

#### Syndication

- RSS 2.0 at `/feed.xml` (static route). Discovery via `alternates.types["application/rss+xml"]` on root layout and `/blog` metadata.

#### Article header

- Metadata: `font-mono text-[11px] uppercase tracking-[0.14em] text-muted` — published date; optional **Updated {date}** when `dateModified > date`; `/` reading time; optional **Start here** accent label on pillar posts.
- Title: Instrument Serif italic, `clamp(2.25rem, 6vw, 3.25rem)`, `text-balance`.
- Excerpt: `text-lg text-muted`.
- Tags: same pill pattern as project cards (`font-mono text-[11px]`, `ring-1 ring-border`).
- Bottom border: `border-b border-border pb-10`.

#### Case study disclaimer

- Shown only for posts in **Mobile platform** or **Enterprise & platform** series (employer-adjacent work). Side projects and earlier work omit it.
- Surface callout above prose: `rounded-lg border border-border bg-surface/60`.
- Overline: “Case study note” in accent mono (`text-[10px] uppercase`).
- Copy states generalized/anonymized nature of essays — not employer documentation.

#### MDX prose

Styling lives in `mdx-components.tsx` (not `@tailwindcss/typography` prose classes).

| Element | Treatment |
|---------|-----------|
| `h1` in body | `sr-only` — visible title is `ArticleHeader` only |
| `h2` / `h3` | `HeadingLink` with permalink `#` (absolute `-left-5`, opacity on hover/focus) |
| Body | `text-base leading-relaxed text-text/80`, `mb-5` |
| Links | Accent underline, `decoration-accent/40` |
| Inline code | Mono, `bg-text/5`, `ring-1 ring-border` |
| Blockquote | `border-l-2 border-accent`, italic muted |
| Tables | Rounded container, `ring-1 ring-border`, surface header row |
| Images | Next.js `Image`, `rounded-lg ring-1 ring-border` |

Section headings use `scroll-mt-28` for fixed header offset.

#### Code blocks

- Shiki via `rehype-pretty-code`; wrapper `CodeBlock` component.
- Figure: `rounded-xl border border-border/70 bg-surface`, language label + copy button in header bar.
- Highlighted lines: accent-tinted background + left border (`globals.css` `.line--highlighted`).
- Theme-aware token colors: `#f6f8fa` (light) / `#1c2128` (dark) code backgrounds.

#### Flow diagrams

- MDX compound component: `<FlowDiagram>`, `<FlowDiagram.Step>`, `<FlowDiagram.Fork>`, `<FlowDiagram.Connector>`.
- Container: subtle gradient surface, `rounded-xl border`, centered column layout.
- Steps: compact cards; `highlight` variant uses accent border/ring for the hot path.
- Connectors: vertical rules + optional mono caption — architecture diagrams, not decoration.

#### Table of contents

- Desktop: sticky right rail (`top-32`), “On this page” overline, left border with active link in accent.
- Mobile: collapsible block above disclaimer (`MobileTableOfContents`).
- Scroll-spy via `IntersectionObserver`; h3 entries indented.
- Omitted when fewer than two headings.

#### Series navigation

- `BlogSeriesNav` below prose (above date neighbors): `rounded-xl border border-border bg-surface/40`.
- Overline: “More in {series title}”; list of sibling posts in **guide order** (current slug excluded).
- Footer link inside panel: “← All writing by theme” → `/blog`.

#### Post navigation (by date)

- Older/newer cards in a split panel (`rounded-lg border bg-border gap-px`); chronological neighbors, independent of series.
- `aria-label`: “More writing by date”. Single neighbor spans full width.
- Titles: `font-display text-lg italic`, accent on hover.
- Footer link: “← Back to writing” in mono overline style.

---

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-05-31 | Instrument Serif italic for hero display | Adds warmth and personality; stands out from pure-sans engineering portfolios |
| 2026-05-31 | Amber accent (`#F59E0B` / `#D97706`) | Warm, energetic, uncommon in SWE portfolios; works on both dark/light |
| 2026-05-31 | Footer moved from `fixed` to static | Fixed footer causes content overlap; non-fixed is standard UX |
| 2026-05-31 | Geist replaces Helvetica Neue as body font | More technically distinctive; better screen rendering at small sizes |
| 2026-05-31 | JetBrains Mono for tech tags | Reinforces the engineering identity; signals precision |
| 2026-05-31 | Introduction cut from 3 paragraphs to stat blocks | Hiring managers spend <30s on first read; stats are faster to parse |
| 2026-05-31 | No gradient blobs, no decorative elements | Avoids AI-slop aesthetic; precision is the brand |
| 2026-06-01 | Writing as a first-class surface (homepage section + `/blog`) | Long-tail technical SEO and engineer-to-engineer credibility; blog is core product, not an appendix |
| 2026-06-01 | Instrument Serif for article titles | Extends display typography into long-form reading; pairs with mono metadata for hierarchy |
| 2026-06-01 | MDX-native `FlowDiagram` + Shiki code blocks | Diagrams and code are first-class content types; styled to match site tokens, not embedded widgets |
| 2026-06-01 | Absolute-positioned heading permalinks | `#` anchor must not shift heading text — body copy and h2/h3 left edges must align |
| 2026-06-01 | Case study disclaimer on anonymized posts | Sets reader expectations; keeps voice precise without implying official employer documentation |
| 2026-06-01 | Numbered homepage section labels (`01 /`, `02 /`, …) | Scannable rhythm across Featured → Writing → About without adding visual noise |
| 2026-06-03 | Start here + themed reading guide on `/blog` | Pillars get a dedicated entry path; series spine replaces “sort by date” as the mental model for 20 essays |
| 2026-06-03 | Accent panel for Start here vs neutral guide/catalog | Pillars read as “recommended”; guide and list stay in standard surface tokens |
| 2026-06-03 | Series footer + date footer on articles | Theme continuity without replacing reverse-chronological discovery |
| 2026-06-03 | Conditional case-study disclaimer | Only employer-adjacent series; side projects and coursework stay uncluttered |
| 2026-06-03 | `dateModified` in frontmatter, header, JSON-LD, sitemap | Signals refreshed long-form content to readers and crawlers without changing published date |
| 2026-06-03 | RSS at `/feed.xml` | Syndication for readers and aggregators; complements sitemap for discovery |

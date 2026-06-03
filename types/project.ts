export interface Project {
  id: string;
  title: string;
  description: string;
  /** Shorter copy for cards; falls back to description when omitted. */
  cardDescription?: string;
  technologies: string[];
  /** One measurable outcome — shown on cards, not adjectives. */
  highlight?: string;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  /** Internal writing deep-dive (e.g. /blog/slug). Shown as “Read case study”. */
  blogSlug?: string;
  featured?: boolean;
}

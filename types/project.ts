export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  /** One measurable outcome — shown on cards, not adjectives. */
  highlight?: string;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

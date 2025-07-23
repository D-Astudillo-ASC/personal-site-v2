export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export const posts: BlogPost[] = [
  {
    slug: "welcome-to-my-blog",
    title: "Welcome to My Blog",
    date: "2025-07-22",
    excerpt:
      "An introduction to my new blog, what to expect, and why I'm starting to write about my journey as a software engineer.",
    content: `
      <p>Hi, I'm Daniel Astudillo! Welcome to my new blog. Here, I'll share insights from my projects, career journey, and thoughts on software engineering and technology.</p>
      <p>Expect posts about building scalable applications, lessons learned at Visa and Wayfair, and tips for fellow developers. Stay tuned for more!</p>
    `,
  },
];

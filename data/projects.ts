import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "personal-site",
    title: "Personal Website v1",
    description: "The first iteration of my personal website built with Gatsby, GraphQL, React, and CSS.",
    technologies: ["Gatsby.js", "GraphQL", "React", "CSS"],
    imageUrl: "/images/projects/personal-site.png",
    liveUrl: "https://danielastudillo.com",
    githubUrl: "https://github.com/D-Astudillo-ASC/personal-site",
    featured: true,
  },
  {
    id: "personal-site-v2",
    title: "Personal Website v2",
    description: "Current iteration of my personal website built with Next.js, TypeScript, and Tailwind CSS. Features a dark mode toggle and font switcher.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    imageUrl: "/images/projects/personal-site.png",
    liveUrl: "https://danielastudillo.com",
    githubUrl: "https://github.com/D-Astudillo-ASC/personal-site-v2",
    featured: true,
  },
  {
    id: "project-2",
    title: "Project 2",
    description: "Description of project 2. Add your project details here.",
    technologies: ["React", "Node.js", "MongoDB"],
    imageUrl: "/images/projects/project-2.png",
    liveUrl: "https://project2.com",
    githubUrl: "https://github.com/username/project-2",
  },
  {
    id: "project-3",
    title: "Project 3",
    description: "Description of project 3. Add your project details here.",
    technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
    imageUrl: "/images/projects/project-3.png",
    liveUrl: "https://project3.com",
    githubUrl: "https://github.com/username/project-3",
  },
]; 
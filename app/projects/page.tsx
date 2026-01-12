import { projects } from "@/data/projects";
import dynamic from 'next/dynamic';
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

const ProjectCard = dynamic(() => import('@/components/projects/ProjectCard'));

export const metadata: Metadata = {
  title: "Daniel Astudillo | Software Engineer | Projects",
  description: "Software Engineer portfolio featuring Visa Card Eligibility Service, Visa Digital Benefits Platform, and modern web applications. Built with React, TypeScript, Spring Boot, and .NET Core.",
  keywords: [
    "Daniel Astudillo Projects",
    "Visa Card Eligibility Service Project",
    "Visa Digital Benefits Platform Project",
    "Software Engineer Portfolio",
    "Software Developer Portfolio",
    "React Projects",
    "TypeScript Projects",
    "Spring Boot Projects",
    ".NET Core Projects",
    "Next.js Projects",
    "Payment Systems Projects",
    "Full Stack Developer Projects",
    "Web Development Portfolio"
  ],
  alternates: {
    canonical: "https://danielastudillo.io/projects",
  },
  openGraph: {
    title: "Daniel Astudillo | Software Engineer | Projects",
    description: "Software Engineer portfolio featuring Visa Card Eligibility Service, Visa Digital Benefits Platform, and modern web applications.",
    url: "https://danielastudillo.io/projects",
  },
};

export default function Projects() {
  return (
    <div className="container mx-auto px-4 py-16 pt-27">
      <Breadcrumbs />
      <h1 className="mb-8 text-2xl sm:text-3xl md:text-4xl font-thin">Projects by Daniel Astudillo</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

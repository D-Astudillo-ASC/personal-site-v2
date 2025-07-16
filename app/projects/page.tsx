import { projects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Daniel Astudillo",
  description: "Explore Daniel Astudillo's portfolio of software projects, including full-stack applications, web development, and innovative solutions.",
};

export default function Projects() {
  return (
    <div className="container mx-auto px-4 py-16 pt-27">
      <h1 className="mb-8 text-4xl font-thin">Projects I&apos;ve Worked On</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

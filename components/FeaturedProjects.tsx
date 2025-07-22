import React from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import { Project } from "@/types/project";

interface FeaturedProjectsProps {
  featuredProjects: Project[];
}

const FeaturedProjects = React.memo(({ featuredProjects }: FeaturedProjectsProps) => {
  return (
    <section className="px-4 md:px-16 lg:px-24">
      <div className="container mx-auto">
        <h2 className="mb-8 text-2xl sm:text-3xl md:text-4xl font-extralight">Featured Projects</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {featuredProjects.map((project: Project, idx: number) => (
            <ProjectCard
              key={project.id}
              project={project}
              priority={idx === 0}
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href="/projects"
            className="relative inline-block text-lg font-thin px-6 py-2 rounded border border-border/50 text-text/70 hover:text-text transition-standard cursor-pointer hover-scale"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
});

export default FeaturedProjects; 
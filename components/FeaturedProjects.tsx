import React from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import { Project } from "@/types/project";
import Link from "next/link";

interface FeaturedProjectsProps {
  featuredProjects: Project[];
}

const FeaturedProjects = React.memo(
  ({ featuredProjects }: FeaturedProjectsProps) => {
    const [featured, ...rest] = featuredProjects;

    return (
      <section className="px-6 py-20 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          {/* Section heading */}
          <div className="mb-10 flex items-baseline justify-between">
            <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-muted">
              <span className="text-accent">01</span>
              <span className="px-2 text-muted/40">/</span>
              Selected Work
            </h2>
            <Link
              href="/projects"
              className="font-mono text-xs text-muted/60 hover:text-text transition-fast"
            >
              All projects →
            </Link>
          </div>

          {/* Featured (large) card — below a full-height hero, so loaded lazily */}
          {featured && (
            <div className="mb-6">
              <ProjectCard project={featured} size="large" />
            </div>
          )}

          {/* Secondary cards */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {rest.map((project: Project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  },
);

FeaturedProjects.displayName = "FeaturedProjects";
export default FeaturedProjects;

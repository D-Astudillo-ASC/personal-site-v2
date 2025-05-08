"use client";

import { Project } from "@/types/project";
import Image from "next/image";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";
import IconClick from "../IconClick";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-border/50 bg-background p-6 transition-all duration-300 hover:border-text">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-2xl font-medium tracking-tight text-text">{project.title}</h3>
        <p className="mb-4 flex-1 text-sm font-thin text-text/80">
          {project.description}
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-text/5 px-3 py-1 text-xs font-medium text-text/70 ring-1 ring-text/10 transition-all duration-300 hover:bg-text/10 hover:text-text hover:ring-text/20"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {project.githubUrl && (
            <IconClick
              icon={faGithub}
              href={project.githubUrl}
              label={`View ${project.title} on GitHub`}
              className="h-5 w-5"
            />
          )}
          {project.liveUrl && (
            <IconClick
              icon={faExternalLink}
              href={project.liveUrl}
              label={`Visit ${project.title} live site`}
              className="h-5 w-5"
            />
          )}
        </div>
      </div>
    </div>
  );
} 
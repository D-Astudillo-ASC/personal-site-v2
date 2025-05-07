"use client";

import { Project } from "@/types/project";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-transparent backdrop-blur-sm">
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
              className="rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-text"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text/80 hover:text-text"
            >
              <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text/80 hover:text-text"
            >
              <FontAwesomeIcon icon={faExternalLink} className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
} 
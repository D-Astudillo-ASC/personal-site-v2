import { Project } from "@/types/project";
import Image from "next/image";
import { faGithub, faExternalLink } from "@/lib/fontawesome-icons";
import IconClick from "../IconClick";
import React from "react";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

const ProjectCard = React.memo(function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const hasImage = !!project.imageUrl;

  // Map image URLs to their actual dimensions
  const imageDimensions: Record<string, { width: number; height: number }> = {
    "/images/projects/vces.avif": { width: 1200, height: 581 },
    "/images/projects/vdbp.avif": { width: 1200, height: 627 },
    "/images/projects/personal-site-v2.avif": { width: 1200, height: 544 },
    "/images/projects/personal-site-v1.avif": { width: 1200, height: 425 },
    "/images/projects/click-to-pay.avif": { width: 1201, height: 541 },
    "/images/projects/roguelike-game.avif": { width: 1200, height: 640 },
  };
  const imgDims = project.imageUrl ? imageDimensions[project.imageUrl] : undefined;

  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg border border-border/50 bg-background md:transition-slow md:hover:border-text md:hover:shadow-lg md:hover:shadow-text/5 md:hover-lift">
      {/* Image Container */}
      <div className="group relative w-full overflow-hidden bg-gray-100 dark:bg-gray-800 md:bg-gradient-to-br md:from-gray-100 md:to-gray-200 md:dark:from-gray-800 md:dark:to-gray-900 md:transition-slow md:hover:shadow-lg md:hover:shadow-text/5 md:hover-lift">
        {/* Project Image */}
        {hasImage && imgDims && (
          <Image
            src={project.imageUrl!}
            alt={`${project.title} by Daniel Astudillo - ${project.description} - Built with ${project.technologies.join(', ')}`}
            width={imgDims.width}
            height={imgDims.height}
            priority={priority}
            fetchPriority={priority ? "high" : "auto"}
            quality={30}
            className="object-cover w-full h-auto md:transition-slower md:group-hover:scale-110 md:group-hover:brightness-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        {/* No Image Fallback */}
        {!hasImage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-text/50">
              <div className="text-6xl">🚀</div>
            </div>
          </div>
        )}
        {/* Project Links Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 md:transition-slow md:  group-hover:opacity-100">
          <div className="flex gap-4">
            {project.githubUrl && (
              <IconClick
                icon={faGithub}
                href={project.githubUrl}
                label={`View ${project.title} on GitHub`}
                className="h-8 w-8 rounded-full bg-white/90 p-2 text-black shadow-lg md:transition-fast md:hover:bg-white md:hover:scale-110"
              />
            )}
            {project.liveUrl && (
              <IconClick
                icon={faExternalLink}
                href={project.liveUrl}
                label={`Visit ${project.title} live site`}
                className="h-8 w-8 rounded-full bg-white/90 p-2 text-black shadow-lg md:transition-fast md:hover:bg-white md:hover:scale-110"
              />
            )}
          </div>
        </div>
      </div>
      {/* Content Section */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-2xl font-medium tracking-tight text-text">
          {project.title}
        </h3>
        <p className="mb-4 flex-1 text-lg font-thin text-text/80 leading-relaxed">
          {project.description}
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-text/5 px-3 py-1 text-xs font-medium text-text/70 ring-1 ring-text/10 md:transition-slow md:hover:bg-text/10 md:hover:text-text md:hover:ring-text/20 md:hover:scale-105"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

export default ProjectCard;
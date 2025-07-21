import { Project } from "@/types/project";
import Image from "next/image";
import { faGithub, faExternalLink } from "@/lib/fontawesome-icons";
import IconClick from "../IconClick";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const hasImage = !!project.imageUrl;

  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg border border-border/50 bg-background md:transition-slow hover:border-text hover:shadow-lg hover:shadow-text/5 md:hover-lift">
      {/* Image Container */}
      <div className="group relative h-48 w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        {/* Project Image */}
        {hasImage && (
          <Image
            src={project.imageUrl!}
            alt={project.title}
            fill
            priority={priority}
            quality={70}
            className="object-cover opacity-100 md:transition-slower md:group-hover:scale-110 md:group-hover:brightness-110"
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
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-slow group-hover:opacity-100">
          <div className="flex gap-4">
            {project.githubUrl && (
              <IconClick
                icon={faGithub}
                href={project.githubUrl}
                label={`View ${project.title} on GitHub`}
                className="h-8 w-8 rounded-full bg-white/90 p-2 text-black shadow-lg transition-fast hover:bg-white hover:scale-110"
              />
            )}
            {project.liveUrl && (
              <IconClick
                icon={faExternalLink}
                href={project.liveUrl}
                label={`Visit ${project.title} live site`}
                className="h-8 w-8 rounded-full bg-white/90 p-2 text-black shadow-lg transition-fast hover:bg-white hover:scale-110"
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
}
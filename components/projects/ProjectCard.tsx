import { Project } from "@/types/project";
import Image from "next/image";
import Link from "next/link";
import { faGithub, faExternalLink } from "@/lib/fontawesome-icons";
import IconClick from "../IconClick";
import React from "react";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  size?: "default" | "large";
}

const imageDimensions: Record<string, { width: number; height: number }> = {
  "/images/projects/vces.avif": { width: 1200, height: 581 },
  "/images/projects/vdbp.avif": { width: 1200, height: 627 },
  "/images/projects/personal-site-v2.avif": { width: 1200, height: 544 },
  "/images/projects/personal-site-v1.avif": { width: 1200, height: 425 },
  "/images/projects/click-to-pay.avif": { width: 1201, height: 541 },
  "/images/projects/roguelike-game.avif": { width: 1200, height: 640 },
};

const ProjectCard = React.memo(function ProjectCard({
  project,
  priority = false,
  size = "default",
}: ProjectCardProps) {
  const hasImage = !!project.imageUrl;
  const imgDims = project.imageUrl ? imageDimensions[project.imageUrl] : undefined;
  const isLarge = size === "large";
  const hasLive = !!project.liveUrl;
  const hasGithub = !!project.githubUrl;
  const primaryHref = project.liveUrl ?? project.githubUrl;
  const primaryIsExternal = hasLive;
  const showFooterLinks = hasLive && hasGithub;

  const cardBody = (
    <>
      {hasImage && imgDims ? (
        <div
          className={`relative w-full overflow-hidden bg-surface ${isLarge ? "h-72 md:h-96" : "h-48 md:h-56"}`}
        >
          <Image
            src={project.imageUrl!}
            alt={`${project.title} — ${project.description}`}
            width={imgDims.width}
            height={imgDims.height}
            quality={isLarge ? 60 : 40}
            className="h-full w-full object-cover transition-slower group-hover:scale-[1.03] group-hover:brightness-[1.04]"
            sizes={
              isLarge
                ? "(max-width: 768px) 100vw, 70vw"
                : "(max-width: 768px) 100vw, 50vw"
            }
            {...(priority ? { priority: true } : { loading: "lazy" as const })}
          />
        </div>
      ) : (
        <div
          className={`flex items-center justify-center bg-surface ${isLarge ? "h-40" : "h-28"}`}
        >
          <span className="font-mono text-xs tracking-widest text-muted/40 uppercase">
            No preview
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5">
        {project.highlight ? (
          <p className="font-mono text-[11px] tracking-[0.12em] text-accent uppercase">
            {project.highlight}
          </p>
        ) : null}

        <h3
          className={`font-medium text-text transition-fast group-hover:text-accent ${isLarge ? "text-lg" : "text-base"}`}
        >
          {project.title}
        </h3>

        <p className="flex-1 text-sm leading-relaxed text-muted line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, isLarge ? 8 : 5).map((tech) => (
            <span
              key={tech}
              className="rounded bg-text/5 px-2 py-0.5 font-mono text-[11px] tracking-wide text-muted/70 ring-1 ring-border transition-fast group-hover:text-text"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-standard hover:border-text/15 hover:shadow-lg hover:shadow-text/5">
      {primaryHref ? (
        <Link
          href={primaryHref}
          target={primaryIsExternal ? "_blank" : undefined}
          rel={primaryIsExternal ? "noopener noreferrer" : undefined}
          className="flex flex-1 flex-col rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={`View ${project.title}${primaryIsExternal ? " (opens in new tab)" : ""}`}
        >
          {cardBody}
        </Link>
      ) : (
        <div className="flex flex-1 flex-col">{cardBody}</div>
      )}

      {showFooterLinks ? (
        <div className="flex items-center gap-2 border-t border-border px-5 py-3">
          {project.liveUrl ? (
            <IconClick
              icon={faExternalLink}
              href={project.liveUrl}
              label={`${project.title} live`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted ring-1 ring-border transition-fast hover:bg-text/5 hover:text-text"
            />
          ) : null}
          {project.githubUrl ? (
            <IconClick
              icon={faGithub}
              href={project.githubUrl}
              label={`${project.title} on GitHub`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted ring-1 ring-border transition-fast hover:bg-text/5 hover:text-text"
            />
          ) : null}
        </div>
      ) : null}
    </article>
  );
});

export default ProjectCard;

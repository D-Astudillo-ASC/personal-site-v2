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

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

const ProjectCard = React.memo(function ProjectCard({
  project,
  priority = false,
  size = "default",
}: ProjectCardProps) {
  const hasImage = !!project.imageUrl;
  const imgDims = project.imageUrl ? imageDimensions[project.imageUrl] : undefined;
  const isLarge = size === "large";
  const cardCopy = project.cardDescription ?? project.description;

  const primaryHref =
    project.liveUrl ?? project.githubUrl ?? (project.blogSlug ? `/blog/${project.blogSlug}` : undefined);
  const primaryIsExternal = primaryHref ? isExternalHref(primaryHref) : false;

  const hasLive = !!project.liveUrl;
  const hasGithub = !!project.githubUrl;
  const hasBlog = !!project.blogSlug;
  const showFooterLinks =
    (hasLive && hasGithub) || (hasBlog && (hasLive || hasGithub)) || (hasGithub && hasBlog);

  const cardBody = (
    <>
      {hasImage && imgDims ? (
        <div
          className={`relative w-full overflow-hidden bg-surface ${isLarge ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-[16/10]"}`}
        >
          <Image
            src={project.imageUrl!}
            alt=""
            width={imgDims.width}
            height={imgDims.height}
            quality={isLarge ? 65 : 45}
            className="h-full w-full object-cover transition-slower group-hover:scale-[1.02] group-hover:brightness-[1.06]"
            sizes={
              isLarge
                ? "(max-width: 768px) 100vw, 70vw"
                : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
            {...(priority ? { priority: true } : { loading: "lazy" as const })}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent opacity-90"
            aria-hidden="true"
          />
        </div>
      ) : (
        <div
          className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-surface via-background to-surface ${isLarge ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-[16/10]"}`}
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--accent-color) 18%, transparent), transparent 55%)",
            }}
            aria-hidden="true"
          />
          <span className="relative font-mono text-[10px] tracking-[0.2em] text-muted/50 uppercase">
            Case study
          </span>
        </div>
      )}

      <div className={`flex flex-1 flex-col ${isLarge ? "gap-4 p-6 md:p-7" : "gap-3 p-5"}`}>
        {project.highlight ? (
          <p className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase">
            {project.highlight}
          </p>
        ) : null}

        <h3
          className={`font-display italic leading-snug text-text transition-fast group-hover:text-accent text-balance ${
            isLarge ? "text-2xl md:text-3xl" : "text-xl"
          }`}
        >
          {project.title}
        </h3>

        <p
          className={`flex-1 leading-relaxed text-muted ${isLarge ? "text-base line-clamp-3" : "text-sm line-clamp-2"}`}
        >
          {cardCopy}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {project.technologies.slice(0, isLarge ? 7 : 4).map((tech) => (
            <span
              key={tech}
              className="rounded bg-text/5 px-2 py-0.5 font-mono text-[11px] text-muted/80 ring-1 ring-border"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > (isLarge ? 7 : 4) ? (
            <span className="px-1 font-mono text-[11px] text-muted/50">
              +{project.technologies.length - (isLarge ? 7 : 4)}
            </span>
          ) : null}
        </div>
      </div>
    </>
  );

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface transition-standard hover:border-accent/25 hover:shadow-lg hover:shadow-text/5">
      {primaryHref ? (
        <Link
          href={primaryHref}
          target={primaryIsExternal ? "_blank" : undefined}
          rel={primaryIsExternal ? "noopener noreferrer" : undefined}
          className="flex min-h-0 flex-1 flex-col rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={`View ${project.title}${primaryIsExternal ? " (opens in new tab)" : ""}`}
        >
          {cardBody}
        </Link>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col">{cardBody}</div>
      )}

      {showFooterLinks ? (
        <div className="flex flex-wrap items-center gap-2 border-t border-border bg-background/40 px-5 py-3">
          {project.blogSlug ? (
            <Link
              href={`/blog/${project.blogSlug}`}
              className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-fast hover:text-accent"
            >
              Case study →
            </Link>
          ) : null}
          {project.liveUrl && isExternalHref(project.liveUrl) ? (
            <IconClick
              icon={faExternalLink}
              href={project.liveUrl}
              label={`${project.title} live`}
              className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md text-muted ring-1 ring-border transition-fast hover:bg-text/5 hover:text-text"
            />
          ) : project.liveUrl ? (
            <Link
              href={project.liveUrl}
              className="ml-auto font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-fast hover:text-accent"
            >
              Live →
            </Link>
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

import { Experience } from "@/types/experience";
import { formatDate } from "@/utils/date";

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const dateRange = `${formatDate(experience.startDate)} — ${
    experience.endDate ? formatDate(experience.endDate) : "Present"
  }`;

  return (
    <article className="relative border-l border-border pl-6 sm:pl-8">
      {/* Timeline node */}
      <span
        aria-hidden="true"
        className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-background"
      />

      {/* Overline: date range + location */}
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        {dateRange}
        <span className="mx-2 text-muted/40">/</span>
        {experience.location}
      </p>

      {/* Role + company */}
      <h3 className="mt-2 text-xl font-medium text-text sm:text-2xl">
        {experience.title}
      </h3>
      <p className="mt-0.5 text-sm text-muted">{experience.company}</p>

      {/* Description */}
      <ul className="mt-4 space-y-2">
        {experience.description.map((item, index) => (
          <li
            key={index}
            className="relative pl-4 text-sm leading-relaxed text-muted before:absolute before:left-0 before:text-accent before:content-['–']"
          >
            {item}
          </li>
        ))}
      </ul>

      {/* Technologies */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {experience.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded bg-text/5 px-2 py-0.5 font-mono text-[11px] text-muted/80 ring-1 ring-border transition-fast hover:text-text"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}

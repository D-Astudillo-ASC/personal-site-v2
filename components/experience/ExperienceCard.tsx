import { Experience } from "@/types/experience";
import { formatDate } from "@/utils/date";

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="group relative rounded-lg border border-border/50 bg-background/50 p-4 sm:p-6 transition-slow hover:border-text hover-lift">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-2xl sm:text-3xl font-medium text-text">{experience.title}</h3>
        <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap sm:items-start gap-2 sm:gap-4 text-lg sm:text-xl text-text/80 text-left">
          <div className="flex flex-row items-center gap-2 text-left">
            <span className="font-thin">{experience.company}</span>
            <span className="hidden sm:inline text-xl text-text/40">•</span>
            <span className="font-thin">{experience.location}</span>
            <span className="hidden sm:inline text-xl text-text/40">•</span>
            <span className="font-thin">
              {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Present'}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <ul className="mb-6 list-inside list-disc space-y-2 text-text/80">
        {experience.description.map((item, index) => (
          <li key={index} className="text-base sm:text-lg font-extralight leading-relaxed">{item}</li>
        ))}
      </ul>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2">
        {experience.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-text/5 px-2 sm:px-3 py-1 text-xs font-medium text-text/70 ring-1 ring-text/10 transition-slow hover:bg-text/10 hover:text-text hover:ring-text/20"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
} 
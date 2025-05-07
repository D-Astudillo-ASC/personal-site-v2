import { Experience } from "@/types/experience";
import { formatDate } from "@/utils/date";

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="group relative">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-medium text-text">{experience.title}</h3>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-text/80">
          <span className="font-medium">{experience.company}</span>
          <span>•</span>
          <span className="font-light italic">{experience.location}</span>
          <span>•</span>
          <span>
            {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Present'}
          </span>
        </div>
      </div>

      {/* Description */}
      <ul className="mb-4 list-inside list-disc space-y-1 text-text/80">
        {experience.description.map((item, index) => (
          <li key={index} className="text-sm">{item}</li>
        ))}
      </ul>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2">
        {experience.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full outline px-3 py-1 text-xs font-medium text-text"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
} 
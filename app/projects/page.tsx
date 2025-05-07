import { projects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";
// import FontWrapper from "@/components/font/FontWrapper";

export default function Projects() {
  return (
    <div className="container mx-auto px-4 py-16 pt-27">
      <h1 className="mb-8 text-4xl font-light">Projects</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

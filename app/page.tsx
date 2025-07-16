import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import Introduction from "@/components/Introduction";

export default function Home() {
  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="flex min-h-[80vh] flex-col items-center justify-center px-4 md:px-16 lg:px-24" role="banner">
        <h1 className="mb-4 text-center text-7xl font-extralight animate-pulse">
          Daniel Astudillo
        </h1>
        <p className="mb-8 text-center text-2xl font-thin text-text/70 animate-pulse">
          Software Engineer
        </p>
        <div className="flex gap-4">
          <Link
            href="/projects"
            className="relative text-lg font-thin px-6 py-2 rounded border border-border/50 bg-text text-background transition-standard cursor-pointer hover:bg-text/90 hover-scale"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="relative text-lg font-thin px-6 py-2 rounded border border-border/50 text-text/70 hover:text-text transition-standard cursor-pointer hover-scale"
          >
            Contact Me
          </Link>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="px-4 md:px-16 lg:px-24">
        <div className="container mx-auto">
          <h2 className="mb-8 text-4xl font-extralight">Featured Projects</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/projects"
              className="relative inline-block text-lg font-thin px-6 py-2 rounded border border-border/50 text-text/70 hover:text-text transition-standard cursor-pointer hover-scale"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-4 py-16 md:px-16 lg:px-24">
        <div className="container mx-auto max-w-3xl">
          <h2 className="mb-8 text-4xl font-extralight">About Me</h2>
          <Introduction isOpenToWork={true} />
          <div className="mt-8 text-center">
            <Link
              href="/about"
              className="relative inline-block text-lg font-thin px-6 py-2 rounded border border-border/50 text-text/70 hover:text-text transition-standard cursor-pointer hover-scale"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

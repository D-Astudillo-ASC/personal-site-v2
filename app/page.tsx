import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";

export default function Home() {
  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, 2);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-16 md:px-16 lg:px-24">
        <h1 className="mb-4 text-center text-6xl font-extralight animate-pulse">
          Daniel Astudillo
        </h1>
        <p className="mb-8 text-center text-xl font-thin text-gray-600 dark:text-gray-400">
          Software Engineer
        </p>
        <div className="flex gap-4">
          <Link
            href="/projects"
            className="rounded-full border border-border bg-border px-6 py-2 text-sm font-medium text-background outline outline-1 outline-border transition-colors hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-border px-6 py-2 text-sm font-medium text-text outline outline-1 outline-border transition-colors hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Contact Me
          </Link>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="px-4 py-16 md:px-16 lg:px-24">
        <div className="container mx-auto">
          <h2 className="mb-8 text-3xl font-light">Featured Projects</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/projects"
              className="inline-block rounded-full border border-border px-6 py-2 text-sm font-medium text-text outline outline-1 outline-border transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Brief About Section */}
      <section className="px-4 py-16 md:px-16 lg:px-24">
        <div className="container mx-auto max-w-3xl">
          <h2 className="mb-8 text-3xl font-extralight">About Me</h2>
          <p className="mb-4">
            I&#39;m a software engineer passionate about building beautiful and
            functional web applications. With expertise in modern web
            technologies, I create seamless user experiences and robust
            solutions.
          </p>
          <div className="mt-8 text-center">
            <Link
              href="/about"
              className="inline-block rounded-full border border-border px-6 py-2 text-sm font-medium text-text outline outline-1 outline-border transition-colors hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

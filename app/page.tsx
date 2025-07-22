import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from '@/components/projects/ProjectCard';
import Introduction from '@/components/Introduction';
import type { Metadata } from "next";
import Head from "next/head";

// Force static generation for better performance
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Daniel Astudillo | Software Engineer",
  description: "Software Engineer with 3+ years experience building scalable applications at Visa and Wayfair. Expert in React, TypeScript, Node.js, Spring Boot, and .NET Core.",
};

export default function Home() {
  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, 3)

  // Find the LCP image (first featured project)
  const lcpProject = featuredProjects[0];
  const lcpImageBase = encodeURIComponent(lcpProject.imageUrl || '');
  const lcpImageDesktop = `/_next/image?url=${lcpImageBase}&w=1200&q=70`;
  const lcpImageMobile = `/_next/image?url=${lcpImageBase}&w=750&q=70`;

  return (
    <>
      <Head>
        <link
          rel="preload"
          as="image"
          href={lcpImageDesktop}
          imageSrcSet={`${lcpImageMobile} 750w, ${lcpImageDesktop} 1200w`}
          imageSizes="(max-width: 768px) 100vw, 50vw"
        />
      </Head>
      <div className="flex min-h-screen flex-col">
        {/* Hero Section with LCP Image */}
        <section className="flex min-h-[80vh] flex-col items-center justify-center px-4 md:px-16 lg:px-24" role="banner">
          <h1 className="mb-4 text-center text-4xl sm:text-7xl font-extralight md:animate-pulse">
            Daniel Astudillo
          </h1>
          <p className="mb-8 text-center text-2xl font-thin text-text/70 md:animate-pulse">
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
              {featuredProjects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} priority={idx === 0} />
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
                aria-label="Daniel Astudillo About"
                className="relative inline-block text-lg font-thin px-6 py-2 rounded border border-border/50 text-text/70 hover:text-text transition-standard cursor-pointer hover-scale"
              >
                Learn More
                <span className="sr-only">Daniel Astudillo About</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

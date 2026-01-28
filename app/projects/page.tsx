import { projects } from "@/data/projects";
import dynamic from 'next/dynamic';
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

const ProjectCard = dynamic(() => import('@/components/projects/ProjectCard'));

export const metadata: Metadata = {
  title: "Projects | Daniel Astudillo - Software Engineer",
  description:
    "A selection of work across payments, platforms, and modern web apps — built with React/TypeScript, Next.js, Node.js, Java/Spring Boot, and .NET.",
  keywords: [
    "Daniel Astudillo Projects",
    "Visa Card Eligibility Service Project",
    "Visa Digital Benefits Platform Project",
    "Software Engineer Portfolio",
    "Software Developer Portfolio",
    "React Projects",
    "TypeScript Projects",
    "Spring Boot Projects",
    ".NET Core Projects",
    "Next.js Projects",
    "Payment Systems Projects",
    "Full Stack Developer Projects",
    "Web Development Portfolio"
  ],
  alternates: {
    canonical: "https://danielastudillo.io/projects",
  },
  openGraph: {
    title: "Projects | Daniel Astudillo - Software Engineer",
    description:
      "A selection of work across payments, platforms, and modern web apps.",
    url: "https://danielastudillo.io/projects",
    type: "website",
  },
};

export default function Projects() {
  // Structured data to make this page distinct from homepage
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://danielastudillo.io/projects",
    "url": "https://danielastudillo.io/projects",
    "name": "Projects | Daniel Astudillo - Software Engineer",
    "description": "A selection of work across payments, platforms, and modern web apps — built with React/TypeScript, Next.js, Node.js, Java/Spring Boot, and .NET.",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": projects.length,
      "itemListElement": projects.map((project, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "CreativeWork",
          "name": project.title,
          "description": project.description,
        },
      })),
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://danielastudillo.io",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Projects",
          "item": "https://danielastudillo.io/projects",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <div className="container mx-auto px-4 py-16 pt-27">
        <Breadcrumbs />
        <h1 className="mb-3 text-2xl sm:text-3xl md:text-4xl font-thin">Projects</h1>
        <p className="mb-8 text-lg font-thin text-text/70 leading-relaxed max-w-3xl">
          A few things I’ve built across payments, platforms, and product experiences.
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </>
  );
}

import { projects } from "@/data/projects";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import ProjectCard from "@/components/projects/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work by Daniel Astudillo — high-performance financial systems, real-time pipelines, and full-stack products built with React/TypeScript, .NET Core, Spring Boot, and PostgreSQL.",
  alternates: {
    canonical: "https://danielastudillo.io/projects",
  },
  openGraph: {
    title: "Projects — Daniel Astudillo",
    description:
      "High-performance financial systems, real-time pipelines, and full-stack products.",
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
    "name": "Projects — Daniel Astudillo",
    "description": "Selected work by Daniel Astudillo — high-performance financial systems, real-time pipelines, and full-stack products built with React/TypeScript, .NET Core, Spring Boot, and PostgreSQL.",
    "isPartOf": { "@id": "https://danielastudillo.io/#website" },
    "author": { "@id": "https://danielastudillo.io/#person" },
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
      <PageShell>
        <PageHeader
          label="Projects"
          title="Selected work"
          description="Systems I've built across payments, financial data, and real-time products — with the constraints they solved and the results they shipped."
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              priority={index === 0}
            />
          ))}
        </div>
      </PageShell>
    </>
  );
}

import Link from "next/link";
import { projects } from "@/data/projects";
import Introduction from "@/components/Introduction";
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";

// Force static generation for better performance
export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

// Calculate LCP image URLs for metadata
const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
const lcpProject = featuredProjects[0];
const lcpImageBase = encodeURIComponent(lcpProject.imageUrl || "");
const lcpImageDesktop = `/_next/image?url=${lcpImageBase}&w=1200&q=70`;
const lcpImageMobile = `/_next/image?url=${lcpImageBase}&w=750&q=70`;

export const metadata: Metadata = {
  title: "Daniel Astudillo - Software Engineer | Portfolio & Experience",
  description:
    "Daniel Astudillo is a Software Engineer with 3+ years experience building scalable applications at Visa and Wayfair. Expert in React, TypeScript, Node.js, Spring Boot, and .NET Core. View portfolio, projects, and contact information.",
  alternates: {
    canonical: "https://danielastudillo.io",
  },
  openGraph: {
    url: "https://danielastudillo.io",
    type: "website",
    title: "Daniel Astudillo - Software Engineer | Portfolio & Experience",
    description: "Daniel Astudillo is a Software Engineer with 3+ years experience at Visa and Wayfair. Expert in React, TypeScript, Spring Boot, and .NET Core.",
    siteName: "Daniel Astudillo Portfolio",
    locale: "en_US",
    images: [
      {
        url: "https://danielastudillo.io/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Daniel Astudillo - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Astudillo - Software Engineer | Portfolio & Experience",
    description: "Daniel Astudillo is a Software Engineer with 3+ years experience at Visa and Wayfair. Expert in React, TypeScript, Spring Boot, and .NET Core.",
    creator: "@danielastudillo",
    images: ["https://danielastudillo.io/images/og-image.png"],
  },
};

export default function Home() {
  return (
    <>
      {/* LCP Image Preload with imageSrcSet - App Router hoists this to <head> */}
      <link
        rel="preload"
        as="image"
        href={lcpImageDesktop}
        imageSrcSet={`${lcpImageMobile} 750w, ${lcpImageDesktop} 1200w`}
        imageSizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="flex min-h-screen flex-col">
        <Hero />
        <FeaturedProjects featuredProjects={featuredProjects} />
        <section className="px-4 py-16 md:px-16 lg:px-24">
          <div className="container mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl sm:text-3xl md:text-4xl font-extralight">
              About Me
            </h2>
            <Introduction isOpenToWork={true} />
            <div className="mt-8 text-center">
              <Link
                href="/about"
                aria-label="About Daniel Astudillo"
                className="relative inline-block text-lg font-thin px-6 py-2 rounded border border-border/50 text-text/70 hover:text-text transition-standard cursor-pointer hover-scale"
              >
                About Daniel Astudillo
                <span className="sr-only">About Daniel Astudillo</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

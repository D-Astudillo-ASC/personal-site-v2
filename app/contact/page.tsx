import { Metadata } from "next";
import dynamic from 'next/dynamic';
import Breadcrumbs from "@/components/Breadcrumbs";

const ContactForm = dynamic(() => import('@/components/ContactForm'));

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Want to collaborate, talk shop, or discuss an opportunity? Send a note — I’m open to high-impact full-stack work (React/TypeScript, Next.js, Java/Spring Boot, .NET).",
  keywords: [
    "Contact Daniel Astudillo",
    "Hire Software Engineer",
    "Full Stack Developer Hire",
    "React Developer Contact",
    "TypeScript Developer",
    "Next.js Developer",
    "Spring Boot Developer",
    ".NET Developer",
    "Software Engineer Opportunities",
    "Software Developer Opportunities",
    "Software Engineer Contact",
    "Software Developer Contact",
    "Technical Collaboration",
    "Development Projects"
  ],
  alternates: {
    canonical: "https://danielastudillo.io/contact",
  },
  openGraph: {
    title: "Contact",
    description:
      "Want to collaborate, talk shop, or discuss an opportunity? Send a note.",
    url: "https://danielastudillo.io/contact",
  },
};

export default function Contact() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-16 pt-32">
      <Breadcrumbs />
      {/* Header Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-2xl sm:text-4xl md:text-5xl font-extralight">
          Contact
        </h1>
        <p className="text-xl font-thin text-text/70 leading-relaxed max-w-2xl mx-auto">
          Want to collaborate, talk shop, or discuss an opportunity? Feel free to reach
          out — I read every message.
        </p>
      </section>

      <ContactForm isOpenToWork={true} />

      {/* Additional Info */}
      <section className="mt-16 text-center">
        <div className="max-w-2xl mx-auto p-8 rounded-lg border border-border/30 bg-background/30">
          <h3 className="text-lg sm:text-xl md:text-2xl font-light mb-4">Let&apos;s Work Together</h3>
          <p className="text-lg font-thin text-text/70 leading-relaxed">
            Whether you have a project in mind, want to discuss potential opportunities,
            or just want to connect, I&apos;d love to hear from you. I&apos;m particularly interested
            in high-impact, full-stack development roles and innovative projects.
          </p>
        </div>
      </section>
    </div>
  );
}
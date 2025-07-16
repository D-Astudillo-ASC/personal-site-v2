import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Daniel Astudillo",
  description: "Get in touch with Daniel Astudillo for collaborations, opportunities, or to discuss software development projects.",
};

export default function Contact() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-16 pt-32">
      {/* Header Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-5xl font-extralight">Get In Touch</h1>
        <p className="text-xl font-thin text-text/70 leading-relaxed max-w-2xl mx-auto">
          I&apos;m always excited to connect with fellow developers, discuss potential collaborations, 
          or just chat about technology. Feel free to reach out through any of the channels below.
        </p>
      </section>

      <ContactForm />

      {/* Additional Info */}
      <section className="mt-16 text-center">
        <div className="max-w-2xl mx-auto p-8 rounded-lg border border-border/30 bg-background/30">
          <h3 className="text-2xl font-light mb-4">Let&apos;s Work Together</h3>
          <p className="text-lg font-thin text-text/70 leading-relaxed">
            Whether you have a project in mind, want to discuss potential opportunities, 
            or just want to connect, I&apos;d love to hear from you. I&apos;m particularly interested 
            in full-stack development roles, open source collaborations, and innovative projects.
          </p>
        </div>
      </section>
    </div>
  );
}
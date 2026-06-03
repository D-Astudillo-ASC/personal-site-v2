import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Daniel Astudillo — a full-stack engineer in New York. Happy to talk shop about performance, distributed systems, payments, or compare notes on something you're building.",
  alternates: {
    canonical: "https://danielastudillo.io/contact",
  },
  openGraph: {
    title: "Contact — Daniel Astudillo",
    description:
      "Talk shop about performance, distributed systems, and building reliable software with Daniel Astudillo.",
    url: "https://danielastudillo.io/contact",
  },
};

export default function Contact() {
  return (
    <PageShell maxWidth="5xl">
      <PageHeader
        label="Contact"
        title="Daniel Astudillo"
        description="Working on something interesting — a performance problem, a distributed-systems puzzle, a real-time feature? I'd genuinely like to hear about it. I read every message."
        className="mb-16"
      />

      <ContactForm isOpenToWork={false} />
    </PageShell>
  );
}

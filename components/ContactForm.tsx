"use client";

import { useState, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapMarkerAlt,
  faCheck,
  faExclamationTriangle,
  faLinkedin as faLinkedinBrand,
} from "@/lib/fontawesome-icons";
// import {
//   faGithub as faGithubBrand
// } from "@/lib/fontawesome-icons";
import ObfuscatedContent from "./ObfuscatedContent";

interface ContactFormProps {
  isOpenToWork?: boolean;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // Honeypot field
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
}

export default function ContactForm({ isOpenToWork }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // Honeypot field - always empty
  });

  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  // Debounce form data updates to reduce input delay
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const debouncedSetFormData = useCallback((newData: FormData) => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setFormData(newData);
    }, 100); // 100ms debounce
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus({ type: "loading" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: result.message || "Message sent successfully!",
        });
        // Reset form on success
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          website: "", // Reset honeypot field
        });
      } else {
        setStatus({
          type: "error",
          message: result.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    debouncedSetFormData(newData);

    // Clear error status when user starts typing
    if (status.type === "error") {
      setStatus({ type: "idle" });
    }
  };

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.subject.trim() &&
    formData.message.trim();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      {/* Contact Information */}
      <section className="space-y-8">
        <h2 className="text-3xl font-extralight mb-8">Contact Information</h2>

        {/* Email */}
        <div className="flex items-start gap-4 p-6 rounded-lg border border-border/30 bg-background/50 hover:bg-background/80 transition-slow hover-lift">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-text/10 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="h-5 w-5 text-text/70"
            />
          </div>
          <div>
            <h3 className="text-xl font-light mb-1">Email</h3>
            <ObfuscatedContent
              content="daniel.astudillo404@gmail.com"
              type="email"
              fakeContent="contact@danielastudillo.io"
              className="text-lg font-thin text-text/70 mb-2 hover:text-text transition-standard"
            >
              daniel.astudillo404@gmail.com
            </ObfuscatedContent>
            <p className="text-sm font-thin text-text/50">
              I typically respond in ≤ 2 hours
            </p>
          </div>
        </div>

        {/* LinkedIn */}
        <div className="flex items-start gap-4 p-6 rounded-lg border border-border/30 bg-background/50 hover:bg-background/80 transition-slow hover-lift">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-text/10 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faLinkedinBrand}
              className="h-5 w-5 text-text/70"
            />
          </div>
          <div>
            <h3 className="text-xl font-light mb-1">LinkedIn</h3>
            <a
              href="https://linkedin.com/in/daniel-m-astudillo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-thin text-text/70 hover:text-text transition-standard"
            >
              linkedin.com/in/daniel-m-astudillo
            </a>
            <p className="text-sm font-thin text-text/50">
              Connect for professional opportunities
            </p>
          </div>
        </div>

        {/* GitHub */}
        {/* TODO: I'm not actively contributing to open source projects at the moment. Bring this back when I start pushing interesting projects to my GitHub. */}
        {/* <div className="flex items-start gap-4 p-6 rounded-lg border border-border/30 bg-background/50 hover:bg-background/80 transition-slow hover-lift">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-text/10 flex items-center justify-center">
            <FontAwesomeIcon icon={faGithubBrand} className="h-5 w-5 text-text/70" />
          </div>
          <div>
            <h3 className="text-xl font-light mb-1">GitHub</h3>
            <a 
              href="https://github.com/D-Astudillo-ASC" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg font-thin text-text/70 hover:text-text transition-standard"
            >
              github.com/D-Astudillo-ASC
            </a>
            <p className="text-sm font-thin text-text/50">Check out my open source contributions</p>
          </div>
        </div> */}

        {/* Location */}
        <div className="flex items-start gap-4 p-6 rounded-lg border border-border/30 bg-background/50 hover:bg-background/80 transition-slow hover-lift">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-text/10 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="h-5 w-5 text-text/70"
            />
          </div>
          <div>
            <h3 className="text-xl font-light mb-1">Location</h3>
            <p className="text-lg font-thin text-text/70 mb-2">
              {" "}
              NYC Metropolitan Area{" "}
            </p>
            {isOpenToWork && (
              <p className="text-sm font-thin text-text/50">
                Open to onsite, hybrid, and remote opportunities.{" "}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="space-y-8">
        <h2 className="text-3xl font-extralight mb-8">Send a Message</h2>

        {/* Status Messages */}
        {status.type === "success" && (
          <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <FontAwesomeIcon
              icon={faCheck}
              className="h-5 w-5 text-green-600 dark:text-green-400"
            />
            <p className="text-green-800 dark:text-green-200 font-thin">
              {status.message}
            </p>
          </div>
        )}

        {status.type === "error" && (
          <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="h-5 w-5 text-red-600 dark:text-red-400"
            />
            <p className="text-red-800 dark:text-red-200 font-thin">
              {status.message}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-light text-text/70 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={status.type === "loading"}
                className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-lg text-text font-thin focus:outline-none focus:border-text/50 focus:bg-background/80 transition-fast disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-light text-text/70 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={status.type === "loading"}
                className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-lg text-text font-thin focus:outline-none focus:border-text/50 focus:bg-background/80 transition-fast disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-light text-text/70 mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              disabled={status.type === "loading"}
              className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-lg text-text font-thin focus:outline-none focus:border-text/50 focus:bg-background/80 transition-fast disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-light text-text/70 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              disabled={status.type === "loading"}
              className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-lg text-text font-thin focus:outline-none focus:border-text/50 focus:bg-background/80 transition-fast resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Tell me about your project, opportunity, or just say hello!"
            />
          </div>

          {/* Honeypot field - hidden from users but visible to bots */}
          <div className="absolute left-[-9999px] opacity-0 pointer-events-none">
            <label htmlFor="website" className="sr-only">
              Website
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!isFormValid || status.type === "loading"}
              className="px-8 py-4 bg-text text-background text-lg font-thin rounded border border-border/50 hover:bg-text/90 transition-standard hover-scale focus:outline-none focus:ring-2 focus:ring-text/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-text"
            >
              {status.type === "loading" ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

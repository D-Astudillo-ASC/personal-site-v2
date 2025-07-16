"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, 
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import { 
  faLinkedin as faLinkedinBrand,
  faGithub as faGithubBrand
} from "@fortawesome/free-brands-svg-icons";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      {/* Contact Information */}
      <section className="space-y-8">
        <h2 className="text-3xl font-extralight mb-8">Contact Information</h2>
        
        {/* Email */}
        <div className="flex items-start gap-4 p-6 rounded-lg border border-border/30 bg-background/50 hover:bg-background/80 transition-slow hover-lift">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-text/10 flex items-center justify-center">
            <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 text-text/70" />
          </div>
          <div>
            <h3 className="text-xl font-light mb-1">Email</h3>
            <p className="text-lg font-thin text-text/70 mb-2">daniel.astudillo404@gmail.com</p>
            <p className="text-sm font-thin text-text/50">I typically respond in ≤ 2 hours</p>
          </div>
        </div>

        {/* LinkedIn */}
        <div className="flex items-start gap-4 p-6 rounded-lg border border-border/30 bg-background/50 hover:bg-background/80 transition-slow hover-lift">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-text/10 flex items-center justify-center">
            <FontAwesomeIcon icon={faLinkedinBrand} className="h-5 w-5 text-text/70" />
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
            <p className="text-sm font-thin text-text/50">Connect for professional opportunities</p>
          </div>
        </div>

        {/* GitHub */}
        <div className="flex items-start gap-4 p-6 rounded-lg border border-border/30 bg-background/50 hover:bg-background/80 transition-slow hover-lift">
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
        </div>

        {/* Location */}
        <div className="flex items-start gap-4 p-6 rounded-lg border border-border/30 bg-background/50 hover:bg-background/80 transition-slow hover-lift">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-text/10 flex items-center justify-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="h-5 w-5 text-text/70" />
          </div>
          <div>
            <h3 className="text-xl font-light mb-1">Location</h3>
            <p className="text-lg font-thin text-text/70 mb-2"> NYC Metropolitan Area </p>
            <p className="text-sm font-thin text-text/50">Open to onsite, hybrid, and remote opportunities. </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="space-y-8">
        <h2 className="text-3xl font-extralight mb-8">Send a Message</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-light text-text/70 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-lg text-text font-thin focus:outline-none focus:border-text/50 focus:bg-background/80 transition-fast"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-light text-text/70 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-lg text-text font-thin focus:outline-none focus:border-text/50 focus:bg-background/80 transition-fast"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-light text-text/70 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-lg text-text font-thin focus:outline-none focus:border-text/50 focus:bg-background/80 transition-fast"
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-light text-text/70 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-background/50 border border-border/30 rounded-lg text-text font-thin focus:outline-none focus:border-text/50 focus:bg-background/80 transition-fast resize-none"
              placeholder="Tell me about your project, opportunity, or just say hello!"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-4 bg-text text-background text-lg font-thin rounded border border-border/50 hover:bg-text/90 transition-standard hover-scale focus:outline-none focus:ring-2 focus:ring-text/50 cursor-pointer"
            >
              Send Message
            </button>
          </div>
        </form>
      </section>
    </div>
  );
} 
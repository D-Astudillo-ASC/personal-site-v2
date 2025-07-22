"use client";

import { useEffect, useRef } from "react";

export default function StructuredData() {
  const scriptRef = useRef<HTMLScriptElement>(null);

  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Daniel Astudillo",
      jobTitle: "Software Engineer",
      description:
        "Software Engineer with 3+ years experience building scalable applications at Visa and Wayfair. Expert in React, TypeScript, Node.js, Spring Boot, and .NET Core.",
      url: "https://danielastudillo.io",
      email: "daniel.astudillo404@gmail.com",
      sameAs: [
        "https://linkedin.com/in/daniel-m-astudillo",
        "https://github.com/D-Astudillo-ASC",
        "https://leetcode.com/dtm99",
      ],
      worksFor: [
        {
          "@type": "Organization",
          name: "Visa, Inc.",
          jobTitle: "Software Engineer",
        },
        {
          "@type": "Organization",
          name: "Wayfair, Inc.",
          jobTitle: "Software Engineer Intern",
        },
      ],
      knowsAbout: [
        "React",
        "TypeScript",
        "Node.js",
        "Spring Boot",
        ".NET Core",
        "Java",
        "JavaScript",
        "Full Stack Development",
        "Payment Systems",
        "Recommendation Engines",
      ],
      alumniOf: {
        "@type": "Organization",
        name: "Williams College",
        description: "Bachelor of Arts in Computer Science and Mathematics",
      },
    };
    if (scriptRef.current) {
      scriptRef.current.textContent = JSON.stringify(structuredData);
    }
  }, []);

  return <script ref={scriptRef} type="application/ld+json" />;
}

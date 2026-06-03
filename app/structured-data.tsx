const SITE_URL = "https://danielastudillo.io";

const SOCIAL_PROFILES = [
  "https://linkedin.com/in/daniel-m-astudillo",
  "https://github.com/D-Astudillo-ASC",
  "https://leetcode.com/dtm99",
];

export default function StructuredData() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Daniel Astudillo",
    alternateName: "Daniel M. Astudillo",
    givenName: "Daniel",
    familyName: "Astudillo",
    jobTitle: "Software Engineer II",
    description:
      "Daniel Astudillo is a software engineer based in New York City, building high-performance data platforms and full-stack applications at S&P Global. He works across .NET, TypeScript, and distributed systems with a focus on performance and reliability.",
    url: SITE_URL,
    image: `${SITE_URL}/images/og-image.png`,
    knowsAbout: [
      "Software Engineering",
      "Distributed Systems",
      "Performance Optimization",
      "React",
      "TypeScript",
      "Next.js",
      "Node.js",
      ".NET Core",
      "C#",
      "Spring Boot",
      "Java",
      "PostgreSQL",
      "Google BigQuery",
      "gRPC",
      "Real-time Systems",
    ],
    sameAs: SOCIAL_PROFILES,
    worksFor: {
      "@type": "Organization",
      name: "S&P Global Inc.",
      url: "https://www.spglobal.com",
    },
    homeLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "New York",
        addressRegion: "NY",
        addressCountry: "US",
      },
    },
    workLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "New York",
        addressRegion: "NY",
        addressCountry: "US",
      },
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Williams College",
      description: "Bachelor of Arts in Computer Science and Mathematics",
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Software Engineer",
      occupationLocation: {
        "@type": "City",
        name: "New York, NY",
      },
      skills:
        "Full-stack development, distributed systems, performance optimization, .NET, TypeScript, data engineering",
    },
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is Daniel Astudillo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Daniel Astudillo is a software engineer based in New York City. He currently works at S&P Global building data platforms and full-stack applications, and previously built payment and benefit systems at Visa.",
        },
      },
      {
        "@type": "Question",
        name: "What technologies does Daniel Astudillo work with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Daniel works across the stack with React, TypeScript, and Next.js on the frontend, and .NET Core, C#, Spring Boot, and Java on the backend. He has deep experience with PostgreSQL, BigQuery, gRPC, and distributed messaging systems.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Daniel Astudillo based?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Daniel is based in New York City, where he works as a software engineer at S&P Global.",
        },
      },
      {
        "@type": "Question",
        name: "What has Daniel Astudillo built?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Daniel has taken a data API from a 21-second worst case to roughly 200–300ms (Storage Write API, then PostgreSQL), built a real-time event pipeline processing 100K+ daily events at 99.99% uptime, and modernized Visa payment and eligibility APIs at production scale (including paths above 20M requests per month). He writes about this work on his blog.",
        },
      },
      {
        "@type": "Question",
        name: "What is Daniel Astudillo's educational background?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Daniel graduated from Williams College with a Bachelor of Arts in Computer Science and Mathematics.",
        },
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Daniel Astudillo",
    url: SITE_URL,
    description:
      "The personal site and engineering blog of Daniel Astudillo, a software engineer in New York City writing about performance, distributed systems, and building things that hold up in production.",
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

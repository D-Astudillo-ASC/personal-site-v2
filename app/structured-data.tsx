export default function StructuredData() {
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
    author: {
      "@type": "Person",
      name: "Daniel Astudillo",
      url: "https://danielastudillo.io",
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Software Engineer",
      description:
        "Full-stack software engineer specializing in full-stack web development.",
    },
    makesOffer: {
      "@type": "Offer",
      description: "Software engineering services and technical consulting",
      category: "Software Development",
    },
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What technologies does Daniel Astudillo specialize in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Daniel specializes in React, TypeScript, Next.js, Spring Boot, .NET Core, Java, Python, and full-stack development. He has experience with payment systems, recommendation engines, and building scalable applications.",
        },
      },
      {
        "@type": "Question",
        name: "What companies has Daniel Astudillo worked for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Daniel has worked at Visa, Inc. as a Software Engineer and Wayfair, Inc. as a Software Engineer Intern. He has experience building systems that process 20M+ monthly API requests and improving recommendation engines by 20%.",
        },
      },
      {
        "@type": "Question",
        name: "What is Daniel Astudillo's educational background?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Daniel graduated from Williams College with a Bachelor of Arts in Computer Science and Mathematics. He has been programming since 2015 and has 3+ years of professional experience.",
        },
      },
      {
        "@type": "Question",
        name: "Is Daniel Astudillo available for hire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Daniel is currently open to new opportunities. He's seeking challenging problems in fintech, data pipelines, and creating intuitive user experiences. You can contact him through his website or LinkedIn.",
        },
      },
      {
        "@type": "Question",
        name: "What types of projects has Daniel Astudillo worked on?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Daniel has worked on Visa Card Eligibility Service, Visa Digital Benefits Platform, sales recommendation engines, payment processing systems, and modern web applications. He specializes in full-stack development and has led legacy migrations reducing technical debt by 10+ years.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  );
}

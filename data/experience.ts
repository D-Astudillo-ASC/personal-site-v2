import { Experience } from "@/types/experience";

export const experiences: Experience[] = [
  {
    id: "exp_1",
    title: "Software Engineer",
    company: "Visa, Inc.",
    location: "Miami, FL",
    employmentType: "Professional",
    startDate: new Date("2022-09-13"),
    endDate: new Date("2025-02-03"),
    description: [
      "Led migration of critical Visa Card Eligibility Services (VCES) legacy components to .NET Core 6.0, achieving 10-15% performance improvement and reducing 10+ years of technical debt across 20M+ monthly API requests.",
      "Contributed to Visa Digital Benefits Platform (VDBP), a benefits management platform for card issuers, focusing on comprehensive unit testing with JUnit and Mockito, performance optimizations, and successful migration from Java 11 to Java 17 + Spring Boot 3.x.",
      "Architected and implemented Apache ActiveMQ message producer in .NET Core 6.0 to share real-time benefit redemption data from VCES with VDBP, developing cross-platform Docker images for Apache ActiveMQ Artemis v2.29.0 supporting both Apple Silicon and Intel architectures.",
      "Architected and developed a modernized version of Visa Click to Pay platform, migrating from legacy jQuery + Backbone.js to React, TypeScript, and Next.js with Backend-for-Frontend (BFF) architecture.",
      "Contributed to Visa Performance Processing Monitor (VPPM), a critical monitoring tool used by banks across Latin America to track Visa Debit/Credit transaction metrics in real-time.",
    ],
    technologies: ["React", "Next.js", "TypeScript", ".NET Core 6.0", "Spring Boot", "Java", "Apache ActiveMQ", "Docker", "C#", "JUnit", "Mockito", "Jest", "Storybook", "Turborepo", "Jenkins", "Checkmarx", "SonarQube", "Postman"],
  },
  {
    id: "exp_2",
    title: "Software Engineer Intern",
    company: "Wayfair, Inc.",
    location: "Boston, MA",
    employmentType: "Internship",
    startDate: new Date("2022-06"),
    endDate: new Date("2022-08"),
    description: [
      "Drove critical improvements to Wayfair's sales operations by working directly with the Sales 360 Engineering-Distribution team, identifying and resolving functionality gaps that were blocking feature deployments.",
      "Built robust testing infrastructure from the ground up, achieving 100% code coverage on mission-critical backend APIs using Python's unittest framework - a first for the team that set new quality standards.",
      "Revolutionized the sales recommendation engine by designing and implementing innovative data transformation pipelines that boosted prediction accuracy by 20%, directly improving how customers connect with the right sales agents.",
      "Transformed the phone routing system by integrating a high-performance internal routing client, slashing connection times by 30% and dramatically improving the customer experience during peak sales periods.",
    ],
    technologies: ["Python", "unittest", "pytest","BigQuery", "Pandas", "NumPy", "Scikit-learn", "Feature Engineering", "Data Pipelines", "SQL"],
  },
  {
    id: "exp_3",
    title: "Software Developer Intern",
    company: "RestEasy, Inc.",
    location: "New York, NY (Remote)",
    employmentType: "Internship",
    startDate: new Date("2020-09"),
    endDate: new Date("2021-07"),
    description: [
      "Architected and deployed AWS EC2 infrastructure with NGINX reverse proxy, enabling unified backend and frontend delivery on consolidated ports while optimizing resource utilization and reducing operational complexity.",
      "Revolutionized media management system by integrating AWS S3 cloud storage, achieving 20% reduction in upload processing times and significantly improving user experience for content-heavy operations.",
      "Engineered comprehensive payment processing solution using Stripe Payments API, enabling secure fundraising capabilities and financial transactions for 250+ registered users with PCI compliance standards.",
      "Optimized backend performance through MongoDB bulk operations implementation, reducing API latency by 15% and enhancing database efficiency for high-traffic scenarios.",
    ],
    technologies: ["Node.js", "Express", "MongoDB", "AWS EC2", "AWS S3", "NGINX", "Stripe API", "RESTful APIs"],
  },
  // Add more experience entries as needed
];

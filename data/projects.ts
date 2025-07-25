import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "visa-vces",
    title: "Visa Card Eligibility Service",
    description:
      "A real-time API service that enables financial institutions and merchants to determine card eligibility for exclusive benefits, offers, and promotions. Built with microservices architecture using .NET Core and Spring Boot, providing secure endpoints for card validation, eligibility checks, benefit redemption, and iFrame integration.",
    technologies: [
      ".NET Framework",
      ".NET Core",
      "ASP.NET Core",
      "Razor Pages",
      "C#",
      "SQL Server",
      "Spring Boot",
      "Java",
    ],
    imageUrl: "/images/projects/vces.avif",
    liveUrl: "https://developer.visa.com/capabilities/vces",
    featured: true,
  },
  {
    id: "visa-vdbp",
    title: "Visa Digital Benefits Platform",
    description:
      "A comprehensive benefits orchestration platform that empowers card issuers to create and manage personalized cardholder rewards programs. Built with Spring Boot/Java 17, the system provides intelligent benefit allocation based on spending behavior, geographic location, and card tier eligibility. Features real-time benefit activation, flexible reward packages, and seamless integration with existing banking infrastructure.",
    technologies: [
      "Spring Boot",
      "Java 17",
      "JUnit",
      "Mockito",
      "IBM DB2",
      "REST APIs",
    ],
    imageUrl: "/images/projects/vdbp.avif",
    liveUrl: "https://developer.visa.com/capabilities/vdbp",
    featured: true,
  },
  {
    id: "visa-click-to-pay",
    title: "Visa Click to Pay",
    description:
      "A secure digital payment solution that streamlines online checkout by allowing cardholders to complete transactions without manually entering card details. Built with Backbone.js and jQuery, the platform provides seamless payment experiences while maintaining the highest security standards for financial transactions.",
    technologies: [
      "React",
      "TypeScript",
      "Next.js",
      "Backbone.js",
      "jQuery",
      "JavaScript",
      "Jest",
      "Storybook",
      "Spring Boot",
      "Java 8",
    ],
    imageUrl: "/images/projects/click-to-pay.avif",
    liveUrl: "https://secure.checkout.visa.com",
  },
  {
    id: "personal-site-v2",
    title: "Personal Website v2",
    description:
      "Current iteration of my personal website built with Next.js, TypeScript, React and Tailwind CSS. Features a dark mode toggle and font switcher.",
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Framer Motion",
    ],
    imageUrl: "/images/projects/personal-site-v2.avif",
    liveUrl: "https://danielastudillo.io",
    githubUrl: "https://github.com/D-Astudillo-ASC/personal-site-v2",
    featured: true,
  },
  {
    id: "personal-site",
    title: "Personal Website v1",
    description:
      "The first iteration of my personal website built with Gatsby, GraphQL, React, and CSS.",
    technologies: ["Gatsby.js", "GraphQL", "React", "CSS"],
    imageUrl: "/images/projects/personal-site-v1.avif",
    liveUrl: "https://personal-site-puce-nine.vercel.app/",
    githubUrl: "https://github.com/D-Astudillo-ASC/personal-site",
  },
  {
    id: "Roguelike-Game",
    title: "Roguelike Game",
    description:
      "A roguelike game built with ROT.js and pure JavaScript, modernized with Vite.js, SOLID principles, up to date dependencies, and a more interactive game experience. Features a player character that can move around a dungeon and fight with monsters. Inspired by the game 'The Binding of Isaac'. Currently under development.",
    technologies: ["ROT.js", "Vite.js", "CSS"],
    imageUrl: "/images/projects/roguelike-game.avif",
    liveUrl: "https://roguelike-game-winter-study-2018.vercel.app",
    githubUrl:
      "https://github.com/D-Astudillo-ASC/Roguelike-Game-Winter-Study-2018",
  },
];

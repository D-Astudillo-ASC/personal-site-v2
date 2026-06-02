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
    highlight: "20M+ API requests / month",
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
    highlight: "Real-time benefit orchestration",
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
    id: "realtime-collab-editor",
    title: "Real-Time Collaborative Editor",
    description:
      "Monaco + Yjs CRDT editor over Socket.IO — binary update deltas, not full-document sync. Durable append-only update log in Neon Postgres with object-storage snapshots (every 50 edits or 30s), Clerk JWT auth on HTTP and WebSocket, Google Docs–style sharing, Postgres notification inbox, Redis rate limiting, Gemini AI assistant, and Docker-sandboxed code execution. Deployed Vercel + Fly.io.",
    technologies: [
      "React 19",
      "Yjs",
      "Monaco",
      "Node.js",
      "Socket.IO",
      "PostgreSQL",
      "Clerk",
      "Redis",
      "Fly.io",
    ],
    imageUrl: "/images/projects/personal-site-v2.avif",
    githubUrl: "https://github.com/D-Astudillo-ASC",
    highlight: "CRDT sync + durable update log",
    featured: true,
  },
  {
    id: "genai-contract-assistant",
    title: "GenAI Contract Assistant",
    description:
      "A full-stack GenAI chatbot for automated contract redlining at Visa, reducing manual legal review time by 30%. Built a retrieval-augmented generation (RAG) pipeline achieving 99% retrieval accuracy — advanced from prototype to a company-supported initiative.",
    technologies: [
      "Python",
      "Django",
      "Flask",
      "LangChain",
      "OpenAI API",
      "RAG",
    ],
    imageUrl: "/images/projects/vces.avif",
    highlight: "30% faster legal review",
    featured: true,
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
    highlight: "Standalone · Core Web Vitals–first",
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

import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "visa-vces",
    title: "Visa Card Eligibility Service",
    description:
      "A real-time API service that enables financial institutions and merchants to determine card eligibility for exclusive benefits, offers, and promotions. Built with microservices architecture using .NET Core and Spring Boot, providing secure endpoints for card validation, eligibility checks, benefit redemption, and iFrame integration.",
    cardDescription:
      "Real-time eligibility and benefit redemption APIs — .NET Core and Spring Boot microservices at production scale.",
    technologies: [
      ".NET Core",
      "Spring Boot",
      "C#",
      "Java",
      "SQL Server",
      "REST",
    ],
    imageUrl: "/images/projects/vces.avif",
    liveUrl: "https://developer.visa.com/capabilities/vces",
    highlight: "High-volume production API",
    featured: true,
  },
  {
    id: "realtime-collab-editor",
    title: "Real-Time Collaborative Editor",
    description:
      "Monaco + Yjs CRDT editor over Socket.IO — binary update deltas, not full-document sync. Durable append-only update log in Neon Postgres with object-storage snapshots (every 50 edits or 30s), Clerk JWT auth on HTTP and WebSocket, Google Docs–style sharing, Postgres notification inbox, Redis rate limiting, Gemini AI assistant, and Docker-sandboxed code execution. Deployed Vercel + Fly.io.",
    cardDescription:
      "Yjs + Monaco over Socket.IO with append-only Postgres log, snapshots, and Clerk-secured relay.",
    technologies: [
      "React 19",
      "Yjs",
      "Monaco",
      "Node.js",
      "PostgreSQL",
      "Clerk",
    ],
    imageUrl: "/images/projects/personal-site-v2.avif",
    githubUrl: "https://github.com/D-Astudillo-ASC",
    blogSlug: "building-a-crdt-collaborative-editor",
    highlight: "CRDT sync + durable log",
    featured: true,
  },
  {
    id: "mobile-events-social",
    title: "Mobile Events Social Platform",
    description:
      "Archived React Native + Expo codebase for an events-first social product: stories, DMs, structured events, interest matching, and business verification. Firebase (Firestore, RTDB, Functions), WebRTC calling experiments, App Check, and full iOS distribution documentation.",
    cardDescription:
      "Expo + Firebase vertical slice for IRL-first social — messaging, events schema discipline, and TestFlight playbooks (archived).",
    technologies: [
      "React Native",
      "Expo",
      "Firebase",
      "TypeScript",
      "WebRTC",
    ],
    blogSlug: "lessons-from-building-a-mobile-events-social-platform",
    highlight: "Archived · full stack docs",
    featured: true,
  },
  {
    id: "visa-vdbp",
    title: "Visa Digital Benefits Platform",
    description:
      "A comprehensive benefits orchestration platform that empowers card issuers to create and manage personalized cardholder rewards programs. Built with Spring Boot/Java 17, the system provides intelligent benefit allocation based on spending behavior, geographic location, and card tier eligibility. Features real-time benefit activation, flexible reward packages, and seamless integration with existing banking infrastructure.",
    cardDescription:
      "Benefits orchestration for issuers — real-time activation, tier rules, and banking integrations on Spring Boot.",
    technologies: ["Spring Boot", "Java 17", "IBM DB2", "REST APIs"],
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
    cardDescription:
      "Streamlined cardholder checkout — legacy Backbone/jQuery front end with modern React migration paths.",
    technologies: ["React", "TypeScript", "Backbone.js", "Spring Boot"],
    imageUrl: "/images/projects/click-to-pay.avif",
    liveUrl: "https://secure.checkout.visa.com",
  },
  {
    id: "genai-contract-assistant",
    title: "GenAI Contract Assistant",
    description:
      "A full-stack GenAI chatbot for automated contract redlining at Visa, reducing manual legal review time by 30%. Built a retrieval-augmented generation (RAG) pipeline achieving 99% retrieval accuracy — advanced from prototype to a company-supported initiative.",
    cardDescription:
      "RAG pipeline for contract redlining — ~30% less manual legal review time in pilot.",
    technologies: ["Python", "LangChain", "OpenAI API", "RAG"],
    imageUrl: "/images/projects/vdbp.avif",
    highlight: "30% faster legal review",
  },
  {
    id: "first-mern-memorial",
    title: "First MERN Stack (Memorial Platform)",
    description:
      "2020–2021 remote internship: React + Express + MongoDB, JWT auth, Stripe payments, S3 uploads, EC2 + NGINX + PM2 production deploy.",
    cardDescription:
      "First production MERN — dual dev servers locally, one origin behind NGINX in prod.",
    technologies: ["React", "Express", "MongoDB", "AWS", "Stripe"],
    blogSlug: "first-mern-stack-production-deploy",
    highlight: "First MERN · 2020–21",
  },
  {
    id: "team-mern-exam-capstone",
    title: "Team MERN Exam Workflow Capstone",
    description:
      "2022 team capstone on a React/Express monorepo: Redux + Material-UI, MongoDB, patient/exam workflows, Amplify/Beanstalk deployment docs.",
    cardDescription:
      "COVID-era clinical UI capstone — displayPatient, exam tables, and serious Redux monorepo practice.",
    technologies: ["React", "Redux", "Express", "MongoDB", "Material-UI"],
    githubUrl:
      "https://github.com/D-Astudillo-ASC/innovators-covid-project",
    blogSlug: "team-mern-exam-workflow-capstone",
    highlight: "Team capstone · 2022",
  },
  {
    id: "public-api-course-dashboard",
    title: "Public API Course Dashboard",
    description:
      "Express BFF over a third-party public API — published courses with active enrollments (name + email), React dashboard, retries, and Jest coverage.",
    cardDescription:
      "TypeScript BFF + CRA client — aggregation, rate limits, and API-native filters vs app-tier filtering.",
    technologies: ["TypeScript", "React", "Express", "Jest"],
    blogSlug: "public-api-course-enrollment-dashboard",
    highlight: "BFF · Public API",
  },
  {
    id: "masterplan-matching",
    title: "MasterPlan (Course Matching)",
    description:
      "2019 JavaScript scheduling simulator: student–advisor compatibility, prerequisite-aware course recommendations, CSV-driven batch runner.",
    cardDescription:
      "Tag overlap + prereq checks — explainable matching before frameworks or LLMs.",
    technologies: ["JavaScript", "Algorithms"],
    blogSlug: "student-advisor-course-matching-simulator",
    highlight: "2019 · coursework",
  },
  {
    id: "wallpaper-macos",
    title: "macOS Wallpaper Picker",
    description:
      "SwiftUI app: Unsplash API grid, SDWebImageSwiftUI, cache JPEGs locally, set desktop via NSWorkspace.",
    cardDescription:
      "Desktop automation — download full-res photos and apply as macOS wallpaper.",
    technologies: ["Swift", "SwiftUI", "macOS"],
    blogSlug: "macos-wallpaper-picker-unsplash",
    highlight: "SwiftUI · 2022",
  },
  {
    id: "expo-rn-experiments",
    title: "Expo React Native Experiments",
    description:
      "Practice repos: expo-camera sample, Expo Router sandbox with messaging UI, expo-gl + React Three Fiber on mobile.",
    cardDescription:
      "Camera, routing, and 3D spikes before the archived Firebase social codebase.",
    technologies: ["React Native", "Expo", "Three.js"],
    blogSlug: "expo-react-native-experiments",
    highlight: "Expo sandboxes",
  },
  {
    id: "perpetual-gems",
    title: "Perpetual Gems",
    description:
      "Multilingual jewelry repair marketing site: Angular 19 SSR, Tailwind v4, ngx-translate (8 locales), Express repair intake with CSRF and email notifications.",
    cardDescription:
      "Angular SSR + Express lead capture — trust-heavy local service UX at perpetual-gems.vercel.app.",
    technologies: ["Angular", "TypeScript", "Express", "Tailwind CSS"],
    liveUrl: "https://perpetual-gems.vercel.app/",
    blogSlug: "building-perpetual-gems-jewelry-repair-site",
    highlight: "8 locales · SSR",
  },
  {
    id: "astro-bun-landing",
    title: "Astro + Bun Landing Template",
    description:
      "Static commercial landing template: Astro 6, Bun, token-driven CSS (no Tailwind), scroll story, FAQ, lead capture with demo mode, Playwright smoke tests, deployed to Vercel.",
    cardDescription:
      "Resale-ready marketing shell — one data file for copy, theme toggle, SEO, and e2e on preview.",
    technologies: ["Astro", "Bun", "TypeScript", "Playwright"],
    liveUrl: "https://astro-bun-site.vercel.app/",
    blogSlug: "astro-bun-landing-template-experiment",
    highlight: "Static · token CSS",
  },
  {
    id: "music-visualizer",
    title: "Browser Music Visualizer",
    description:
      "Client-side React app: local audio upload, Wavesurfer.js waveform, Web Audio analyser modes (bars, circular), scaffolded with Block Goose.",
    cardDescription:
      "Wavesurfer + Web Audio in the browser — Goose for scaffolding, manual work on the audio graph.",
    technologies: ["React", "Vite", "Wavesurfer.js", "Web Audio"],
    blogSlug: "building-a-browser-music-visualizer-with-goose",
    highlight: "Web Audio edge cases",
  },
  {
    id: "gemini-ai-bff",
    title: "Gemini AI Backend (SSE)",
    description:
      "Fastify BFF for a social mobile app: Gemini 1.5 Flash, Redis prompt cache, hybrid match scoring with LLM-written explanations, and POST /message/stream with real Server-Sent Events — separate from the self-hosted GPU pod.",
    cardDescription:
      "Managed Gemini + SSE streaming, deterministic matching math, and Firebase-backed chat context (experiment A of two).",
    technologies: ["Gemini", "Fastify", "Redis", "SSE", "TypeScript"],
    blogSlug: "building-a-gemini-ai-backend-with-sse",
    highlight: "Real token streaming",
  },
  {
    id: "gpu-llm-inference",
    title: "Self-Hosted 13B LLM Inference",
    description:
      "Llama-2 13B GPTQ on a GPU pod with vLLM and FastAPI WebSockets — HuggingFace snapshot paths, Llama-2 chat templates, simulated streaming, and hindsight: should have used OpenAI-compatible HTTP/SSE instead.",
    cardDescription:
      "vLLM on a GPU pod — WebSocket spike, batch generate() chunked for UX, and why experiment A’s SSE pattern should have been reused (experiment B).",
    technologies: ["vLLM", "FastAPI", "Python", "GPTQ"],
    blogSlug: "hosting-a-quantized-llm-on-gpu-websocket-vs-sse",
    highlight: "Quantized 13B · GPU",
  },
  {
    id: "personal-site-v2",
    title: "Personal Website (current)",
    description:
      "Third generation at danielastudillo.io — Next.js 16, MDX blog, Tailwind v4, standalone output, and editorial case studies linked from projects.",
    cardDescription:
      "danielastudillo.io — Next 16, 20+ MDX posts, projects ↔ blog slugs, CWV-first standalone build.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
    imageUrl: "/images/projects/personal-site-v2.avif",
    liveUrl: "https://danielastudillo.io",
    githubUrl: "https://github.com/D-Astudillo-ASC/personal-site-v2",
    blogSlug: "portfolio-v1-gatsby-to-next-v2",
    highlight: "Gen 3 · Editorial",
  },
  {
    id: "personal-site-next-v2",
    title: "Personal Website (Next v2 subdomain)",
    description:
      "Second generation still hosted at v2.danielastudillo.io — first Next.js migration off Gatsby, deployed on Vercel.",
    cardDescription:
      "v2.danielastudillo.io — intermediate Next deploy between Gatsby v1 and the current apex site.",
    technologies: ["Next.js", "React", "Vercel"],
    imageUrl: "/images/projects/personal-site-v2.avif",
    liveUrl: "https://v2.danielastudillo.io/",
    githubUrl: "https://github.com/D-Astudillo-ASC/personal-site-v2",
    blogSlug: "portfolio-v1-gatsby-to-next-v2",
    highlight: "Gen 2 · Live archive",
  },
  {
    id: "personal-site",
    title: "Personal Website v1 (Gatsby)",
    description:
      "First generation at v1.danielastudillo.io — Gatsby 5, GraphQL data layer, particles hero, and static Vercel hosting.",
    cardDescription: "v1.danielastudillo.io — Gatsby + GraphQL time capsule.",
    technologies: ["Gatsby.js", "GraphQL", "React"],
    imageUrl: "/images/projects/personal-site-v1.avif",
    liveUrl: "https://v1.danielastudillo.io/",
    githubUrl: "https://github.com/D-Astudillo-ASC/personal-site",
    blogSlug: "portfolio-v1-gatsby-to-next-v2",
    highlight: "Gen 1 · Gatsby",
  },
  {
    id: "Roguelike-Game",
    title: "Roguelike Game",
    description:
      "A roguelike game built with ROT.js and pure JavaScript, modernized with Vite.js, SOLID principles, up to date dependencies, and a more interactive game experience. Features a player character that can move around a dungeon and fight with monsters. Inspired by the game 'The Binding of Isaac'. Currently under development.",
    cardDescription:
      "ROT.js roguelike with Vite — dungeon combat prototype inspired by Binding of Isaac.",
    technologies: ["ROT.js", "Vite.js", "JavaScript"],
    imageUrl: "/images/projects/roguelike-game.avif",
    liveUrl: "https://roguelike-game-winter-study-2018.vercel.app",
    githubUrl:
      "https://github.com/D-Astudillo-ASC/Roguelike-Game-Winter-Study-2018",
    blogSlug: "modernizing-a-winter-study-roguelike",
  },
];

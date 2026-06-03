import {
  faBolt,
  faShieldHalved,
  faChartLine,
  faCode,
} from "@/lib/fontawesome-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { experiences } from "@/data/experience";
import { formatDate } from "@/utils/date";
import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import ExperienceCard from "@/components/experience/ExperienceCard";
import ExperienceSummary from "@/components/experience/ExperienceSummary";

export const metadata: Metadata = {
  title: "About",
  description:
    "Daniel Astudillo is a full-stack software engineer in New York building high-performance financial systems — data platforms at S&P Global and payment infrastructure at Visa handling 20M+ monthly requests.",
  alternates: {
    canonical: "https://danielastudillo.io/about",
  },
  openGraph: {
    title: "About — Daniel Astudillo",
    description:
      "Full-stack engineer in NYC building high-performance financial systems. S&P Global data platforms, Visa payment infrastructure at 20M+ requests/month.",
    url: "https://danielastudillo.io/about",
  },
};

const skillGroups = [
  {
    label: "Frontend",
    items: [
      "React / Next.js",
      "TypeScript",
      "React Native / Expo",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    label: "Backend & APIs",
    items: [
      ".NET Core / EF Core",
      "Spring Boot / Java",
      "Node.js / Express",
      "C# / Python",
      "gRPC / REST / GraphQL",
    ],
  },
  {
    label: "Data & Messaging",
    items: [
      "PostgreSQL",
      "Google BigQuery",
      "MongoDB / Firestore",
      "ActiveMQ Artemis / JMS",
      "IBM DB2 / SQL Server",
    ],
  },
  {
    label: "GenAI & ML",
    items: [
      "LangChain / RAG",
      "OpenAI API",
      "LLM prompt engineering",
      "Pandas / NumPy",
      "Scikit-learn",
    ],
  },
  {
    label: "Testing & Quality",
    items: [
      "JUnit / Mockito",
      "Jest / pytest",
      "Storybook",
      "Checkmarx / SonarQube",
    ],
  },
  {
    label: "DevOps & Cloud",
    items: [
      "Docker / Kubernetes (GKE)",
      "AWS (EC2, S3)",
      "Vercel / Fly.io",
      "Jenkins / Azure DevOps",
    ],
  },
];

const principles = [
  {
    icon: faBolt,
    title: "Performance is a feature",
    body: "Faster queries, lower latency, leaner builds. A 21s API path that lands at ~250ms changes what a product can do — that's the work I optimize for.",
  },
  {
    icon: faShieldHalved,
    title: "Reliability earns trust",
    body: "When a system moves money for millions of users, correctness and uptime aren't optional. I design for failure modes, not just the happy path.",
  },
  {
    icon: faChartLine,
    title: "Measured, not claimed",
    body: "Every engineering decision should move a number — p95 latency, error rate, coverage. I orient around outcomes, not activity.",
  },
  {
    icon: faCode,
    title: "Clarity compounds",
    body: "Readable code and clear writing are the same discipline. The next engineer — often future me — should understand the why without an archaeology dig.",
  },
];

export default function About() {
  return (
    <PageShell maxWidth="4xl">
      <PageHeader label="About" title="Daniel Astudillo" />

      <ExperienceSummary />

      {/* Journey */}
      <section className="mb-20">
        <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Background
        </h2>
        <div className="space-y-6 text-base leading-relaxed text-muted">
          <p>
            I&apos;m a full-stack software engineer who builds
            high-performance financial systems. I&apos;ve always been wired
            to understand how things work — take them apart, learn the
            mechanics, put them back together better.
          </p>
          <p>
            That instinct turned into programming in 2015, a Khan Academy
            account, and the small thrill of typing characters and watching
            something come alive in a browser. It grew into a career building
            tools that solve real problems at scale.
          </p>
          <p>
            At{" "}
            <Link
              href="/projects"
              className="text-text transition-fast hover:text-accent"
            >
              Visa
            </Link>{" "}
            I worked on payment and eligibility systems at production scale
            (20M+ monthly requests on the eligibility path) — modernizing .NET
            and Spring Boot services, replacing
            hundreds of stored procedures with APIs, and building the first
            real-time benefit-redemption pipeline between VCES and VDBP at
            99.99% uptime. After Visa, I spent time shipping on my own: mobile
            apps, a CRDT collaborative editor, and RAG prototypes.
          </p>
          <p>
            At S&amp;P Global I started on Data-as-a-Service — taking core API
            latency from ~21 seconds to under 2 with the Storage Write API, then
            to roughly 200–300ms on PostgreSQL, while modernizing the frontend
            and migrating dozens of routes off BigQuery. That expanded into Data
            Studio: a microfrontend platform (Module Federation, Fastify BFFs,
            shared contracts) serving DaaS, mData, and other remotes.
          </p>
          <p>
            What I optimize for is measurable impact on paths users and
            operators feel — query latency, deploy safety, cache coherence
            across pods — backed by tests and coverage, not heroics after
            something breaks.
          </p>
        </div>
      </section>

      {/* Stack */}
      <section className="mb-20">
        <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Stack
        </h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
                {group.label}
              </h3>
              <ul className="space-y-1.5 text-sm text-muted">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-20">
        <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Experience
        </h2>
        <div className="space-y-10">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="mb-20">
        <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Principles
        </h2>
        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
          {principles.map((principle) => (
            <div key={principle.title} className="bg-background p-6">
              <div className="mb-3 flex items-center gap-3">
                <FontAwesomeIcon
                  icon={principle.icon}
                  className="h-4 w-4 text-accent"
                />
                <h3 className="text-base font-medium text-text">
                  {principle.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted">
                {principle.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Education
        </h2>
        <div className="border-l border-border pl-6 sm:pl-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            {formatDate(new Date("2017-09"))} — {formatDate(new Date("2022-06"))}
          </p>
          <h3 className="mt-2 text-lg font-medium text-text">
            B.A. in Computer Science &amp; Mathematics
          </h3>
          <p className="mt-0.5 text-sm text-muted">Williams College</p>
        </div>
      </section>
    </PageShell>
  );
}

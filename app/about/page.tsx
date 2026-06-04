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
import AboutCaseStudy from "@/components/about/AboutCaseStudy";
import AboutPageFooter from "@/components/about/AboutPageFooter";
import AboutWritingProof from "@/components/about/AboutWritingProof";
import SectionLabel from "@/components/about/SectionLabel";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";
export const revalidate = 3600;

const SITE_URL = "https://danielastudillo.io";

export const metadata: Metadata = {
  title: "About",
  description:
    "Daniel Astudillo is a backend-first full-stack engineer in New York — data platforms and microfrontends at S&P Global, payment infrastructure at Visa (20M+ monthly requests), and technical writing on performance and distributed systems.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About — Daniel Astudillo",
    description:
      "Backend-first engineer in NYC — DaaS latency work, Data Studio microfrontends, Visa payment systems, and twenty deep-dive essays on production engineering.",
    url: `${SITE_URL}/about`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Daniel Astudillo",
    description:
      "Data platforms, payment infrastructure, and writing on performance engineering.",
  },
};

const skillGroups = [
  {
    label: "Frontend",
    items: [
      "React 19 / Next.js 16",
      "TypeScript",
      "React Native / Expo",
      "Tailwind CSS v4",
      "Module Federation / Rspack",
    ],
  },
  {
    label: "Backend & APIs",
    items: [
      ".NET 10 / EF Core",
      "Spring Boot / Java",
      "Node.js / Fastify",
      "C# / Python",
      "gRPC / REST / GraphQL",
    ],
  },
  {
    label: "Data & Messaging",
    items: [
      "PostgreSQL",
      "Google BigQuery",
      "ClickHouse",
      "MongoDB / Firestore",
      "ActiveMQ Artemis / JMS",
    ],
  },
  {
    label: "GenAI & ML",
    items: [
      "LangChain / RAG",
      "OpenAI / Gemini APIs",
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
      "SonarCloud / Checkmarx",
      "Supply-chain triage (npm/pnpm)",
    ],
  },
  {
    label: "DevOps & Cloud",
    items: [
      "Docker / GKE",
      "AWS (EC2, S3)",
      "Vercel / standalone output",
      "Azure DevOps / Jenkins",
      "pnpm / Turbopack",
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
    body: "When a system moves money or market data for millions of users, correctness and uptime aren't optional. I design for failure modes, not just the happy path.",
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

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/about`,
  url: `${SITE_URL}/about`,
  name: "About — Daniel Astudillo",
  description: metadata.description,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: { "@id": `${SITE_URL}/#person` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: `${SITE_URL}/about`,
      },
    ],
  },
};

export default async function About() {
  const posts = await getAllPosts();
  const postsBySlug = new Map(posts.map((post) => [post.slug, post]));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePageSchema),
        }}
      />
      <PageShell maxWidth="4xl">
        <PageHeader
          label="About"
          title="Daniel Astudillo"
          description="Backend-first full-stack engineer in New York — I make data paths fast, platforms maintainable, and write up the trade-offs so the next engineer doesn't have to reverse-engineer the decision."
          className="mb-10"
        />

        <p className="mb-12 font-display text-2xl italic leading-snug text-text sm:text-3xl">
          APIs, data stores, and the systems around them — subscription platforms,
          payment rails, market data.
        </p>

        <ExperienceSummary />
        <AboutCaseStudy />

        <section className="mb-20">
          <SectionLabel index="01" label="Background" />
          <div className="space-y-6 text-base leading-relaxed text-muted">
            <p>
              I&apos;m a full-stack engineer who has always been wired to
              understand how things work — take them apart, learn the mechanics,
              put them back together better. That instinct turned into
              programming in 2015 and grew into a career building tools that
              solve real problems at scale.
            </p>
            <p>
              I&apos;m strongest on the backend — schema design, migrations,
              gRPC, message pipelines — but I routinely own the full path when it
              matters: Next.js frontends, Auth0, multi-pod caching, microfrontend
              shells. The pattern is the same: find the bottleneck, pick the right
              tool, ship with tests and measurable latency.
            </p>
            <p>
              At{" "}
              <Link
                href="/blog/bridging-amqps-and-jms-for-real-time-events"
                className="text-text transition-fast hover:text-accent"
              >
                Visa
              </Link>{" "}
              I worked on payment and eligibility systems at production scale
              (20M+ monthly requests on the eligibility path) — modernizing .NET
              and Spring Boot services, replacing hundreds of stored procedures
              with APIs, and building the first real-time benefit-redemption
              pipeline between VCES and VDBP at 99.99% uptime.
            </p>
            <p>
              After Visa I spent a self-directed stretch shipping mobile apps, a{" "}
              <Link
                href="/blog/building-a-crdt-collaborative-editor"
                className="text-text transition-fast hover:text-accent"
              >
                CRDT collaborative editor
              </Link>
              , and RAG prototypes — the kind of end-to-end work that keeps API
              design honest.
            </p>
            <p>
              At S&amp;P Global I started on Data-as-a-Service — taking core API
              latency from ~21 seconds to under 2 with the Storage Write API,
              then to roughly 200–300ms on PostgreSQL, while modernizing the
              frontend and migrating dozens of routes off BigQuery. That expanded
              into Data Studio: a microfrontend platform (Module Federation,
              Fastify BFFs, shared contracts) serving DaaS, mData, and other
              remotes.
            </p>
            <p>
              This site is the latest iteration of that habit —{" "}
              <Link
                href="/blog/portfolio-v1-gatsby-to-next-v2"
                className="text-text transition-fast hover:text-accent"
              >
                portfolio v2
              </Link>{" "}
              on Next.js 16 with an MDX essay pipeline, static generation, and
              the same supply-chain discipline I document in{" "}
              <Link
                href="/blog/triaging-shai-hulud-and-npm-audit-on-nextjs"
                className="text-text transition-fast hover:text-accent"
              >
                npm audit triage
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="mb-20">
          <SectionLabel index="02" label="Writing" />
          <AboutWritingProof postsBySlug={postsBySlug} />
        </section>

        <section className="mb-20">
          <SectionLabel index="03" label="Stack" />
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

        <section className="mb-20">
          <SectionLabel index="04" label="Experience" />
          <div className="space-y-10">
            {experiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </section>

        <section className="mb-20">
          <SectionLabel index="05" label="Principles" />
          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            {principles.map((principle) => (
              <div key={principle.title} className="bg-background p-6">
                <div className="mb-3 flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={principle.icon}
                    className="h-4 w-4 text-accent"
                    aria-hidden
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

        <section className="mb-20">
          <SectionLabel index="06" label="Education" />
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

        <AboutPageFooter />
      </PageShell>
    </>
  );
}

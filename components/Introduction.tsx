interface IntroductionProps {
  isOpenToWork?: boolean;
}

export default function Introduction({
  isOpenToWork = true,
}: IntroductionProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <p className="text-lg font-thin text-text/80 leading-relaxed">
          I&apos;m a Software Engineer with experience building systems that
          millions of people depend on. At{" "}
          <span className="font-medium text-text">Visa</span>, I worked on
          critical financial services processing{" "}
          <span className="font-medium text-text">
            20M+ monthly API requests
          </span>
          , led legacy migrations that reduced technical debt by{" "}
          <span className="font-medium text-text">10+ years</span>, and
          architected modern payment platforms. At{" "}
          <span className="font-medium text-text">Wayfair</span>, I
          revolutionized sales recommendation engines with{" "}
          <span className="font-medium text-text">
            20% accuracy improvements
          </span>{" "}
          and achieved{" "}
          <span className="font-medium text-text">100% test coverage</span> on
          mission-critical systems.
        </p>

        <p className="text-lg font-thin text-text/80 leading-relaxed">
          My expertise spans the full technology stack — from{" "}
          <span className="font-medium text-text">React</span>,{" "}
          <span className="font-medium text-text">Next.js</span>, and{" "}
          <span className="font-medium text-text">TypeScript</span> frontends to{" "}
          <span className="font-medium text-text">Spring Boot</span>,{" "}
          <span className="font-medium text-text">.NET Core</span>, and{" "}
          <span className="font-medium text-text">Python</span> backends.
        </p>
      </div>

      {isOpenToWork && (
        <div className="pt-2 border-t border-border/20">
          <p className="text-lg font-thin text-text/80 leading-relaxed">
            I&apos;m currently seeking opportunities to work on challenging
            problems that matter — whether that&apos;s building the next
            generation of financial technology, optimizing data pipelines that
            power millions of decisions, or creating intuitive experiences that
            people love to use. I thrive in environments that value innovation,
            technical excellence, and the kind of impact that changes how people
            interact with technology.
          </p>
        </div>
      )}
    </div>
  );
}

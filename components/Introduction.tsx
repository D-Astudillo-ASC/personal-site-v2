import Link from "next/link";

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
          <Link href="/about" className="font-medium text-text hover:text-primary transition-colors">
            Visa
          </Link>, I worked on
          critical financial services processing{" "}
          <span className="font-medium text-text">
            20M+ monthly API requests
          </span>
          , led legacy migrations that reduced technical debt by{" "}
          <span className="font-medium text-text">10+ years</span>, and
          architected modern payment platforms. At{" "}
          <Link href="/about" className="font-medium text-text hover:text-primary transition-colors">
            Wayfair
          </Link>, I
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
          <Link href="/projects" className="font-medium text-text hover:text-primary transition-colors">
            React
          </Link>,{" "}
          <Link href="/projects" className="font-medium text-text hover:text-primary transition-colors">
            Next.js
          </Link>, and{" "}
          <Link href="/projects" className="font-medium text-text hover:text-primary transition-colors">
            TypeScript
          </Link> frontends to{" "}
          <Link href="/projects" className="font-medium text-text hover:text-primary transition-colors">
            Spring Boot
          </Link>,{" "}
          <Link href="/projects" className="font-medium text-text hover:text-primary transition-colors">
            .NET Core
          </Link>, and{" "}
          <Link href="/projects" className="font-medium text-text hover:text-primary transition-colors">
            Python
          </Link> backends.
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
            <Link href="/contact" className="font-medium text-text hover:text-primary transition-colors">
              Let&apos;s discuss how we can work together
            </Link>.
          </p>
        </div>
      )}
    </div>
  );
}

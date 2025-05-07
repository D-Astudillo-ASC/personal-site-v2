import { experiences } from "@/data/experience";
import { calculateYearsByEmploymentType } from "@/utils/experience";
import ExperienceCard from "@/components/experience/ExperienceCard";
import { formatDate } from "@/utils/date";

export default function About() {
  const { professional, internship } =
    calculateYearsByEmploymentType(experiences);

  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <h1 className="mb-8 text-4xl font-extralight">About Me</h1>

      {/* Introduction */}
      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-light">Introduction</h2>
        <p className="mb-4 font-light">
          I'm a software engineer with {professional} years of professional
          experience and {internship} years of internship experience, passionate
          about building beautiful and functional web applications. With
          expertise in modern web technologies, I create seamless user
          experiences and robust solutions.
        </p>
        <p className="font-light">
          When I'm not coding, you can find me exploring new technologies,
          contributing to open-source projects, or sharing my knowledge through
          technical writing.
        </p>
      </section>

      {/* Experience */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-light">Experience</h2>
        <div className="space-y-12">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-light">Skills</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-xl font-medium">Frontend</h3>
            <ul className="list-inside list-disc text-gray-600 dark:text-gray-300">
              <li>React / Next.js</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>HTML5 / CSS3</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-medium">Backend</h3>
            <ul className="list-inside list-disc text-gray-600 dark:text-gray-300">
              <li>Node.js</li>
              <li>Express</li>
              <li>PostgreSQL</li>
              <li>RESTful APIs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-light">Education</h2>
        <div>
          <h3 className="mb-2 text-xl font-medium">
            Bachelor of Arts in Computer Science and Mathematics
          </h3>
          <p className="font-light">
            Williams College • {formatDate(new Date("2017-09"))} - {formatDate(new Date("2022-06"))}
          </p>
        </div>
      </section>

      {/* Interests */}
      <section>
        <h2 className="mb-4 text-2xl font-light">Interests</h2>
        <p className="font-light">
          Beyond coding, I'm interested in [Your Interests]. I believe in
          continuous learning and staying up-to-date with the latest
          technologies and best practices in software development.
        </p>
      </section>
    </div>
  );
}

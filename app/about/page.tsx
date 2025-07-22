import { faCode, faGraduationCap, faLightbulb, faRocket } from "@/lib/fontawesome-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { experiences } from "@/data/experience";
import { calculateYearsByEmploymentType } from "@/utils/experience";
import dynamic from 'next/dynamic';
import { formatDate } from "@/utils/date";
import { Metadata } from "next";

const ExperienceCard = dynamic(() => import('@/components/experience/ExperienceCard'));
const ExperienceSummary = dynamic(() => import('@/components/experience/ExperienceSummary'));

export const metadata: Metadata = {
  title: "Daniel Astudillo | Software Engineer | Visa & Wayfair Experience",
  description: "Software Engineer with 3+ years experience at Visa and Wayfair. Expert in React, TypeScript, Spring Boot, .NET Core. Led migrations reducing technical debt by 10+ years. View portfolio, skills, and experience.",
  keywords: [
    "Daniel Astudillo Software Engineer",
    "Visa Software Engineer",
    "Wayfair Software Engineer", 
    "React TypeScript Developer",
    "Spring Boot Developer",
    ".NET Core Developer",
    "Full Stack Developer Portfolio",
    "Software Engineer Experience",
    "Payment Systems Developer",
    "Recommendation Engine Developer"
  ],
  openGraph: {
    title: "Daniel Astudillo | Software Engineer | Visa & Wayfair Experience",
    description: "Software Engineer with 3+ years experience at Visa and Wayfair. Expert in React, TypeScript, Spring Boot, .NET Core.",
  },
};

export default function About() {
  const { professional, internship, total } =
    calculateYearsByEmploymentType(experiences);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 pt-32">
      <ExperienceSummary
        professional={professional}
        internship={internship}
        total={total}
      />
      {/* Journey Section */}
      <section className="mb-16">
        <h2 className="mb-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extralight">My Journey</h2>
        <div className="space-y-6 text-base sm:text-lg font-thin text-text/80 leading-relaxed">
          <p>
            I&apos;ve always been fascinated by how things work — methodically taking them apart, understanding their inner mechanics, and putting them back together better. 
          </p>
          <p>
            When I got my first PC in 2008, I was instantly hooked — not just by the built-in games like <i>Minesweeper</i>, <i>Mahjong</i>, and <i>Purble Place</i>, but by the idea that this machine could do so much. I spent hours exploring every corner of it, from <i>Microsoft Paint</i> to the Control Panel and all of the internal drives that showed up in the <i>My Computer</i> window, curious about what made it all tick.
          </p>
          <p>
            That curiosity led me to embark on my journey as a programmer in 2015, when I was a sophomore in high school, with a <i> Khan Academy</i> account and a burning desire to learn about the forces that powered the World Wide Web.

            I advanced through the <i> Computer programming - JavaScript and the Web </i> course, and I was totally captivated by the magic of typing characters and watching something come to life in a browser.
            
            This spark quickly grew into a passion for building meaningful digital experiences and tools that solve real-world problems through the art of software engineering.
          </p>

          <p> Since then, I&apos;ve developed software across e-commerce, fintech, and infrastructure at companies like Wayfair and Visa — powering sales recommendations and efficiently routing customers in need of assistance to the most appropriate agents, building resilient backend systems at global scale, and ensuring reliability through test-driven development. </p>
          <p> 
            What drives me isn’t just the excitement of learning a new framework or solving a tough bug — it’s the idea that something I build could genuinely make someone’s day easier, faster, or more meaningful. That’s what keeps me coming back to the keyboard: the opportunity to turn ideas into tools people rely on. 
            Whether I’m designing backend systems, collaborating cross-functionally, or refining the user experience, I approach every challenge with one goal in mind: to create software that earns trust, delivers value, and makes a real-world difference.
          </p>      
        </div>
      </section>

      {/* Skills */}
      <section className="mb-16">
        <h2 className="mb-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extralight">Skills</h2>
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg sm:text-xl md:text-2xl font-thin">Frontend</h3>
            <ul className="list-inside list-disc text-base sm:text-lg font-thin text-text/70 leading-relaxed space-y-1">
              <li>React / Next.js</li>
              <li>TypeScript</li>
              <li>JavaScript</li>
              <li>Tailwind CSS</li>
              <li>HTML5 / CSS3</li>
              <li>Framer Motion</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg sm:text-xl md:text-2xl font-thin">Backend & APIs</h3>
            <ul className="list-inside list-disc text-base sm:text-lg font-thin text-text/70 leading-relaxed space-y-1">
              <li>Node.js / Express</li>
              <li>.NET Core 6.0</li>
              <li>Spring Boot</li>
              <li>Java 17</li>
              <li>C#</li>
              <li>Python</li>
              <li>RESTful APIs</li>
              <li>GraphQL</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg sm:text-xl md:text-2xl font-thin">Databases & Data</h3>
            <ul className="list-inside list-disc text-base sm:text-lg font-thin text-text/70 leading-relaxed space-y-1">
              <li>PostgreSQL</li>
              <li>MongoDB</li>
              <li>IBM DB2</li>
              <li>SQL Server</li>
              <li>BigQuery</li>
              <li>SQL</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg sm:text-xl md:text-2xl font-thin">Testing & Quality</h3>
            <ul className="list-inside list-disc text-base sm:text-lg font-thin text-text/70 leading-relaxed space-y-1">
              <li>JUnit</li>
              <li>Mockito</li>
              <li>Jest</li>
              <li>pytest</li>
              <li>unittest</li>
              <li>Postman</li>
              <li>Storybook</li>
              <li>Checkmarx</li>
              <li>SonarQube</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg sm:text-xl md:text-2xl font-thin">DevOps & Infrastructure</h3>
            <ul className="list-inside list-disc text-base sm:text-lg font-thin text-text/70 leading-relaxed space-y-1">
              <li>Docker</li>
              <li>Jenkins</li>
              <li>Apache ActiveMQ</li>
              <li>Turborepo</li>
              <li>Git</li>
              <li>CI/CD</li>
              <li>AWS EC2</li>
              <li>AWS S3</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg sm:text-xl md:text-2xl font-thin">IDEs & Development Tools</h3>
            <ul className="list-inside list-disc text-base sm:text-lg font-thin text-text/70 leading-relaxed space-y-1">
              <li>Visual Studio Code</li>
              <li>Cursor</li>
              <li>Visual Studio</li>
              <li>IntelliJ IDEA</li>
              <li>DataGrip</li>
              <li>Rider</li>
              <li>WebStorm</li>
              <li>PyCharm</li>
              <li>npm / yarn</li>
              <li>Maven</li>
              <li>NuGet</li>
              <li>pip</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Experience Section - Moved up */}
      <section className="mb-16">
        <h2 className="mb-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extralight">Experience</h2>
        <div className="space-y-8">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <h2 className="mb-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extralight">What I Value</h2>
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <FontAwesomeIcon icon={faCode} className="h-6 w-6 text-text/70" />
              <h3 className="text-xl sm:text-2xl font-thin">Clean Code</h3>
            </div>
            <p className="text-base sm:text-lg font-thin text-text/70 leading-relaxed">
              I believe in writing code that&apos;s not just functional, but also maintainable, readable, and scalable. Good code is like a well-written story—it should be easy to understand and a pleasure to work with.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <FontAwesomeIcon icon={faLightbulb} className="h-6 w-6 text-text/70" />
              <h3 className="text-xl sm:text-2xl font-thin">Continuous Learning</h3>
            </div>
            <p className="text-base sm:text-lg font-thin text-text/70 leading-relaxed">
              Technology is always evolving, and so am I. I&apos;m constantly exploring new tools, frameworks, and methodologies to stay at the forefront of web development.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <FontAwesomeIcon icon={faRocket} className="h-6 w-6 text-text/70" />
              <h3 className="text-xl sm:text-2xl font-thin">User-Centric Design</h3>
            </div>
            <p className="text-base sm:text-lg font-thin text-text/70 leading-relaxed">
              Every line of code I write is with the end user in mind. I strive to create applications that are not just powerful, but also intuitive and enjoyable to use.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <FontAwesomeIcon icon={faGraduationCap} className="h-6 w-6 text-text/70" />
              <h3 className="text-xl sm:text-2xl font-thin">Knowledge Sharing</h3>
            </div>
            <p className="text-base sm:text-lg font-thin text-text/70 leading-relaxed">
              I believe in the power of community and knowledge sharing. Whether through code reviews, documentation, or mentoring, I&apos;m always looking to help others grow.
            </p>
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section className="mb-16">
        <h2 className="mb-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extralight">Beyond the Code</h2>
        <div className="space-y-6 text-base sm:text-lg font-thin text-text/80 leading-relaxed">
          <p>
            When I&apos;m not coding, you&apos;ll find me exploring new technologies or diving into the latest developments in web development. I&apos;m particularly interested in performance optimization and creating seamless user experiences.
          </p>
          <p>
            I&apos;m always excited to connect with fellow developers, share knowledge, and collaborate on interesting projects. Feel free to reach out if you&apos;d like to discuss technology, potential collaborations, or just chat about the latest trends in web development.
          </p>
        </div>
      </section>

      {/* Education */}
      <section className="mb-16">
        <h2 className="mb-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extralight">Education</h2>
        <div>
          <h3 className="mb-2 text-xl sm:text-2xl font-thin">
            Bachelor of Arts in Computer Science and Mathematics
          </h3>
          <p className="text-base sm:text-lg font-thin text-text/70">
            Williams College &bull; {formatDate(new Date("2017-09"))} -{" "}
            {formatDate(new Date("2022-06"))}
          </p>
        </div>
      </section>
    </div>
  );
}

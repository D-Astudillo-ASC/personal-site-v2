import React from "react";
import Link from "next/link";

const Hero = React.memo(() => {
  return (
    <section
      className="flex min-h-[80vh] flex-col items-center justify-center px-4"
      role="banner"
    >
      <h1 className="mb-4 text-center text-4xl sm:text-5xl md:text-6xl font-extralight">
        Daniel Astudillo
      </h1>
      <p className="mb-8 text-center text-lg sm:text-2xl font-thin text-text/70">
        Software Engineer
      </p>
      <div className="flex gap-4">
        <Link
          href="/projects"
          className="text-lg font-thin px-6 py-2 rounded border border-border/50 ext-text/70 hover:text-text transition-standard cursor-pointer hover-scale"
        >
          View Projects
        </Link>
        <Link
          href="/contact"
          className="text-lg font-thin px-6 py-2 rounded border border-border/50 text-text/70 hover:text-text transition-standard cursor-pointer hover-scale"
        >
          Contact Me
        </Link>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;

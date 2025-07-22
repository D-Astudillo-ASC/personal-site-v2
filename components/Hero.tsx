import React from "react";
import Link from "next/link";

const Hero = React.memo(() => {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-4 md:px-16 lg:px-24" role="banner">
      <h1 className="mb-4 text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight md:animate-pulse">
        Daniel Astudillo
      </h1>
      <p className="mb-8 text-center text-xl sm:text-2xl md:text-3xl font-thin text-text/70 md:animate-pulse">
        Software Engineer
      </p>
      <div className="flex gap-4">
        <Link
          href="/projects"
          className="relative text-lg font-thin px-6 py-2 rounded border border-border/50 bg-text text-background transition-standard cursor-pointer hover:bg-text/90 hover-scale"
        >
          View Projects
        </Link>
        <Link
          href="/contact"
          className="relative text-lg font-thin px-6 py-2 rounded border border-border/50 text-text/70 hover:text-text transition-standard cursor-pointer hover-scale"
        >
          Contact Me
        </Link>
      </div>
    </section>
  );
});

export default Hero; 
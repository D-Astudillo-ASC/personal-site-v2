import { Experience } from "@/types/experience";

export const experiences: Experience[] = [
  {
    id: "exp_1",
    title: "Software Engineer",
    company: "Visa, Inc.",
    location: "Miami, FL",
    employmentType: "Professional",
    startDate: new Date("2022-09-13"),
    endDate: new Date("2025-02-03"),
    description: [
      "Developed and maintained web applications using React, Next.js, and TypeScript",
      "Implemented responsive designs and ensured cross-browser compatibility",
      "Collaborated with designers and product managers to deliver high-quality features",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "exp_2",
    title: "Software Engineer Intern",
    company: "Wayfair, Inc.",
    location: "Boston, MA",
    employmentType: "Internship",
    startDate: new Date("2022-06"),
    endDate: new Date("2022-08"),
    description: [
      "Developed and maintained web applications using React, Next.js, and TypeScript",
      "Implemented responsive designs and ensured cross-browser compatibility",
      "Collaborated with designers and product managers to deliver high-quality features",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "exp_3",
    title: "Software Developer Intern",
    company: "RestEasy, Inc.",
    location: "New York, NY (Remote)",
    employmentType: "Internship",
    startDate: new Date("2020-09"),
    endDate: new Date("2021-07"),
    description: [
      "Developed and maintained web applications using React, Next.js, and TypeScript",
      "Implemented responsive designs and ensured cross-browser compatibility",
      "Collaborated with designers and product managers to deliver high-quality features",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  // Add more experience entries as needed
];

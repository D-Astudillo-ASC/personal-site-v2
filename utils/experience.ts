import { Experience } from "@/types/experience";

export interface EmploymentExperience {
  professional: number;
  internship: number;
  total: number;
}

export function calculateYearsOfExperience(experiences: Experience[]): number {
  if (experiences.length === 0) return 0;

  // Sort experiences by start date
  const sortedExperiences = [...experiences].sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  const firstExperience = sortedExperiences[0];
  const lastExperience = sortedExperiences[sortedExperiences.length - 1];

  const startDate = new Date(firstExperience.startDate);
  const endDate = lastExperience.endDate 
    ? new Date(lastExperience.endDate)
    : new Date();

  // Calculate total months
  const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
    (endDate.getMonth() - startDate.getMonth());

  // Convert to years with one decimal place
  return Math.round((months / 12) * 10) / 10;
}

export function calculateYearsByEmploymentType(experiences: Experience[]): EmploymentExperience {
  const professionalExperiences: Experience[] = experiences.filter(exp => exp.employmentType === "Professional");
  const internshipExperiences: Experience[] = experiences.filter(exp => exp.employmentType === "Internship");

  const yearsProfessional = calculateYearsOfExperience(professionalExperiences);
  const yearsInternship = calculateYearsOfExperience(internshipExperiences);
  const totalYears = yearsProfessional + yearsInternship;

  return {
    professional: yearsProfessional,
    internship: yearsInternship,
    total: totalYears
  };
} 
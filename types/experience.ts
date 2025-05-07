import { EmploymentType } from "@/types/employment";

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  employmentType: EmploymentType;
  startDate: Date;
  endDate?: Date;
  description: string[];
  technologies: string[];
}

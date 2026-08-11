import type { ComponentType, SVGProps } from "react";

/** Any SVG icon component (lucide-react icons or custom brand SVGs). */
export type Icon = ComponentType<SVGProps<SVGSVGElement>>;

export type ProjectCategory =
  | "Full-Stack"
  | "Mobile"
  | "Machine Learning"
  | "Cybersecurity";

export type SkillLevel = "Basic" | "Intermediate" | "Advanced" | "Expert";

export interface NavItem {
  label: string;
  href: string;
}

export interface Skill {
  name: string;
  icon: Icon;
  /** Optional self-assessed proficiency, shown as a small labeled badge. */
  level?: SkillLevel;
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: Icon;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  /** Extra screenshots shown in the lightbox gallery (the main `image` is always included). */
  gallery?: string[];
  categories: ProjectCategory[];
  technologies: string[];
  features: string[];
  period: string;
  github?: string;
  demo?: string;
  /** e.g. "Final BSc project", "A+", "Featured" */
  highlight?: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface DetailItem {
  label: string;
  value: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  details: DetailItem[];
}

export interface Service {
  title: string;
  description: string;
  icon: Icon;
  points: string[];
}

export interface Stat {
  value: string;
  label: string;
  icon: Icon;
}

export interface GithubRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
}

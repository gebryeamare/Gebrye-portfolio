import {
  Atom,
  BadgeCheck,
  Blocks,
  Brain,
  Braces,
  Briefcase,
  Code2,
  Coffee,
  Container,
  Database,
  DatabaseBackup,
  DatabaseZap,
  Droplet,
  FileCode,
  FileCode2,
  Flame,
  GitBranch,
  Globe,
  GraduationCap,
  HeartPulse,
  Hexagon,
  LayoutDashboard,
  Layers,
  Leaf,
  MonitorSmartphone,
  Palette,
  PenTool,
  Plug,
  Route,
  Send,
  Server,
  Shapes,
  Shield,
  ShieldCheck,
  Ship,
  ShoppingBag,
  Smartphone,
  Sprout,
  SquareCode,
  Terminal,
  Triangle,
  Webhook,
  Wind,
  Zap,
} from "lucide-react";

import type {
  EducationItem,
  ExperienceItem,
  GithubRepo,
  NavItem,
  Project,
  Service,
  SkillCategory,
  Stat,
} from "@/types";

/* ------------------------------------------------------------------ */
/*  Site-wide configuration                                            */
/*  → Replace the placeholder values below with the real ones.         */
/* ------------------------------------------------------------------ */
export const SITE = {
  name: "Gebrye Amare",
  firstName: "Gebrye",
  lastName: "Amare",
  title: "Computer Engineer & Full-Stack Developer",
  headline:
    "Computer Engineer | Full-Stack Developer | Mobile App Developer | ML & Cybersecurity Enthusiast",
  intro:
    "I build intelligent, scalable, and user-focused digital solutions using modern web technologies, mobile development, machine learning, and secure software engineering.",
  tagline: "Building intelligent, secure, and modern digital solutions.",
  // Site URL. Override at build time with NEXT_PUBLIC_SITE_URL — defaults to
  // the Vercel preview URL until a custom domain is connected.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gebrye-portfolio.vercel.app",
  email: "gebryeamare5@gmail.com",
  location: "Ethiopia",
  github: "https://github.com/gebryeamare",
  githubUsername: "gebryeamare",
  // PLACEHOLDER — replace with the real LinkedIn profile URL.
  linkedin: "https://www.linkedin.com/in/gebryeamare",
  resume: {
    // Path to the CV file. Replace to swap it out.
    url: "/Gebrye_Amare_Certificates_Graduation_CV-4.pdf",
    fileName: "Gebrye_Amare_Certificates_Graduation_CV-4.pdf",
  },
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
export const HERO = {
  badge: "Available for opportunities",
  roles: [
    "Computer Engineer",
    "Full-Stack Developer",
    "Mobile App Developer",
    "ML & Cybersecurity Enthusiast",
  ],
};

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */
export const ABOUT = {
  paragraph1:
    "I am Gebrye Amare, a BSc Electrical and Computer Engineering graduate with a specialization in Computer Engineering. I build products across the full stack — from responsive web applications to mobile apps and machine-learning-powered systems — always with security and clean engineering in mind.",
  paragraph2:
    "My final-year project, an intelligent patient triage and appointment management system, was graded A+, reflecting my ability to combine modern web technologies with machine learning to solve real problems.",
  // PLACEHOLDER — swap /profile.svg for /profile.jpg once a real photo is available.
  image: "/profile.svg",
  imageAlt: "Portrait placeholder for Gebrye Amare",
  technologies: [
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Python",
    "Flutter",
    "Node.js",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Machine Learning",
  ],
};

export const STATS: Stat[] = [
  { value: "BSc", label: "Computer Engineering", icon: GraduationCap },
  { value: "5+", label: "Major Projects", icon: Briefcase },
  { value: "Full-Stack", label: "Web Development", icon: Layers },
  { value: "Mobile", label: "App Development", icon: Smartphone },
  { value: "ML", label: "Machine Learning", icon: Brain },
];

/* ------------------------------------------------------------------ */
/*  Skills                                                             */
/*  Proficiency levels are self-assessed and shown as labeled badges.  */
/* ------------------------------------------------------------------ */
export const SKILLS_NOTE =
  "Proficiency levels shown are self-assessed, not benchmarked.";

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    description: "Core languages I write production code in.",
    icon: Code2,
    skills: [
      { name: "Java", icon: Coffee, level: "Intermediate" },
      { name: "JavaScript", icon: Braces, level: "Advanced" },
      { name: "TypeScript", icon: FileCode2, level: "Advanced" },
      { name: "Python", icon: FileCode, level: "Advanced" },
    ],
  },
  {
    title: "Frontend",
    description: "Interfaces that are fast, accessible, and polished.",
    icon: LayoutDashboard,
    skills: [
      { name: "HTML", icon: FileCode, level: "Advanced" },
      { name: "CSS", icon: Palette, level: "Advanced" },
      { name: "Tailwind CSS", icon: Wind, level: "Advanced" },
      { name: "Bootstrap", icon: Shapes, level: "Advanced" },
      { name: "React", icon: Atom, level: "Advanced" },
      { name: "Next.js", icon: Triangle, level: "Advanced" },
      { name: "Flutter", icon: Droplet, level: "Intermediate" },
    ],
  },
  {
    title: "Backend",
    description: "APIs, business logic, and server-side architecture.",
    icon: Server,
    skills: [
      { name: "Node.js", icon: Hexagon, level: "Advanced" },
      { name: "Express.js", icon: Route, level: "Advanced" },
      { name: "Django", icon: ShieldCheck, level: "Intermediate" },
      { name: "Laravel", icon: Ship, level: "Basic" },
      { name: "Spring Boot", icon: Leaf, level: "Basic" },
    ],
  },
  {
    title: "Databases",
    description: "Relational and NoSQL data modeling and queries.",
    icon: Database,
    skills: [
      { name: "PostgreSQL", icon: Database, level: "Intermediate" },
      { name: "MySQL", icon: DatabaseBackup, level: "Intermediate" },
      { name: "MongoDB", icon: DatabaseZap, level: "Intermediate" },
      { name: "Firebase", icon: Flame, level: "Intermediate" },
    ],
  },
  {
    title: "Tools",
    description: "The workflow tools I use every day.",
    icon: Terminal,
    skills: [
      { name: "Git", icon: GitBranch, level: "Advanced" },
      { name: "GitHub", icon: GitBranch, level: "Advanced" },
      { name: "VS Code", icon: SquareCode, level: "Advanced" },
      { name: "Docker", icon: Container, level: "Basic" },
      { name: "Figma", icon: PenTool, level: "Intermediate" },
      { name: "Postman", icon: Send, level: "Intermediate" },
    ],
  },
  {
    title: "Specializations",
    description: "Areas I focus on and enjoy the most.",
    icon: Zap,
    skills: [
      { name: "Full-Stack Development", icon: Layers, level: "Advanced" },
      { name: "Mobile App Development", icon: Smartphone, level: "Intermediate" },
      { name: "Machine Learning", icon: Brain, level: "Intermediate" },
      { name: "Cybersecurity", icon: Shield, level: "Intermediate" },
      { name: "Database Design", icon: Database, level: "Intermediate" },
      { name: "API Development", icon: Plug, level: "Advanced" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Projects                                                           */
/* ------------------------------------------------------------------ */
export const PROJECT_FILTERS = [
  "All",
  "Full-Stack",
  "Mobile",
  "Machine Learning",
  "Cybersecurity",
] as const;

export const PROJECTS: Project[] = [
  {
    id: "patient-triage",
    title: "Intelligent Patient Triage & Appointment Management System",
    description:
      "An intelligent web-based healthcare platform that uses machine learning to support patient triage and appointment management.",
    image: "/covers/patient-triage/cover.png",
    alt: "Intelligent Patient Triage and Appointment Management System cover",
    gallery: [
      "/covers/patient-triage/cover.png",
      "/covers/patient-triage/cover-2.png",
      "/covers/patient-triage/cover-3.png",
    ],
    categories: ["Full-Stack", "Machine Learning"],
    technologies: ["Next.js", "React", "TypeScript", "Machine Learning", "Node.js", "PostgreSQL"],
    features: [
      "Intelligent patient triage",
      "Appointment management",
      "Patient workflow",
      "Doctor workflow",
      "Admin dashboard",
      "Machine learning integration",
    ],
    period: "03/2026 – 05/2026",
    highlight: "Final BSc project · Grade A+",
    github: "https://github.com/gebryeamare",
    demo: "https://github.com/gebryeamare",
  },
  {
    id: "mesob-gebeya",
    title: "Mesob Gebeya (መሶብ ገበያ)",
    description:
      "A full-stack Ethiopian e-commerce platform designed to provide a modern online marketplace experience, with a companion mobile app for shopping on the go.",
    image: "/covers/mesob-gebeya/cover.png",
    alt: "Mesob Gebeya e-commerce platform cover",
    gallery: [
      "/covers/mesob-gebeya/cover.png",
      "/covers/mesob-gebeya/cover-2.png",
    ],
    categories: ["Full-Stack", "Mobile"],
    technologies: ["Next.js", "React", "TypeScript", "PostgreSQL", "Node.js", "Tailwind CSS", "Flutter", "React Native", "Android"],
    features: [
      "Product management",
      "User authentication",
      "Shopping cart",
      "Orders",
      "Product search",
      "Categories",
      "Admin dashboard",
      "PostgreSQL database",
      "Cross-platform mobile app",
    ],
    period: "07/2026 – 08/2026",
    github: "https://github.com/gebryeamare",
    demo: "https://github.com/gebryeamare",
  },
  {
    id: "ethio-agri",
    title: "Ethio-Agri",
    description:
      "An Ethiopian agriculture-focused intelligent platform designed to help farmers identify agricultural diseases and access useful agricultural information — available as a web platform and a mobile app for use out in the field.",
    image: "/covers/ethio-agri/cover.png",
    alt: "Ethio-Agri crop disease detection platform cover",
    categories: ["Machine Learning", "Full-Stack", "Mobile"],
    technologies: ["Python", "Machine Learning", "Next.js", "React", "PostgreSQL", "TensorFlow", "Flutter", "React Native", "Android"],
    features: [
      "Crop disease detection",
      "Agricultural disease prediction",
      "Farmer-focused interface",
      "Agricultural information",
      "Mobile app for on-the-go use",
      "Future support for fruits, vegetables, crops, and domestic animals",
    ],
    period: "03/2025 – 06/2025",
    github: "https://github.com/gebryeamare",
    demo: "https://github.com/gebryeamare",
  },
  {
    id: "cyber-risk",
    title: "Cybersecurity Risk Analysis System",
    description:
      "A machine-learning-based system designed to analyze cybersecurity risks and provide intelligent risk insights.",
    image: "/covers/cyber-risk/cover.png",
    alt: "Cybersecurity Risk Analysis System cover",
    gallery: [
      "/covers/cyber-risk/cover.png",
      "/covers/cyber-risk/cover-2.png",
    ],
    categories: ["Cybersecurity", "Machine Learning"],
    technologies: ["Next.js", "Machine Learning", "Python", "TypeScript", "Data Analysis"],
    features: [
      "Cybersecurity risk analysis",
      "Intelligent risk insights",
      "ML-based risk prediction",
      "Data analysis workflows",
    ],
    period: "09/2025 – 01/2026",
    github: "https://github.com/gebryeamare",
    demo: "https://github.com/gebryeamare",
  },
  {
    id: "advanced-school-management",
    title: "Advanced School Management System",
    description:
      "A comprehensive school management platform that centralizes student records, attendance, grades, and communication for schools.",
    image: "/covers/advanced-school-management/cover.png",
    alt: "Advanced School Management System cover",
    categories: ["Full-Stack"],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
    features: [
      "Student & staff records",
      "Attendance tracking",
      "Grades & report cards",
      "Class & schedule management",
      "Parent communication",
      "Admin dashboard",
    ],
    period: "2026",
    github: "https://github.com/gebryeamare",
    demo: "https://github.com/gebryeamare",
  },
  {
    id: "ahadu-garage",
    title: "Ahadu Garage Management System",
    description:
      "A digital garage management platform for booking vehicle services, tracking maintenance history, and managing customers.",
    image: "/covers/ahadu-garage/cover.png",
    alt: "Ahadu Garage Management System cover",
    categories: ["Full-Stack"],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
    features: [
      "Service booking",
      "Vehicle & customer records",
      "Maintenance history",
      "Job status tracking",
      "Billing & payments",
      "Admin dashboard",
    ],
    period: "2026",
    github: "https://github.com/gebryeamare",
    demo: "https://github.com/gebryeamare",
  },
];

/* ------------------------------------------------------------------ */
/*  Experience                                                         */
/* ------------------------------------------------------------------ */
export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Software / Full-Stack Development Intern",
    organization: "Information Network Security Administration (INSA)",
    period: "09/2025 – 01/2026",
    description:
      "Worked on a cybersecurity risk analysis system using modern web technologies and machine learning concepts.",
    technologies: ["Next.js", "TypeScript", "Machine Learning", "Web Development"],
  },
];

/* ------------------------------------------------------------------ */
/*  Education                                                          */
/* ------------------------------------------------------------------ */
export const EDUCATION: EducationItem[] = [
  {
    institution: "Haramaya University",
    degree: "BSc in Electrical and Computer Engineering — Computer Engineering",
    period: "Graduated 2026",
    details: [
      { label: "CGPA", value: "3.66 / 4.00" },
      {
        label: "Final Project",
        value:
          "Web-Based Intelligent Patient Triage and Appointment Management System Using Machine Learning",
      },
      { label: "Final Project Grade", value: "A+" },
      { label: "Exit Exam Result", value: "78.75" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Services                                                           */
/* ------------------------------------------------------------------ */
export const SERVICES: Service[] = [
  {
    title: "Full-Stack Web Development",
    description:
      "Build scalable and responsive web applications using Next.js, React, Node.js, and databases.",
    icon: Layers,
    points: ["Next.js & React SPAs", "RESTful integrations", "Responsive UIs"],
  },
  {
    title: "Mobile App Development",
    description: "Build modern mobile applications using Flutter.",
    icon: MonitorSmartphone,
    points: ["Cross-platform apps", "Clean UI & state", "API-connected mobile apps"],
  },
  {
    title: "Machine Learning Solutions",
    description:
      "Develop intelligent systems for prediction, classification, and data analysis.",
    icon: Brain,
    points: ["Predictive models", "Classification systems", "Data-driven insights"],
  },
  {
    title: "API & Backend Development",
    description: "Build secure REST APIs and backend services.",
    icon: Plug,
    points: ["Secure REST APIs", "Auth & validation", "Scalable services"],
  },
  {
    title: "Database Design",
    description: "Design and implement relational and NoSQL databases.",
    icon: Database,
    points: ["PostgreSQL / MySQL", "MongoDB / Firebase", "Schema & indexing"],
  },
  {
    title: "Cybersecurity Solutions",
    description: "Develop security-focused software and cybersecurity analysis systems.",
    icon: Shield,
    points: ["Risk analysis systems", "Secure engineering", "Security audits"],
  },
];

/* ------------------------------------------------------------------ */
/*  GitHub section                                                     */
/*  Static fallback used when the GitHub API is unreachable or the     */
/*  profile is not yet available. Replace with real repos as needed.   */
/* ------------------------------------------------------------------ */
export const GITHUB_FALLBACK_REPOS: GithubRepo[] = [
  {
    name: "patient-triage-system",
    description: "Intelligent patient triage and appointment management system (final BSc project).",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    url: "https://github.com/gebryeamare",
  },
  {
    name: "mesob-gebeya",
    description: "Full-stack Ethiopian e-commerce platform with a cross-platform mobile app, built with Next.js, PostgreSQL, and Flutter.",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    url: "https://github.com/gebryeamare",
  },
  {
    name: "ethio-agri",
    description: "Agriculture-focused intelligent platform for crop disease detection, with a mobile app for on-the-go use.",
    language: "Python",
    stars: 0,
    forks: 0,
    url: "https://github.com/gebryeamare",
  },
  {
    name: "cyber-risk-analysis",
    description: "Machine-learning-based cybersecurity risk analysis system.",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    url: "https://github.com/gebryeamare",
  },
  {
    name: "advanced-school-management",
    description: "Comprehensive school management platform for records, attendance, and grades.",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    url: "https://github.com/gebryeamare",
  },
  {
    name: "ahadu-garage",
    description: "Garage management platform for service bookings and maintenance tracking.",
    language: "TypeScript",
    stars: 0,
    forks: 0,
    url: "https://github.com/gebryeamare",
  },
];

export const GITHUB_TECHNOLOGIES = [
  "Next.js",
  "React",
  "TypeScript",
  "Flutter",
  "React Native",
  "Python",
  "Machine Learning",
  "PostgreSQL",
];

export const GITHUB_PROJECT_COUNT = "5+";

/* ------------------------------------------------------------------ */
/*  Export a few frequently used icons for convenience                 */
/* ------------------------------------------------------------------ */
export const ICONS = {
  badge: BadgeCheck,
  heart: HeartPulse,
  cart: ShoppingBag,
  sprout: Sprout,
  globe: Globe,
  blocks: Blocks,
  webhook: Webhook,
} as const;

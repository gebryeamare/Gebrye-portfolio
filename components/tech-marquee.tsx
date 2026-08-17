import {
  Atom,
  Brain,
  Braces,
  Container,
  Database,
  FileCode,
  Flame,
  GitBranch,
  Layers,
  MonitorSmartphone,
  Shield,
  Terminal,
  Triangle,
  Wind,
  type LucideIcon,
  BrainIcon,
} from "lucide-react";

const MARQUEE_ITEMS: Array<{ label: string; icon: LucideIcon }> = [
  { label: "Next.js", icon: Triangle },
  { label: "React", icon: Atom },
  { label: "TypeScript", icon: Braces },
  { label: "Python", icon: FileCode },
  { label: "Flutter", icon: MonitorSmartphone },
  { label: "Node.js", icon: Terminal },
  { label: "PostgreSQL", icon: Database },
  { label: "MongoDB", icon: Database },
  { label: "Firebase", icon: Flame },
  { label: "Machine Learning", icon: Brain },
  { label: "Cybersecurity", icon: Shield },
  { label: "Docker", icon: Container },
{label:"pytorch",icon:BrainIcon },
  { label: "Tailwind CSS", icon: Wind },
  { label: "Git", icon: GitBranch },
  { label: "Full-Stack", icon: Layers },
];

function MarqueeRow() {
  return (
    <div className="marquee-track">
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className="flex shrink-0 items-center"
        >
          {MARQUEE_ITEMS.map((item) => (
            <li
              key={`${copy}-${item.label}`}
              className="flex items-center gap-2.5 px-6 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:px-8"
            >
              <item.icon className="size-4 text-indigo-500/80 dark:text-indigo-300/80" />
              {item.label}
              <span className="ml-6 size-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 opacity-60 sm:ml-8" />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default function TechMarquee() {
  return (
    <div
      aria-label="Technologies I work with"
      className="relative border-y border-border/50 bg-card/30 py-5 backdrop-blur-md"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />
      <div className="marquee">
        <MarqueeRow />
      </div>
    </div>
  );
}

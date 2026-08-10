import { Info } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SKILL_CATEGORIES, SKILLS_NOTE } from "@/lib/data";
import type { SkillLevel } from "@/types";
import { cn } from "@/lib/utils";

const LEVEL_STYLES: Record<SkillLevel, string> = {
  Basic: "bg-slate-500/10 text-slate-600 dark:text-slate-300",
  Intermediate: "bg-sky-500/10 text-sky-600 dark:text-sky-300",
  Advanced: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300",
  Expert: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
};

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-24 sm:py-28">
      <div className="container-section">
        <SectionHeading
          index={1}
          eyebrow="Skills"
          title="A modern, full-stack toolkit"
          description="From languages and frameworks to databases, tools, and specialized areas — here is what I work with every day."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {SKILL_CATEGORIES.map((category, index) => (
            <Reveal key={category.title} delay={(index % 3) * 0.08}>
              <article className="glass-card glass-card-hover group flex h-full flex-col rounded-2xl p-6">
                <header className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600/15 to-sky-500/15 ring-1 ring-indigo-500/20 transition-transform duration-300 group-hover:scale-105">
                    <category.icon className="size-5 text-indigo-600 dark:text-indigo-300" />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold tracking-tight">
                      {category.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </header>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 text-sm font-medium backdrop-blur-sm transition-colors hover:border-indigo-500/40 hover:bg-indigo-500/5"
                    >
                      <skill.icon className="size-3.5 text-indigo-500" />
                      {skill.name}
                      {skill.level && (
                        <span
                          className={cn(
                            "ml-0.5 rounded-full px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide",
                            LEVEL_STYLES[skill.level]
                          )}
                        >
                          {skill.level}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-8 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
            <Info className="size-3.5" />
            {SKILLS_NOTE}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

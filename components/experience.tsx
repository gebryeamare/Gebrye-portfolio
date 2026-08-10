import { Briefcase, Building2, CalendarDays } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { EXPERIENCE } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-24 sm:py-28">
      <div className="container-section">
        <SectionHeading
          index={4}
          eyebrow="Experience"
          title="Where I've worked"
          description="Professional experience building real software with modern tools."
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Timeline line */}
          <div
            aria-hidden="true"
            className="absolute bottom-2 left-5 top-2 w-px bg-gradient-to-b from-indigo-500/60 via-sky-500/30 to-transparent sm:left-6"
          />

          {EXPERIENCE.map((item, index) => (
            <Reveal key={item.organization} delay={index * 0.1}>
              <article className="relative flex gap-5 pb-12 last:pb-0 sm:gap-7">
                {/* Node */}
                <div className="glass relative z-10 mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-indigo-500/30 shadow-lg shadow-indigo-500/20 sm:size-12">
                  <Briefcase className="size-4.5 text-indigo-500 sm:size-5" />
                </div>

                <div className="flex-1">
                  <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-heading text-lg font-bold tracking-tight">
                        {item.role}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-300">
                        <CalendarDays className="size-3.5" />
                        {item.period}
                      </span>
                    </div>
                    <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                      <Building2 className="size-4 text-indigo-500" />
                      {item.organization}
                    </p>
                    <p className="mt-3.5 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border bg-muted/50 px-2 py-1 text-[0.7rem] font-medium text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

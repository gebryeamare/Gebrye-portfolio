import { GraduationCap, Medal, Award } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { EDUCATION } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="scroll-mt-24 py-24 sm:py-28">
      <div className="container-section">
        <SectionHeading
          index={5}
          eyebrow="Education"
          title="Academic background"
          description="My university journey in computer engineering, where I built the foundations of my technical career."
        />

        <div className="mx-auto max-w-3xl">
          {EDUCATION.map((item, index) => (
            <Reveal key={item.institution} delay={index * 0.1}>
              <article className="relative flex gap-5 sm:gap-7">
                {/* Node */}
                <div className="glass relative z-10 mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-indigo-500/30 shadow-lg shadow-indigo-500/20 sm:size-12">
                  <GraduationCap className="size-4.5 text-indigo-500 sm:size-5" />
                </div>

                <div className="glass-card glass-card-hover flex-1 overflow-hidden rounded-2xl">
                  <div className="border-b border-border/60 bg-gradient-to-r from-indigo-600/5 to-sky-500/5 p-6 sm:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-heading text-xl font-bold tracking-tight">
                        {item.institution}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
                        <Award className="size-3.5" />
                        {item.period}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm font-medium text-muted-foreground">
                      {item.degree}
                    </p>
                  </div>

                  <dl className="grid gap-px bg-border/60 sm:grid-cols-2">
                    {item.details.map((detail) => (
                      <div
                        key={detail.label}
                        className="flex flex-col gap-1 bg-card p-5 sm:p-6"
                      >
                        <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          {detail.label === "Final Project Grade" ? (
                            <Medal className="size-3.5 text-amber-500" />
                          ) : (
                            <span className="size-1.5 rounded-full bg-indigo-500" />
                          )}
                          {detail.label}
                        </dt>
                        <dd className="text-sm leading-relaxed font-medium">
                          {detail.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

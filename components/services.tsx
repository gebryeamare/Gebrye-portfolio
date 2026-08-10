import { Check } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SERVICES } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-24 sm:py-28">
      <div className="container-section">
        <SectionHeading
          index={6}
          eyebrow="Services"
          title="What I can build"
          description="End-to-end development services — from idea and architecture to a polished, deployable product."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={(index % 3) * 0.08}>
              <article className="glass-card glass-card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl p-6">
                {/* Corner glow on hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full bg-gradient-to-br from-indigo-500/15 to-sky-500/15 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600/15 to-sky-500/15 ring-1 ring-indigo-500/20 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                  <service.icon className="size-5.5 text-indigo-600 dark:text-indigo-300" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-bold tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <ul className="mt-4 flex flex-col gap-1.5 border-t border-border/60 pt-4">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-xs font-medium text-muted-foreground"
                    >
                      <span className="flex size-4 items-center justify-center rounded-full bg-indigo-500/10">
                        <Check className="size-2.5 text-indigo-500" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ABOUT, SITE, STATS } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 sm:py-28">
      <div className="container-section">
        <SectionHeading
          index={0}
          eyebrow="About Me"
          title="Engineer by training. Builder by passion."
          description="Computer engineering graduate focused on delivering real value through full-stack, mobile, and intelligent systems."
        />

        <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Profile card */}
          <Reveal className="relative mx-auto w-full max-w-sm lg:sticky lg:top-28">
            <div className="glass-card relative overflow-hidden rounded-3xl p-3 shadow-xl shadow-indigo-950/10">
              {/* Gradient frame */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-600/10 via-transparent to-sky-500/10" />
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={ABOUT.image}
                  alt={ABOUT.imageAlt}
                  width={480}
                  height={560}
                  className="aspect-[4/5] w-full object-cover"
                  priority
                />
              </div>
              {/* Floating badge */}
              <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-background/85 px-3.5 py-2 text-xs font-semibold shadow-lg backdrop-blur">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                Open to opportunities
              </div>
              <div className="glass relative mt-3 flex items-center justify-between rounded-2xl border border-border/60 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold">{SITE.name}</p>
                  <p className="text-xs text-muted-foreground">
                    BSc Electrical &amp; Computer Engineering
                  </p>
                </div>
                <ArrowUpRight className="size-5 text-indigo-500" />
              </div>
            </div>
          </Reveal>

          {/* Bio + stats */}
          <div className="flex flex-col gap-8">
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                <p>{ABOUT.paragraph1}</p>
                <p>{ABOUT.paragraph2}</p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Technologies I work with
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {ABOUT.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="glass rounded-full border border-border/60 px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-indigo-500/40 hover:bg-indigo-500/5"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="glass-card glass-card-hover group relative overflow-hidden rounded-2xl p-5"
                  >
                    <stat.icon className="size-5 text-indigo-500 transition-transform duration-300 group-hover:scale-110" />
                    <p className="mt-3 font-heading text-2xl font-bold tracking-tight">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

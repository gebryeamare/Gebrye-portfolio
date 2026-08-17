import { Download, Eye, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/data";

export default function Resume() {
  return (
    <section id="resume" className="scroll-mt-24 py-24 sm:py-28">
      <div className="container-section">
        <Reveal>
          <div className="glass-card relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12 sm:py-16">
            {/* Decorative glows */}
            <div
              aria-hidden="true"
              className="absolute -left-24 -top-24 size-64 rounded-full bg-indigo-500/15 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -right-24 size-64 rounded-full bg-sky-500/15 blur-3xl"
            />
            <div className="relative">
              <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-500 text-white shadow-lg shadow-indigo-500/30">
                <FileText className="size-6" />
              </span>
              <h2 className="mt-6 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                Interested in working together?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Download my resume to learn more about my education, experience,
                technical skills, and projects.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg" className="group rounded-full px-7">
                  <a
                    href={SITE.resume.url}
                    download={SITE.resume.fileName}
                  >
                    <Download className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                    Download CV
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-7">
                  <a href={SITE.resume.url} target="_blank" rel="noopener noreferrer">
                    <Eye className="size-4" />
                    View CV
                  </a>
                </Button>
              </div>
              
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

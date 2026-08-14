"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FolderGit2,
  Images,
  Sparkles,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { GitHubIcon } from "@/components/social-icons";
import { PROJECTS, PROJECT_FILTERS } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

type Filter = (typeof PROJECT_FILTERS)[number];

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{
    project: Project;
    index: number;
  } | null>(null);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? PROJECTS
        : PROJECTS.filter((project) => project.categories.includes(filter)),
    [filter]
  );

  return (
    <section id="projects" className="scroll-mt-24 py-24 sm:py-28">
      <div className="container-section">
        <SectionHeading
          index={2}
          eyebrow="Featured Projects"
          title="Things I've built"
          description="A selection of my academic and personal projects — spanning full-stack web platforms, mobile apps, machine learning systems, and security analysis tools."
        />

        {/* Filters */}
        <div
          className="mb-12 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Filter projects by category"
        >
          {PROJECT_FILTERS.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setFilter(category);
                setExpanded(null);
              }}
              aria-pressed={filter === category}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                filter === category
                  ? "text-white"
                  : "glass border border-white/10 text-muted-foreground hover:border-indigo-500/40 hover:text-foreground"
              )}
            >
              {filter === category && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-sky-500"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{category}</span>
            </button>
          ))}
        </div>

        {/* Project cards */}
        <motion.div layout className="grid gap-8 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/15"
              >
                {/* Cover — click to open the screenshot gallery */}
                <button
                  type="button"
                  onClick={() =>
                    setLightbox({ project, index: 0 })
                  }
                  className="group/cover relative block aspect-[16/9] cursor-zoom-in overflow-hidden text-left"
                  aria-label={`${project.title} — open screenshot gallery`}
                >
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(min-width: 1024px) 576px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover/cover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover/cover:opacity-40" />
                  {project.highlight && (
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-indigo-600 shadow backdrop-blur dark:text-indigo-300">
                      <Sparkles className="size-3.5" />
                      {project.highlight}
                    </span>
                  )}
                  <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                    <CalendarDays className="size-3.5" />
                    {project.period}
                  </span>
                  {/* Zoom hint */}
                  <span className="absolute bottom-4 left-4 inline-flex translate-y-1 items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white opacity-0 backdrop-blur transition-all duration-300 group-hover/cover:translate-y-0 group-hover/cover:opacity-100">
                    <Images className="size-3.5" />
                    View screenshots
                  </span>
                </button>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="font-heading text-xl font-bold tracking-tight text-balance">
                    {project.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  {/* Features */}
                  <AnimatePresence initial={false}>
                    {expanded === project.id && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <li className="pt-4">
                          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                            Key features
                          </p>
                          <ul className="grid gap-1.5 sm:grid-cols-2">
                            {project.features.map((feature) => (
                              <li
                                key={feature}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-indigo-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </li>
                      </motion.ul>
                    )}
                  </AnimatePresence>

                  {/* Tech */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border/60 bg-card/50 px-2 py-1 text-[0.7rem] font-medium text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border/60 pt-5">
                    <ProjectLink
                      href={project.github}
                      label="GitHub"
                      icon={<GitHubIcon className="size-4" />}
                      unavailableLabel="GitHub link coming soon"
                    />
                    <ProjectLink
                      href={project.demo}
                      label="Live Demo"
                      icon={<ExternalLink className="size-4" />}
                      unavailableLabel="Live demo coming soon"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-auto rounded-full"
                      onClick={() =>
                        setExpanded(expanded === project.id ? null : project.id)
                      }
                      aria-expanded={expanded === project.id}
                    >
                      View Details
                      <ChevronDown
                        className={cn(
                          "size-4 transition-transform duration-300",
                          expanded === project.id && "rotate-180"
                        )}
                      />
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground"
          >
            <FolderGit2 className="size-8 text-muted-foreground/50" />
            No projects in this category yet — check back soon.
          </motion.p>
        )}
      </div>

      {/* Screenshot lightbox */}
      <AnimatePresence>
        {lightbox && (
          <ProjectLightbox
            project={lightbox.project}
            initialIndex={lightbox.index}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Lightbox                                                           */
/* ------------------------------------------------------------------ */

interface ProjectLightboxProps {
  project: Project;
  initialIndex: number;
  onClose: () => void;
}

function ProjectLightbox({
  project,
  initialIndex,
  onClose,
}: ProjectLightboxProps) {
  const images = useMemo(
    () => [project.image, ...(project.gallery ?? [])].filter(uniqueStrings),
    [project]
  );
  const [index, setIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const go = useCallback((dir: 1 | -1) => {
    setIndex((current) => {
      // Wrap around (0 -> last, last -> 0); safe even for a single image.
      return (current + dir + images.length) % images.length;
    });
  }, [images.length]);

  /* Lock body scroll + restore focus + restore scroll on unmount */
  useEffect(() => {
    const original = document.body.style.overflow;
    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
      previouslyFocusedRef.current?.focus();
    };
  }, []);

  /* Focus close button on open */
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  /* Keyboard navigation + focus trap */
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowRight") {
        go(1);
        return;
      }
      if (event.key === "ArrowLeft") {
        go(-1);
        return;
      }
      // Keep Tab cycling inside the dialog.
      if (event.key === "Tab" && containerRef.current) {
        const focusable = containerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        if (event.shiftKey && (active === first || active === containerRef.current)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go, onClose]);

  const hasMultiple = images.length > 1;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} screenshot gallery`}
      onClick={onClose}
    >
      {/* Close */}
      <Button
        ref={closeButtonRef}
        type="button"
        variant="ghost"
        size="icon-sm"
        className="absolute right-4 top-4 z-10 size-10 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-white"
        onClick={onClose}
        aria-label="Close gallery"
      >
        <X className="size-5" />
      </Button>

      {/* Image */}
      <motion.figure
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex max-h-full w-full max-w-4xl flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-black/40 shadow-2xl ring-1 ring-white/15">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={images[index]}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={images[index]}
                alt={`${project.title} screenshot ${index + 1} of ${images.length}`}
                fill
                sizes="(min-width: 1024px) 896px, 100vw"
                className="object-contain"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next */}
          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-80 backdrop-blur transition-all duration-200 hover:scale-105 hover:bg-indigo-600/80 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-white sm:left-5"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-80 backdrop-blur transition-all duration-200 hover:scale-105 hover:bg-indigo-600/80 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-white sm:right-5"
                aria-label="Next screenshot"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
        </div>

        {/* Caption */}
        <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-white/90">
          <span className="font-medium">{project.title}</span>
          {hasMultiple ? (
            <span className="flex items-center gap-3">
              <span className="font-mono text-xs text-white/60">
                {index + 1} / {images.length}
              </span>
              {/* Thumbnails */}
              <span className="hidden items-center gap-1.5 sm:flex">
                {images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to screenshot ${i + 1}`}
                    className={cn(
                      "relative size-9 overflow-hidden rounded-md ring-2 transition-all duration-200",
                      i === index
                        ? "ring-indigo-500"
                        : "opacity-60 ring-transparent hover:opacity-100"
                    )}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </span>
            </span>
          ) : (
            <span className="font-mono text-xs text-white/60">1 / 1</span>
          )}
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}

function uniqueStrings(value: string, index: number, array: string[]) {
  return array.indexOf(value) === index;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

interface ProjectLinkProps {
  href?: string;
  label: string;
  icon: React.ReactNode;
  unavailableLabel: string;
}

function ProjectLink({ href, label, icon, unavailableLabel }: ProjectLinkProps) {
  if (href) {
    return (
      <Button variant="outline" size="sm" className="rounded-full" asChild>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label} — ${href}`}
        >
          {icon}
          {label}
        </a>
      </Button>
    );
  }
  return (
    <Button
      variant="outline"
      size="sm"
      className="cursor-not-allowed rounded-full opacity-55"
      disabled
      title={unavailableLabel}
    >
      {icon}
      {label}
    </Button>
  );
}

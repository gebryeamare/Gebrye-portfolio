"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GitHubIcon, LinkedInIcon } from "@/components/social-icons";
import { HERO, SITE } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* Deterministic decorative particles + code symbols */
const PARTICLES = [
  { left: "8%", top: "22%", size: 5, delay: 0 },
  { left: "16%", top: "68%", size: 4, delay: 1.2 },
  { left: "26%", top: "34%", size: 6, delay: 2.1 },
  { left: "38%", top: "78%", size: 4, delay: 0.6 },
  { left: "52%", top: "18%", size: 5, delay: 1.8 },
  { left: "64%", top: "62%", size: 6, delay: 0.9 },
  { left: "76%", top: "30%", size: 4, delay: 2.6 },
  { left: "84%", top: "72%", size: 5, delay: 1.4 },
  { left: "91%", top: "40%", size: 4, delay: 0.3 },
];

const CODE_SYMBOLS = [
  { symbol: "{ }", left: "12%", top: "46%", delay: 0 },
  { symbol: "</>", left: "70%", top: "12%", delay: 1.5 },
  { symbol: "=>", left: "88%", top: "58%", delay: 0.8 },
  { symbol: "()", left: "42%", top: "10%", delay: 2.2 },
  { symbol: "0x1F", left: "58%", top: "84%", delay: 1.1 },
  { symbol: "#", left: "24%", top: "86%", delay: 2.8 },
];

/* Code lines for the terminal visual */
const CODE_LINES: Array<Array<{ text: string; className: string }>> = [
  [
    { text: "const", className: "text-violet-500" },
    { text: " developer", className: "text-sky-500" },
    { text: " = {", className: "text-muted-foreground" },
  ],
  [
    { text: "  name:", className: "text-muted-foreground" },
    { text: " \"Gebrye Amare\",", className: "text-emerald-500" },
  ],
  [
    { text: "  role:", className: "text-muted-foreground" },
    { text: " \"Full-Stack Engineer\",", className: "text-emerald-500" },
  ],
  [
    { text: "  stack:", className: "text-muted-foreground" },
    { text: " [\"Next.js\", \"React\",", className: "text-amber-500" },
  ],
  [
    { text: "    \"TypeScript\", \"Python\"],", className: "text-amber-500" },
  ],
  [
    { text: "  passion:", className: "text-muted-foreground" },
    { text: " [\"Machine Learning\",", className: "text-rose-500" },
  ],
  [
    { text: "    \"Cybersecurity\"],", className: "text-rose-500" },
  ],
  [
    { text: "  openToWork:", className: "text-muted-foreground" },
    { text: " true", className: "text-indigo-400" },
  ],
  [{ text: "};", className: "text-muted-foreground" }],
];

const TECH_CHIPS = [
  { label: "Next.js", className: "left-[-1.25rem] top-10", delay: 0.6 },
  { label: "React", className: "right-[-1rem] top-1/4", delay: 0.9 },
  { label: "Python", className: "left-[-1rem] bottom-1/4", delay: 1.2 },
  { label: "Flutter", className: "right-[-0.75rem] bottom-12", delay: 1.5 },
  { label: "ML", className: "left-10 bottom-[-1.25rem]", delay: 1.8 },
  { label: "Security", className: "right-16 top-[-1.25rem]", delay: 2.1 },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden pb-20 pt-32 sm:pt-36"
    >
      {/* ---------- Animated background ---------- */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {/* Grid */}
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_35%,black,transparent)]" />
        {/* Gradient glows */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="absolute -top-32 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-3xl dark:bg-indigo-500/25"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
          className="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl dark:bg-sky-500/20"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
          className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/20"
        />
        {/* Rotating conic ring behind the terminal */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute right-[8%] top-[14%] hidden h-[28rem] w-[28rem] rounded-full opacity-25 blur-2xl lg:block"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(139,92,246,0.5) 80deg, transparent 160deg, rgba(56,189,248,0.5) 240deg, transparent 320deg)",
          }}
        />
        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-indigo-500/40 dark:bg-indigo-400/50"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
            animate={{ y: [0, -18, 0], opacity: [0.15, 0.7, 0.15] }}
            transition={{
              duration: 5 + (i % 4),
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
        {/* Floating code symbols */}
        {CODE_SYMBOLS.map((s, i) => (
          <motion.span
            key={i}
            className="absolute font-mono text-lg font-bold text-foreground/10 select-none dark:text-foreground/15"
            style={{ left: s.left, top: s.top }}
            animate={{ y: [0, -12, 0], rotate: [0, 4, 0] }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: s.delay,
              ease: "easeInOut",
            }}
          >
            {s.symbol}
          </motion.span>
        ))}
      </div>

      <div className="container-section grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        {/* ---------- Text ---------- */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-6"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-700 backdrop-blur-md dark:text-emerald-300"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {HERO.badge}
          </motion.span>

          <motion.h1
            variants={item}
            className="font-heading text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {SITE.firstName} <span className="text-gradient">{SITE.lastName}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="flex flex-wrap items-center gap-x-2 gap-y-1 text-base font-medium text-foreground/90 sm:text-lg"
          >
            {HERO.roles.map((role, i) => (
              <span key={role} className="flex items-center gap-2">
                <span className={i === 0 ? "text-gradient font-semibold" : ""}>
                  {role}
                </span>
                {i < HERO.roles.length - 1 && (
                  <span aria-hidden="true" className="text-indigo-400/70">
                    |
                  </span>
                )}
              </span>
            ))}
          </motion.p>

          <motion.p
            variants={item}
            className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {SITE.intro}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="group rounded-full px-6">
              <Link href="#projects">
                View My Projects
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-6">
              <Link href="#contact">
                <Mail className="size-4" />
                Contact Me
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-2 flex flex-wrap items-center gap-2.5"
          >
            <Button variant="ghost" size="sm" className="rounded-full" asChild>
              <a href={SITE.resume.url} download={SITE.resume.fileName}>
                <Download className="size-4" />
                Download CV
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="size-9 rounded-full"
              aria-label="GitHub profile"
              asChild
            >
              <a href={SITE.github} target="_blank" rel="noopener noreferrer">
                <GitHubIcon className="size-4.5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="size-9 rounded-full"
              aria-label="LinkedIn profile"
              asChild
            >
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon className="size-4.5" />
              </a>
            </Button>
            <span className="ml-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4 text-indigo-500" />
              {SITE.location}
            </span>
          </motion.div>
        </motion.div>

        {/* ---------- Visual ---------- */}
        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
      className="relative mx-auto w-full max-w-lg"
    >
      {/* Glow behind the card */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-indigo-500/25 via-sky-500/10 to-violet-500/25 blur-2xl"
      />

      {/* Code card */}
      <div className="glass-card overflow-hidden rounded-2xl shadow-2xl shadow-indigo-950/30">
        {/* Window header */}
        <div className="flex items-center gap-2 border-b border-border/70 bg-muted/40 px-4 py-3">
          <span className="size-3 rounded-full bg-rose-400/90" />
          <span className="size-3 rounded-full bg-amber-400/90" />
          <span className="size-3 rounded-full bg-emerald-400/90" />
          <span className="ml-3 truncate font-mono text-xs text-muted-foreground">
            gebrye.dev — profile.ts
          </span>
        </div>
        {/* Code body */}
        <div className="p-5 font-mono text-[0.8rem] leading-6 sm:text-sm">
          {CODE_LINES.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.7 + i * 0.12, ease: EASE }}
              className="whitespace-pre"
            >
              {line.map((token, j) => (
                <span key={j} className={token.className}>
                  {token.text}
                </span>
              ))}
            </motion.div>
          ))}
          {/* Blinking cursor */}
          <motion.span
            aria-hidden="true"
            className="inline-block h-4 w-2 translate-y-0.5 rounded-sm bg-indigo-500"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Floating tech chips */}
      {TECH_CHIPS.map((chip) => (
        <motion.span
          key={chip.label}
          className={`glass absolute ${chip.className} rounded-full border border-border/60 px-3 py-1.5 text-xs font-semibold text-foreground shadow-lg shadow-indigo-950/20`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
          transition={{
            duration: 0.5,
            delay: chip.delay,
            y: {
              duration: 4 + chip.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: chip.delay,
            },
          }}
        >
          {chip.label}
        </motion.span>
      ))}
    </motion.div>
  );
}

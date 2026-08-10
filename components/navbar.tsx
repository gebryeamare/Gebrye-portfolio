"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { GitHubIcon, LinkedInIcon } from "@/components/social-icons";
import { NAV_ITEMS, SITE } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("#home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.querySelector<HTMLElement>(item.href)
    ).filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const initials = `${SITE.firstName[0]}${SITE.lastName[0]}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Scroll progress beam */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-violet-500 via-sky-400 to-cyan-300 opacity-80"
        style={{ transform: `scaleX(${progress})` }}
      />

      <nav
        aria-label="Main navigation"
        className={cn(
          "container-section transition-all duration-300",
          scrolled ? "mt-2" : "mt-0"
        )}
      >
        <div
          className={cn(
            "flex h-16 items-center justify-between gap-4 rounded-2xl border px-4 transition-all duration-300 sm:h-[4.25rem] sm:px-5",
            scrolled
              ? "glass-card border-primary/20 shadow-lg shadow-black/20"
              : "border-transparent bg-transparent"
          )}
        >
          {/* Brand */}
          <Link
            href="#home"
            className="group flex items-center gap-2.5"
            aria-label={`${SITE.name} — back to top`}
          >
            <span className="relative flex size-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-600 via-indigo-500 to-sky-400 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-indigo-500/50">
              {initials}
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.5),transparent_55%)]" />
            </span>
            <span className="hidden font-semibold tracking-tight sm:block">
              {SITE.firstName}
              <span className="text-gradient"> {SITE.lastName}</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 rounded-full border border-border/60 bg-card/40 p-1 backdrop-blur-md lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground",
                      isActive &&
                        "bg-gradient-to-r from-violet-600/90 to-indigo-500/90 text-white shadow-md shadow-violet-600/25"
                    )}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon-sm"
              className="hidden size-9 rounded-full sm:inline-flex"
              asChild
            >
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <GitHubIcon className="size-4.5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="hidden size-9 rounded-full sm:inline-flex"
              asChild
            >
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <LinkedInIcon className="size-4.5" />
              </a>
            </Button>
            <Button
              asChild
              size="sm"
              className="hidden rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 shadow-lg shadow-indigo-600/25 transition-shadow hover:shadow-indigo-500/40 md:inline-flex"
            >
              <Link href="#contact">Hire Me</Link>
            </Button>

            {/* Mobile menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="size-9 rounded-full lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[82vw] max-w-xs border-l border-border/60 bg-background/85 backdrop-blur-2xl"
              >
                <SheetHeader className="border-b border-border/60">
                  <SheetTitle className="flex items-center gap-2.5">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-sky-400 text-sm font-bold text-white">
                      {initials}
                    </span>
                    {SITE.name}
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-2 py-4">
                  {NAV_ITEMS.map((item, index) => {
                    const isActive = active === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-gradient-to-r from-violet-600/15 to-indigo-500/15 text-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                        aria-current={isActive ? "true" : undefined}
                      >
                        {item.label}
                        <span
                          className={cn(
                            "font-mono text-xs",
                            isActive
                              ? "text-violet-500 dark:text-violet-300"
                              : "text-muted-foreground/60"
                          )}
                        >
                          0{index + 1}
                        </span>
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-auto flex items-center gap-2 border-t border-border/60 px-4 py-4">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <a
                      href={SITE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitHubIcon className="size-4" /> GitHub
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <a
                      href={SITE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedInIcon className="size-4" /> LinkedIn
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}

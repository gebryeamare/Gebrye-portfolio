import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GitHubIcon, LinkedInIcon } from "@/components/social-icons";
import { NAV_ITEMS, SITE } from "@/lib/data";

const FOOTER_LINKS = NAV_ITEMS.filter((item) =>
  ["#home", "#about", "#skills", "#projects", "#experience", "#contact"].includes(
    item.href
  )
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-background/60 backdrop-blur-xl">
      <div className="container-section py-12 sm:py-14">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
          {/* Brand */}
          <div className="flex max-w-sm flex-col items-center gap-3 md:items-start">
            <Link
              href="#home"
              className="flex items-center gap-2.5"
              aria-label={`${SITE.name} — back to top`}
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 text-sm font-bold text-white">
                {SITE.firstName[0]}
                {SITE.lastName[0]}
              </span>
              <span className="font-heading text-lg font-bold tracking-tight">
                {SITE.name}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {SITE.tagline}
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon-sm" className="rounded-full" asChild>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <GitHubIcon className="size-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon-sm" className="rounded-full" asChild>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <LinkedInIcon className="size-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon-sm" className="rounded-full" asChild>
              <a href={`mailto:${SITE.email}`} aria-label="Send an email">
                <Mail className="size-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-7 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <span>
              Built with Next.js, TypeScript &amp; Tailwind CSS
            </span>
            <Button
              variant="ghost"
              size="icon-sm"
              className="size-8 rounded-full"
              aria-label="Back to top"
              asChild
            >
              <a href="#home">
                <ArrowUp className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

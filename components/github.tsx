"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, FolderGit2, Star, GitFork, Activity } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { GitHubIcon } from "@/components/social-icons";
import {
  GITHUB_FALLBACK_REPOS,
  GITHUB_PROJECT_COUNT,
  GITHUB_TECHNOLOGIES,
  SITE,
} from "@/lib/data";
import type { GithubRepo } from "@/types";

interface GitHubUser {
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
}

/* Deterministic pseudo-random generator so the placeholder heatmap is stable. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const WEEKS = 40;
const DAYS = 7;
const CELL_SIZE = 10;

export default function Github() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>(GITHUB_FALLBACK_REPOS);
  const [source, setSource] = useState<"api" | "fallback">("fallback");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${SITE.githubUsername}`, {
            signal: controller.signal,
            headers: { Accept: "application/vnd.github+json" },
            cache: "no-store",
          }),
          fetch(
            `https://api.github.com/users/${SITE.githubUsername}/repos?sort=updated&per_page=6`,
            {
              signal: controller.signal,
              headers: { Accept: "application/vnd.github+json" },
              cache: "no-store",
            }
          ),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API unavailable");

        const userData: GitHubUser = await userRes.json();
        const reposData: Array<{
          name: string;
          description: string | null;
          language: string | null;
          stargazers_count: number;
          forks_count: number;
          html_url: string;
        }> = await reposRes.json();

        setUser({
          login: userData.login,
          avatar_url: userData.avatar_url,
          public_repos: userData.public_repos,
          followers: userData.followers,
        });
        setRepos(
          reposData.map((repo) => ({
            name: repo.name,
            description: repo.description ?? "No description provided.",
            language: repo.language ?? "—",
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            url: repo.html_url,
          }))
        );
        setSource("api");
      } catch {
        // Fall back to the static data defined in lib/data.tsx
        setUser(null);
        setRepos(GITHUB_FALLBACK_REPOS);
        setSource("fallback");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  /* Deterministic heatmap */
  const rand = mulberry32(20260810);
  const cells = Array.from({ length: WEEKS * DAYS }, () =>
    Math.floor(rand() * 5)
  );

  return (
    <section id="github" className="scroll-mt-24 py-24 sm:py-28">
      <div className="container-section">
        <SectionHeading
          index={3}
          eyebrow="Open Source"
          title="GitHub activity"
          description="A peek into my open-source work. Data is fetched from the public GitHub API — no tokens required."
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Profile card */}
          <div className="glass-card glass-card-hover flex h-full flex-col rounded-2xl p-7">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              {loading ? (
                <div className="size-16 animate-pulse rounded-2xl bg-muted" />
              ) : user ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.avatar_url}
                  alt={`${user.login} GitHub avatar`}
                  className="size-16 rounded-2xl ring-2 ring-indigo-500/30"
                />
              ) : (
                <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-500 text-white">
                  <GitHubIcon className="size-7" />
                </div>
              )}
              <div>
                <p className="flex items-center gap-2 font-heading text-lg font-bold">
                  {SITE.githubUsername}
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase text-emerald-600 dark:text-emerald-300">
                    {source === "api" ? "Live" : "Sample"}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {source === "api" && user
                    ? `${user.public_repos} public repositories · ${user.followers} followers`
                    : `${GITHUB_PROJECT_COUNT} projects · showcasing my work`}
                </p>
              </div>
            </div>

            {/* Contribution heatmap placeholder */}
            <div className="mt-7 rounded-xl border border-border/60 bg-card/40 p-4 backdrop-blur-sm">
              <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <Activity className="size-3.5 text-indigo-500" />
                Contribution activity
                {source === "fallback" && (
                  <span className="normal-case tracking-normal text-muted-foreground/70">
                    (placeholder)
                  </span>
                )}
              </p>
              <div
                className="overflow-x-auto pb-1"
                role="img"
                aria-label="GitHub contribution activity placeholder visualization"
              >
                <div
                  className="grid grid-flow-col gap-[2.5px]"
                  style={{
                    gridTemplateRows: `repeat(${DAYS}, ${CELL_SIZE}px)`,
                  }}
                >
                  {cells.map((level, i) => (
                    <span
                      key={i}
                      className="rounded-[2px] transition-colors duration-200 hover:ring-1 hover:ring-indigo-500/50"
                      style={{
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        backgroundColor:
                          level === 0
                            ? "color-mix(in oklch, var(--muted) 80%, transparent)"
                            : `color-mix(in oklch, var(--primary) ${level * 22}%, var(--muted))`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {GITHUB_TECHNOLOGIES.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border/60 bg-card/50 px-2 py-1 text-[0.7rem] font-medium text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>

            <Button
              asChild
              variant="outline"
              className="mt-7 w-full rounded-full"
            >
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className="size-4" />
                View GitHub Profile
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>

          {/* Repo cards */}
          <div className="grid content-start gap-4 sm:grid-cols-2">
            {repos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/15"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 font-mono text-sm font-semibold text-indigo-600 dark:text-indigo-300">
                    <FolderGit2 className="size-4" />
                    {repo.name}
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-indigo-500" />
                </div>
                <p className="mt-2.5 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                  {repo.description}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-indigo-500" />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="size-3.5" /> {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="size-3.5" /> {repo.forks}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

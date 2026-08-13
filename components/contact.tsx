"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Check,
  CheckCircle2,
  Copy,
  Loader2,
  Mail,
  MapPin,
  Send,
  AlertCircle,
  PhoneCall,
} from "lucide-react";

import type { Icon } from "@/types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { GitHubIcon, LinkedInIcon } from "@/components/social-icons";
import { SITE } from "@/lib/data";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(120, "Subject is too long"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long (max 2000 characters)"),
  // Honeypot field — bots fill it, humans don't see it.
  website: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

type FormStatus =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; demoMode: boolean }
  | { state: "error"; message: string };

interface ContactItem {
  label: string;
  value: string;
  href?: string;
  icon: Icon;
  onCopy?: () => void;
  copied?: boolean;
}

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>({ state: "idle" });
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", website: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    // Honeypot: silently succeed for bots.
    if (values.website) {
      setStatus({ state: "success", demoMode: false });
      return;
    }

    setStatus({ state: "loading" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
        }),
      });

      const data = (await response.json()) as {
        message?: string;
        emailProviderConfigured?: boolean;
      };

      if (!response.ok) {
        throw new Error(data.message ?? "Something went wrong. Please try again.");
      }

      setStatus({
        state: "success",
        demoMode: data.emailProviderConfigured === false,
      });
      reset();
    } catch (error) {
      setStatus({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
  }

  async function copyEmail() {
    const ok = await copyToClipboard(SITE.email);
    if (!ok) return; // Clipboard unavailable — the mailto link still works.
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  const contactItems: ContactItem[] = [
    {
      label: "Email",
      value: SITE.email,
      href: `mailto:${SITE.email}`,
      icon: Mail,
      onCopy: copyEmail,
      copied,
    },
    {
      label: "Phone",
      value: "+251 918-763-378",
      href: "tel:+251918763378",
      icon: PhoneCall,
    },
    {
      label: "GitHub",
      value: SITE.githubUsername,
      href: SITE.github,
      icon: GitHubIcon,
    },
    {
      label: "LinkedIn",
      value: "in/gebryeamare",
      href: SITE.linkedin,
      icon: LinkedInIcon,
    },
    {
      label: "Location",
      value: SITE.location,
      icon: MapPin,
    },
  ];

  return (
    <section id="contact" className="scroll-mt-24 py-24 sm:py-28">
      <div className="container-section">
        <SectionHeading
          index={7}
          eyebrow="Contact"
          title="Let's build something together"
          description="Have a project in mind, a role to fill, or just want to say hi? Send me a message and I'll get back to you."
        />

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Contact info */}
          <Reveal>
            <div className="flex h-full flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {contactItems.map((item) => {
                  const Wrapper = item.href ? "a" : "div";
                  return (
                    <Wrapper
                      key={item.label}
                      {...(item.href
                        ? {
                            href: item.href,
                            target: item.href.startsWith("http")
                              ? "_blank"
                              : undefined,
                            rel: item.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined,
                          }
                        : {})}
                      className="glass-card glass-card-hover group relative flex items-center gap-3.5 rounded-2xl p-5"
                    >
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600/15 to-sky-500/15 ring-1 ring-indigo-500/20">
                        <item.icon className="size-5 text-indigo-600 transition-transform duration-300 group-hover:scale-110 dark:text-indigo-300" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          {item.label}
                        </span>
                        <span className="block truncate text-sm font-medium">
                          {item.value}
                        </span>
                      </span>
                      {item.onCopy && (
                        <span className="relative">
                          {item.copied ? (
                            <motion.span
                              initial={{ scale: 0.6, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="flex size-7 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300"
                            >
                              <Check className="size-3.5" />
                            </motion.span>
                          ) : (
                            <button
                              type="button"
                              onClick={(event) => {
                                // Keep the click from also triggering the
                                // surrounding mailto / profile link navigation.
                                event.preventDefault();
                                event.stopPropagation();
                                item.onCopy?.();
                              }}
                              className="flex size-7 items-center justify-center rounded-full text-muted-foreground/60 transition-colors duration-200 hover:bg-indigo-500/10 hover:text-indigo-500"
                              aria-label={`Copy ${item.label.toLowerCase()} to clipboard`}
                              title={`Copy ${item.label.toLowerCase()}`}
                            >
                              <Copy className="size-3.5" />
                            </button>
                          )}
                        </span>
                      )}
                    </Wrapper>
                  );
                })}
              </div>

              <Card className="glass-card relative flex-1 overflow-hidden border-indigo-500/25">
                <CardHeader>
                  <CardTitle className="font-heading text-lg">
                    Response time
                  </CardTitle>
                  <CardDescription>
                    I usually reply within 24–48 hours. For urgent inquiries,
                    email is the fastest way to reach me.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Currently based in {SITE.location} and open to remote roles
                    and international opportunities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="glass-card rounded-2xl p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Jane Doe"
                    autoComplete="name"
                    aria-invalid={errors.name ? true : undefined}
                    {...register("name")}
                  />
                  {errors.name && (
                    <FieldError message={errors.name.message ?? "Required"} />
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane@example.com"
                    autoComplete="email"
                    aria-invalid={errors.email ? true : undefined}
                    {...register("email")}
                  />
                  {errors.email && (
                    <FieldError message={errors.email.message ?? "Required"} />
                  )}
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Project inquiry, collaboration, or opportunity"
                  aria-invalid={errors.subject ? true : undefined}
                  {...register("subject")}
                />
                {errors.subject && (
                  <FieldError message={errors.subject.message ?? "Required"} />
                )}
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={6}
                  placeholder="Tell me about your project or idea..."
                  aria-invalid={errors.message ? true : undefined}
                  className="resize-none"
                  {...register("message")}
                />
                {errors.message && (
                  <FieldError message={errors.message.message ?? "Required"} />
                )}
              </div>

              {/* Honeypot — hidden from users */}
              <div className="hidden" aria-hidden="true">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("website")}
                />
              </div>

              <div className="mt-7">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-full sm:w-auto sm:min-w-44"
                  disabled={status.state === "loading"}
                >
                  {status.state === "loading" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="size-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>

              {/* Status messages */}
              {status.state === "success" && (
                <div
                  role="status"
                  className={cn(
                    "mt-5 flex items-start gap-3 rounded-xl border p-4 text-sm",
                    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                  )}
                >
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                  <div>
                    <p className="font-semibold">Message sent successfully!</p>
                    <p className="mt-0.5 text-emerald-600/80 dark:text-emerald-300/80">
                      {status.demoMode
                        ? "Demo mode: the form is working, but no email provider is configured yet. Add RESEND_API_KEY to receive messages by email."
                        : "Thank you for reaching out — I'll get back to you soon."}
                    </p>
                  </div>
                </div>
              )}

              {status.state === "error" && (
                <div
                  role="alert"
                  className="mt-5 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
                >
                  <AlertCircle className="mt-0.5 size-5 shrink-0" />
                  <p className="font-medium">{status.message}</p>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p role="alert" className="text-xs font-medium text-destructive">
      {message}
    </p>
  );
}

/** Copy text to the clipboard, falling back to the legacy execCommand path. */
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers / contexts without the async Clipboard API.
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(textarea);
      return ok;
    } catch {
      return false;
    }
  }
}

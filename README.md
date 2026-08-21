# Gebrye Amare — Portfolio

A modern, glassmorphism-styled portfolio built with **Next.js (App Router)**, **React**, **TypeScript**, and **Tailwind CSS v4**. It showcases projects, skills, experience, education, services, and a working contact form powered by **Netlify Forms**.

## ✨ Features

- 🎨 Glassmorphism design system with light/dark themes (system-aware, toggleable)
- 📱 Fully responsive layout with a mobile slide-over menu
- 🖼️ Project cards with category filters, expandable details, and a **screenshot lightbox** (keyboard navigable)
- 🐙 GitHub section that fetches live profile + repo data from the public GitHub API (with a static fallback)
- 📬 Contact form powered by Netlify Forms with client-side validation (zod + react-hook-form) and a honeypot anti-spam field
- 📄 Resume / CV download section
- ♿ Reduced-motion support, semantic markup, and ARIA-friendly components
- 🔍 SEO metadata, `robots.txt`, and `sitemap.xml`

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🧱 Scripts

| Script         | Description                        |
| -------------- | ---------------------------------- |
| `npm run dev`  | Start the development server       |
| `npm run build`| Create an optimized production build |
| `npm run start`| Serve the production build         |
| `npm run lint` | Run ESLint                         |

## ⚙️ Environment variables

Create a `.env.local` file (see `.env.example` for reference):

| Variable               | Required | Purpose                                      |
| ---------------------- | -------- | -------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | No       | Deployment URL used for SEO metadata (falls back to `https://gebrye-portfolio.vercel.app`) |

The contact form is powered by **Netlify Forms**. No API keys are needed — configure email notifications in the Netlify dashboard under **Forms → Form notifications**.

## 🗂️ Project structure

```
app/          # App Router pages, layout, metadata, SEO routes
components/   # Sections + reusable UI components
lib/          # Site data (lib/data.tsx), utilities
public/       # Static assets (profile, resume PDF, project covers)
types/        # Shared TypeScript types
```

## ✏️ Customizing your content

Most content — name, links, projects, skills, experience, education, services — lives in **`lib/data.tsx`**. Update it there and the site updates everywhere.

- **Profile photo:** drop a real photo at `public/profile.jpg` and update `ABOUT.image` in `lib/data.tsx`.
- **Project covers:** add screenshots under `public/covers/<project-id>/` (e.g. `cover.png`, `cover-2.png`) and list them in the project's `gallery` array.
- **Resume PDF:** replace `public/Gebrye_Amare_Certificates_Graduation_CV-4.pdf` and update `SITE.resume`.
- **Links:** fill in real GitHub / live-demo URLs per project in `lib/data.tsx`.

## 🌐 Deploying

Deploy to [Netlify](https://app.netlify.com):

1. Push the repo to GitHub.
2. Import the repo on Netlify.
3. Build settings are already configured in `netlify.toml` (`npm run build`, Node 22).
4. The contact form is automatically detected via the static `public/contact.html` file.
5. Configure email notifications under **Forms → Form notifications** in the Netlify dashboard.

## 🛠️ Tech stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Radix UI · react-hook-form · zod · Netlify Forms

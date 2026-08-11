import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { BackToTop } from "@/components/back-to-top";
import { Providers } from "@/components/providers";
import { SITE } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.title}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.intro,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  keywords: [
    SITE.title,
    "Computer Engineer",
    "Full-Stack Developer",
    "Mobile App Developer",
    "Machine Learning",
    "Cybersecurity",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "Flutter",
    "PostgreSQL",
  ],
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.title}`,
    description: SITE.intro,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: `${SITE.name} — ${SITE.title}`,
    description: SITE.intro,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col">
        {/* Ambient aurora + film grain — fixed behind all content */}
        <div
          aria-hidden="true"
          className="bg-aurora pointer-events-none fixed inset-0 -z-20"
        />
        <div
          aria-hidden="true"
          className="bg-noise pointer-events-none fixed inset-0 -z-10 opacity-[0.028] mix-blend-overlay"
        />
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}

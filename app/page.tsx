import About from "@/components/about";
import Contact from "@/components/contact";
import Education from "@/components/education";
import Experience from "@/components/experience";
import Github from "@/components/github";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Resume from "@/components/resume";
import Services from "@/components/services";
import Skills from "@/components/skills";
import TechMarquee from "@/components/tech-marquee";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <TechMarquee />
      <About />
      <Skills />
      <Projects />
      <Github />
      <Experience />
      <Education />
      <Services />
      <Resume />
      <Contact />
    </main>
  );
}

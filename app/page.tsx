import Link from "next/link";
import SocialIcons from "@/components/SocialIcons";
import SkillsList from "@/components/SkillsList";
import { getSettings, getProjects } from "@/lib/store";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const settings = getSettings();
  const projects = getProjects();
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col overflow-hidden">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-4 sm:px-6 pt-28 sm:pt-40 pb-16 text-center overflow-hidden">
        <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto pointer-events-none">
          
          {/* Text Content */}
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-charcoal sm:text-6xl md:text-7xl">
              Hi, I&apos;m Masood
              <br />
              <span className="gradient-text">Haider</span>
            </h1>

            <p className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg text-charcoal/70 leading-relaxed">
              A passionate developer building modern web experiences — from sleek
              frontends to robust full-stack applications.
            </p>

            {/* Stats */}
            <div className="mt-6 flex items-center justify-center gap-8 sm:gap-12 w-full max-w-md">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-extrabold text-charcoal">{settings.yearsOfExperience}+</span>
                <span className="text-xs text-charcoal/60 uppercase tracking-widest font-semibold mt-1">Years Exp</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-extrabold text-charcoal">{projects.length}+</span>
                <span className="text-xs text-charcoal/60 uppercase tracking-widest font-semibold mt-1">Projects</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="mt-6 pointer-events-auto">
              <SocialIcons iconSize={22} />
            </div>

            {/* CTA buttons */}
            <div className="mt-6 sm:mt-10 flex items-center justify-center w-full pointer-events-auto">
              <Link
                href="/projects"
                className="w-full max-w-xs sm:w-64 rounded-full border border-charcoal/20 py-3 text-center text-sm font-semibold text-charcoal hover:border-gold hover:text-gold transition-colors bg-base/50 backdrop-blur-sm shadow-sm hover:shadow-md"
              >
                View Projects
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Skills Section */}
      <div className="relative z-10 w-full flex flex-col items-center pt-8 sm:pt-16">
        <p className="mb-6 sm:mb-10 text-xs sm:text-sm font-bold uppercase tracking-widest text-charcoal/40 text-center">
          Core Technologies
        </p>
        <SkillsList />
      </div>

      {/* Project category chooser */}
      <section className="relative z-10 w-full bg-base py-10 sm:py-16 flex flex-col items-center px-4 sm:px-6">
        <div className="w-full max-w-3xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-charcoal/40">
            Browse by category
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <CategoryCard
              href="/projects?category=frontend"
              title="Frontend Projects"
              description="Pixel-perfect UIs, landing pages, and interactive web apps built with React & Next.js."
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 9l-3 3 3 3M15 9l3 3-3 3M13 7l-2 10" />
                </svg>
              }
            />
            <CategoryCard
              href="/projects?category=fullstack"
              title="Full Stack Projects"
              description="End-to-end applications with APIs, databases, authentication, and deployment pipelines."
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
                  <ellipse cx="12" cy="6" rx="8" ry="3" />
                  <path d="M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6" />
                  <path d="M4 12v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6" />
                </svg>
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function CategoryCard({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative z-0 overflow-hidden flex flex-col rounded-2xl border border-charcoal/10 p-6 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/30 hover:shadow-md"
    >
      {/* Solid background to block grid */}
      <div className="absolute inset-0 bg-base -z-20" />
      {/* Idle background effect */}
      <div className="absolute inset-0 bg-charcoal/5 -z-10 transition-opacity duration-200 group-hover:opacity-0" />

      <div className="mb-4 text-charcoal/70 group-hover:text-gold transition-colors relative z-10">
        {icon}
      </div>
      <h2 className="text-base font-bold text-charcoal">{title}</h2>
      <p className="mt-2 text-sm text-charcoal/70 leading-relaxed">{description}</p>
      <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-charcoal/40 group-hover:text-gold group-hover:gap-2 transition-all">
        Explore
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
          <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
        </svg>
      </div>
    </Link>
  );
}

import SocialIcons from "@/components/SocialIcons";
import { socialLinks } from "@/lib/social";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-20 pt-32">

      {/* Hero row */}
      <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-16">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="h-36 w-36 rounded-2xl border border-charcoal/10 bg-base flex items-center justify-center text-4xl font-extrabold text-charcoal shadow-sm">
            MH
          </div>
        </div>

        {/* Intro */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-charcoal sm:text-5xl">
            Masood Haider
          </h1>
          <p className="mt-2 text-base font-medium text-gold">
            Full-Stack Developer
          </p>
          <p className="mt-4 max-w-xl text-charcoal/70 leading-relaxed">
            I design and build modern web applications — from polished,
            accessible frontends to scalable back-end systems. I love turning
            ideas into real products that people actually enjoy using.
          </p>

          {/* CTA buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <a
              href="/cv/masood-haider-cv.pdf"
              download="Masood_Haider_CV.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-2.5 text-sm font-semibold text-base hover:bg-gold hover:text-white transition-colors shadow-sm"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-6 py-2.5 text-sm font-semibold text-charcoal hover:border-gold hover:text-gold transition-colors"
            >
              View Projects
            </Link>
          </div>

          {/* Social icons */}
          <div className="mt-6">
            <SocialIcons iconSize={22} />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-14 border-t border-charcoal/10" />

      {/* Skills section */}
      <section className="mb-14">
        <h2 className="mb-6 text-2xl font-bold text-charcoal">
          Skills &amp; Technologies
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="group rounded-xl border border-charcoal/10 bg-base shadow-sm p-5 hover:border-gold hover:shadow-md transition-all duration-200"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-charcoal/40">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`rounded-md border border-transparent px-2.5 py-0.5 text-xs shadow-sm ${getSkillColors(skill)}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social links detail */}
      <section className="mb-14">
        <h2 className="mb-6 text-2xl font-bold text-charcoal">Connect with me</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-charcoal/10 bg-base p-4 hover:border-gold hover:shadow-md transition-all"
            >
              <span className="text-charcoal/40 group-hover:text-gold transition-colors">
                <PlatformIcon name={link.icon} />
              </span>
              <div>
                <p className="text-sm font-semibold text-charcoal group-hover:text-gold transition-colors">
                  {link.name}
                </p>
                <p className="text-xs text-charcoal/40 truncate max-w-[200px]">
                  {link.url}
                </p>
              </div>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="ml-auto h-4 w-4 text-charcoal/20 group-hover:text-gold transition-colors flex-shrink-0"
              >
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </a>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="rounded-2xl border border-charcoal/10 bg-base p-8 text-center">
        <h2 className="text-2xl font-bold text-charcoal">Got a project in mind?</h2>
        <p className="mt-3 text-charcoal/70 max-w-md mx-auto">
          I&apos;m currently available for freelance work and full-time
          positions. Let&apos;s build something great together.
        </p>
        <a
          href="mailto:masood.haider.bangash1@gmail.com"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-3 text-sm font-semibold text-base hover:bg-gold transition-colors shadow-sm"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          Send an Email
        </a>
      </section>
    </div>
  );
}

const skillGroups = [
  {
    label: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB"],
  },
  {
    label: "Tools & DevOps",
    skills: ["Git", "GitHub", "Vercel", "VS Code", "Figma"],
  },
];

function getSkillColors(skill: string) {
  const colors: Record<string, string> = {
    "React": "bg-cyan-100 text-cyan-700",
    "Next.js": "bg-gray-200 text-black",
    "TypeScript": "bg-blue-100 text-blue-700",
    "Tailwind CSS": "bg-sky-100 text-sky-700",
    "HTML5": "bg-orange-100 text-orange-700",
    "CSS3": "bg-indigo-100 text-indigo-700",
    "Node.js": "bg-green-100 text-green-700",
    "Express": "bg-gray-200 text-gray-800",
    "REST APIs": "bg-purple-100 text-purple-700",
    "GraphQL": "bg-pink-100 text-pink-700",
    "PostgreSQL": "bg-sky-100 text-sky-800",
    "MongoDB": "bg-green-100 text-green-800",
    "Git": "bg-red-100 text-red-700",
    "GitHub": "bg-gray-800 text-white",
    "Vercel": "bg-black text-white",
    "Docker": "bg-blue-100 text-blue-800",
    "VS Code": "bg-blue-100 text-blue-700",
    "Figma": "bg-pink-100 text-pink-700",
  };
  return colors[skill] || "bg-charcoal/10 text-charcoal/70";
}

function PlatformIcon({ name }: { name: string }) {
  const s = 22;
  switch (name) {
    case "github":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "twitter":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "instagram":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      );
    default:
      return null;
  }
}

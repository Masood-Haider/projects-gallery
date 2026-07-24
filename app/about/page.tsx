"use client";

import { socialLinks } from "@/lib/social";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("https://formsubmit.co/ajax/masood.haider.bangash1@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject || `Project Inquiry from ${formData.name}`,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        triggerMailto();
      }
    } catch {
      triggerMailto();
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerMailto = () => {
    const mailtoSubject = encodeURIComponent(formData.subject || `Project Inquiry from ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:masood.haider.bangash1@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pb-20 pt-28 sm:pt-32">

      {/* Hero row */}
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-16">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="relative h-32 w-32 sm:h-44 sm:w-44 rounded-full border-2 border-charcoal/10 bg-base overflow-hidden shadow-md group hover:border-gold/50 transition-all duration-300">
            <Image
              src="https://i.ibb.co/ZRKWPxy0/Untitled-design-3.jpg"
              alt="Masood Haider"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 128px, 176px"
              priority
            />
          </div>
        </div>

        {/* Intro */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-charcoal sm:text-5xl">
            Masood Haider
          </h1>
          <p className="mt-2 text-base sm:text-lg font-bold text-gold tracking-wide">
            Full-Stack Developer
          </p>
          <p className="mt-4 max-w-xl text-base sm:text-lg font-medium text-charcoal leading-relaxed">
            I design and build modern web applications — from polished,
            accessible frontends to scalable back-end systems. I love turning
            ideas into real products that people actually enjoy using.
          </p>

          {/* CTA buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:justify-start">
            <a
              href="/cv/masood-haider-cv.pdf"
              download="Masood_Haider_CV.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-charcoal px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold text-base hover:bg-gold hover:text-white transition-colors shadow-sm"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
              </svg>
              Download CV
            </a>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold text-charcoal hover:border-gold hover:text-gold transition-colors"
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-10 sm:my-14 border-t border-charcoal/10" />

      {/* Skills section */}
      <section className="mb-14">
        <h2 className="mb-6 text-xl sm:text-2xl font-bold text-charcoal">
          Skills &amp; Technologies
        </h2>
        <div className="flex flex-col gap-4 sm:gap-5">
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="group rounded-2xl border border-charcoal/10 bg-base shadow-sm p-4 sm:p-6 hover:border-gold/40 hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center gap-3 sm:gap-4 md:gap-8 overflow-hidden"
            >
              <div className="md:w-44 flex-shrink-0">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-charcoal/50 group-hover:text-gold transition-colors">
                  {group.label}
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 flex-1">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-lg border border-charcoal/10 px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-semibold shadow-sm hover:scale-105 transition-all duration-200 max-w-full truncate ${getSkillColors(skill)}`}
                  >
                    <SkillIcon name={skill} />
                    <span className="truncate">{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social links detail */}
      <section className="mb-14">
        <h2 className="mb-6 text-xl sm:text-2xl font-bold text-charcoal">Connect with me</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 sm:gap-4 rounded-xl border border-charcoal/10 bg-base p-3.5 sm:p-4 hover:border-gold hover:shadow-md transition-all overflow-hidden min-w-0"
            >
              <span className="text-charcoal group-hover:text-gold transition-colors flex-shrink-0">
                <PlatformIcon name={link.icon} />
              </span>
              <div className="min-w-0 flex-1 overflow-hidden">
                <p className="text-xs sm:text-sm font-semibold text-charcoal group-hover:text-gold transition-colors truncate">
                  {link.name}
                </p>
                <p className="text-[11px] sm:text-xs text-charcoal font-medium truncate group-hover:text-gold transition-colors">
                  {link.url}
                </p>
              </div>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="ml-auto h-4 w-4 text-charcoal group-hover:text-gold transition-colors flex-shrink-0"
              >
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </a>
          ))}
        </div>
      </section>

      {/* Contact CTA & Form */}
      <section className="rounded-2xl border border-charcoal/10 bg-base p-6 sm:p-10 shadow-sm">
        <div className="max-w-xl mx-auto text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal">Got a project in mind?</h2>
          <p className="mt-3 text-sm sm:text-base text-charcoal/70 leading-relaxed">
            Fill out the form below or send an email directly to{" "}
            <a href="mailto:masood.haider.bangash1@gmail.com" className="text-gold font-semibold hover:underline">
              masood.haider.bangash1@gmail.com
            </a>
          </p>
        </div>

        {submitted ? (
          <div className="max-w-xl mx-auto rounded-xl border border-green-500/30 bg-green-50/50 p-6 text-center animate-fade-in">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 mb-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-6 w-6">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-charcoal">Message Sent Successfully!</h3>
            <p className="mt-1 text-sm text-charcoal/70">
              Thank you for reaching out! Your message has been delivered directly to Masood&apos;s inbox. He will get back to you shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-xs font-semibold text-gold hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 mb-1.5">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-charcoal/15 bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 mb-1.5">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-charcoal/15 bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 mb-1.5">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                placeholder="Project Inquiry / Hiring"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full rounded-xl border border-charcoal/15 bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 mb-1.5">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                required
                rows={4}
                placeholder="Tell me about your project, timeline, and goals..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-xl border border-charcoal/15 bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors resize-none"
              />
            </div>

            <div className="pt-2 text-center sm:text-right">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-8 py-3 text-sm font-semibold text-base hover:bg-gold transition-colors shadow-sm w-full sm:w-auto disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        )}
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

function SkillIcon({ name }: { name: string }) {
  const cls = "w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0";
  switch (name) {
    case "React":
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className={`${cls} fill-current`}>
          <circle cx="0" cy="0" r="2.05" />
          <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      );
    case "Next.js":
      return (
        <svg viewBox="0 0 128 128" fill="currentColor" className={cls}>
          <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.7 41.8h6.8v22.6h-6.8V41.8z" />
        </svg>
      );
    case "TypeScript":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-5H6V9h8v2h-3v5zm5 0h-2v-5h-3V9h8v2h-3v5z"/>
        </svg>
      );
    case "Tailwind CSS":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
      );
    case "HTML5":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
        </svg>
      );
    case "CSS3":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.03 6.613H7.39l.232 2.622h10.665l-.847 9.27-5.463 1.488-5.45-1.488-.363-4.137h2.618l.182 1.95 2.987.806 2.99-.806.33-3.488H5.666L4.738 3.99H19.5l-.97 2.623z"/>
        </svg>
      );
    case "Node.js":
      return (
        <svg viewBox="0 0 128 128" fill="currentColor" className={cls}>
          <path d="M109.1 40L65.5 14.8c-1-.6-2.1-.6-3.1 0L18.9 40c-1 .6-1.6 1.6-1.6 2.7v50.4c0 1.1.6 2.1 1.6 2.7l43.5 25.1c1 .6 2.1 .6 3.1 0l43.5-25.1c1-.6 1.6-1.6 1.6-2.7V42.7c.1-1.1-.5-2.1-1.5-2.7zM66.4 105.4c-12.7 0-20.9-5.1-24.8-15.1l7.3-3.1c2.4 6.6 7.4 10.4 17.1 10.4 8.7 0 13.9-3.9 13.9-10.4 0-6.9-5.7-9.5-17.7-12.4-14.8-3.6-22.3-9.5-22.3-19.9 0-11 9.4-18.4 22.1-18.4 10.8 0 18.5 4 22.8 12.8l-7.2 3.8c-2.8-6.1-7.9-8.9-15.5-8.9-8.1 0-13.6 4.3-13.6 10.2 0 6.1 4.5 8.7 16.4 11.6 15.6 3.8 23.6 9.8 23.6 20.6.1 10.9-8.9 18.8-22.1 18.8z"/>
        </svg>
      );
    case "Express":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
          <path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-18.4-1.2h3.2v-1.6H5.6v1.6zm0 4.8h3.2v-1.6H5.6v1.6zm4.8-4.8h8v-1.6h-8v1.6zm0 4.8h8v-1.6h-8v1.6z"/>
        </svg>
      );
    case "REST APIs":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cls}>
          <rect width="18" height="14" x="3" y="5" rx="2" />
          <path d="M7 10h3M7 14h5" />
        </svg>
      );
    case "PostgreSQL":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
          <path d="M12 1a11 11 0 1011 11A11 11 0 0012 1zm0 20a9 9 0 119-9 9 9 0 01-9 9zm2-14h-4v2h4zm0 4h-4v2h4zm0 4h-4v2h4z" />
        </svg>
      );
    case "MongoDB":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
          <path d="M12 2c0 0-5 5.5-5 11 0 4 3 6.5 5 8.5 2-2 5-4.5 5-8.5 0-5.5-5-11-5-11zm0 18c-1.5-1.5-3-3.5-3-6 0-3.5 2.5-7.5 3-8 5 5 5 9.5 5 11-1 1-3.5 4-5 3z" />
        </svg>
      );
    case "Git":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
          <path d="M23.546 10.93L13.067.452a1.44 1.44 0 00-2.037 0L8.761 2.72l3.351 3.35a2.535 2.535 0 013.14 1.196c.21.433.275.92.188 1.393l3.208 3.208a2.535 2.535 0 011.663 3.655 2.535 2.535 0 01-3.655 1.663 2.535 2.535 0 01-2.946-4.004l-3.076-3.077v4.613a2.535 2.535 0 011.042 3.882 2.535 2.535 0 01-3.626-3.528 2.535 2.535 0 01.385-2.002V6.637a2.535 2.535 0 01-1.393-3.606L1.139 12.966a1.44 1.44 0 000 2.037l10.479 10.478a1.44 1.44 0 002.037 0l9.89-9.89a1.44 1.44 0 000-2.036V10.93z" />
        </svg>
      );
    case "GitHub":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
        </svg>
      );
    case "Vercel":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
          <path d="M24 22.525H0l12-21.05 12 21.05z" />
        </svg>
      );
    case "VS Code":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
          <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.12a.75.75 0 0 0-.97.05L.31 7.42a.75.75 0 0 0 .04 1.09l4.47 3.93-4.47 3.93a.75.75 0 0 0-.04 1.09l1.64 1.36a.75.75 0 0 0 .97.05l4.12-3.12 9.46 8.63c.48.44 1.18.55 1.7.29l4.94-2.38c.52-.25.85-.77.85-1.35V3.93c0-.58-.33-1.1-.85-1.35z"/>
        </svg>
      );
    case "Figma":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
          <path d="M12 2H8.5a3.5 3.5 0 0 0 0 7H12V2zM12 9H8.5a3.5 3.5 0 0 0 0 7H12V9zM8.5 16a3.5 3.5 0 1 0 3.5 3.5V16H8.5zM15.5 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM15.5 9a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
        </svg>
      );
    default:
      return null;
  }
}

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

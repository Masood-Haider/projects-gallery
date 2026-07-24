"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Project } from "@/lib/types";

export default function ProjectDetailClient({ project }: { project: Project }) {
  const allImages = [
    ...(project.thumbnail ? [project.thumbnail] : []),
    ...project.screenshots.filter((s) => s !== project.thumbnail),
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide images every 3.5s if multiple images exist and not hovered
  useEffect(() => {
    if (allImages.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % allImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [allImages.length, isPaused]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % allImages.length);
  };

  const categoryLabel =
    project.category === "frontend" ? "Frontend" : "Full Stack";

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-20 pt-28 sm:pt-32">
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal/70 hover:text-gold transition-colors mb-10"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path
            fillRule="evenodd"
            d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
            clipRule="evenodd"
          />
        </svg>
        Back to Projects
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* ── Left: details ── */}
        <div className="flex flex-col">
          {/* Category badge */}
          <span className="w-fit rounded-full border border-charcoal/10 bg-base px-3.5 py-1 text-xs font-semibold text-charcoal shadow-sm">
            {categoryLabel}
          </span>

          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-charcoal leading-tight">
            {project.title}
          </h1>

          <p className="mt-4 text-base text-charcoal/80 leading-relaxed font-medium">
            {project.longDescription || project.description}
          </p>

          {/* Tech stack */}
          {project.techStack.length > 0 && (
            <div className="mt-6">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-charcoal/50">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-charcoal/10 bg-base px-3 py-1 text-xs font-semibold text-charcoal shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-charcoal px-6 py-2.5 text-sm font-semibold text-base hover:bg-gold transition-colors shadow-sm"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                View Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-6 py-2.5 text-sm font-semibold text-charcoal hover:border-gold hover:text-gold transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* ── Right: preview ── */}
        <div className="flex flex-col gap-4">
          {/* Main preview with auto-slider */}
          <div
            className="relative aspect-video w-full overflow-hidden rounded-2xl border border-charcoal/10 bg-base shadow-md group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {allImages.length > 0 ? (
              <>
                <div
                  className="flex h-full w-full transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {allImages.map((img, idx) => (
                    <div key={idx} className="relative h-full w-full flex-shrink-0">
                      <Image
                        src={img}
                        alt={`${project.title} screenshot ${idx + 1}`}
                        fill
                        className="object-cover"
                        priority={idx === 0}
                      />
                    </div>
                  ))}
                </div>

                {/* Left/Right Arrow Nav Overlay */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      aria-label="Previous Image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/50 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 hover:bg-gold transition-all duration-300 shadow-md"
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="Next Image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/50 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 hover:bg-gold transition-all duration-300 shadow-md"
                    >
                      <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                    </button>

                    {/* Image Counter Badge */}
                    <div className="absolute bottom-3 right-3 z-20 rounded-full bg-charcoal/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                      {activeIndex + 1} / {allImages.length}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="h-20 w-20 text-charcoal/20"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
            )}
          </div>

          {/* Screenshot thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-2 flex-wrap mt-1">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                    activeIndex === idx
                      ? "border-gold scale-105 shadow-md"
                      : "border-charcoal/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Screenshot ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {allImages.length === 0 && (
            <p className="text-center text-xs text-charcoal/40">
              No screenshots added yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

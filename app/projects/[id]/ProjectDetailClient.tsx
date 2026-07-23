"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Project } from "@/lib/types";

export default function ProjectDetailClient({ project }: { project: Project }) {
  const [activeImage, setActiveImage] = useState<string | null>(
    project.screenshots[0] ?? project.thumbnail ?? null
  );

  const allImages = [
    ...(project.thumbnail ? [project.thumbnail] : []),
    ...project.screenshots.filter((s) => s !== project.thumbnail),
  ];

  const categoryLabel =
    project.category === "frontend" ? "Frontend" : "Full Stack";

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-10"
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
          <span className="w-fit rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            {categoryLabel}
          </span>

          <h1 className="mt-4 text-4xl font-extrabold text-gray-900 leading-tight">
            {project.title}
          </h1>

          <p className="mt-4 text-gray-600 leading-relaxed">
            {project.longDescription || project.description}
          </p>

          {/* Tech stack */}
          {project.techStack.length > 0 && (
            <div className="mt-6">
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-gray-200 bg-gray-100 px-3 py-1 text-sm text-gray-700"
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
                className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-700 transition-colors shadow-sm"
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
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors"
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
          {/* Main preview */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
            {activeImage ? (
              <Image
                src={activeImage}
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="h-20 w-20 text-gray-300"
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
            <div className="flex gap-2 flex-wrap">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                    activeImage === img
                      ? "border-gray-900"
                      : "border-gray-200 opacity-60 hover:opacity-100"
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
            <p className="text-center text-xs text-gray-400">
              No screenshots added yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/types";

export default function ProjectCard({ project }: { project: Project }) {
  const categoryLabel =
    project.category === "frontend" ? "Frontend" : "Full Stack";

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group flex flex-col rounded-2xl border border-charcoal/10 bg-base overflow-hidden hover:border-gold/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="relative h-48 w-full overflow-hidden bg-charcoal/5">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-charcoal/5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="h-16 w-16 text-charcoal/20"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 9l-3 3 3 3M15 9l3 3-3 3M13 7l-2 10" />
            </svg>
          </div>
        )}
        {/* Category badge */}
        <span className="absolute top-3 left-3 rounded-full border border-charcoal/10 bg-base/90 px-2.5 py-0.5 text-xs font-medium text-charcoal/70 backdrop-blur-sm shadow-sm">
          {categoryLabel}
        </span>
        {/* Live indicator */}
        {project.liveUrl && (
          <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-base/90 border border-charcoal/10 px-2.5 py-0.5 text-xs font-medium text-charcoal/80 backdrop-blur-sm shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            Live
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold text-charcoal group-hover:text-charcoal/80 transition-colors">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-charcoal/60 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Tech stack */}
        {project.techStack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-charcoal/5 border border-charcoal/10 px-2 py-0.5 text-xs text-charcoal/70"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="rounded-md bg-charcoal/5 border border-charcoal/10 px-2 py-0.5 text-xs text-charcoal/40">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Arrow */}
        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-charcoal/40 group-hover:text-gold group-hover:gap-2 transition-all">
          View project
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

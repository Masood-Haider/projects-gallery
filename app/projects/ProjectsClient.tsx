"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Project, ProjectCategory } from "@/lib/types";
import ProjectCard from "@/components/ProjectCard";
import clsx from "clsx";

type Filter = ProjectCategory | "all";

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All Projects" },
  { value: "frontend", label: "Frontend" },
  { value: "fullstack", label: "Full Stack" },
];

export default function ProjectsClient({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const active = (searchParams.get("category") ?? "all") as Filter;

  const filtered =
    active === "all"
      ? initialProjects
      : initialProjects.filter((p) => p.category === active);

  const setFilter = (value: Filter) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    router.push(`/projects?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 pb-16 pt-32">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-charcoal sm:text-5xl">
          My Projects
        </h1>
        <p className="mt-4 text-charcoal/70 max-w-xl mx-auto">
          A collection of things I&apos;ve built — ranging from polished
          frontends to full-stack applications.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={clsx(
              "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
              active === f.value
                ? "bg-charcoal text-base shadow-sm"
                : "border border-charcoal/10 text-charcoal/60 hover:border-gold hover:text-gold bg-base shadow-sm"
            )}
          >
            {f.label}
            <span
              className={clsx(
                "ml-2 text-xs",
                active === f.value ? "text-base/70" : "text-charcoal/40"
              )}
            >
              {f.value === "all"
                ? initialProjects.length
                : initialProjects.filter((p) => p.category === f.value).length}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="h-16 w-16 text-charcoal/20 mb-4"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 9l-3 3 3 3M15 9l3 3-3 3M13 7l-2 10" />
          </svg>
          <p className="text-charcoal/60 text-lg font-medium">No projects yet</p>
          <p className="text-charcoal/40 text-sm mt-1">
            Check back soon or browse a different category.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

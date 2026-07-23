import { Suspense } from "react";
import ProjectsClient from "./ProjectsClient";
import { getProjects } from "@/lib/store";

export const dynamic = "force-dynamic";

export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <Suspense>
      <ProjectsClient initialProjects={projects} />
    </Suspense>
  );
}

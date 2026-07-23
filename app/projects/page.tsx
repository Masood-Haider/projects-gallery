import { Suspense } from "react";
import ProjectsClient from "./ProjectsClient";
import { getProjects } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <Suspense>
      <ProjectsClient initialProjects={projects} />
    </Suspense>
  );
}

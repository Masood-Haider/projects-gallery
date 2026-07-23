import { notFound } from "next/navigation";
import { getProjectById, getProjects } from "@/lib/store";
import ProjectDetailClient from "./ProjectDetailClient";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ id: p.id }));
}

interface Props {
  params: { id: string };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProjectById(params.id);
  if (!project) notFound();
  return <ProjectDetailClient project={project} />;
}

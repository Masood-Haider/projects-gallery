import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { addProject, getProjects } from "@/lib/store";
import { Project } from "@/lib/types";
import { checkAdminPassword } from "@/lib/auth";
import { randomUUID } from "crypto";

export async function GET() {
  return NextResponse.json(await getProjects());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { password, ...data } = body;

  if (!checkAdminPassword(password)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const project: Project = {
    id: randomUUID(),
    title: data.title,
    description: data.description,
    longDescription: data.longDescription ?? "",
    category: data.category,
    techStack: data.techStack ?? [],
    liveUrl: data.liveUrl || undefined,
    githubUrl: data.githubUrl || undefined,
    screenshots: data.screenshots ?? [],
    thumbnail: data.thumbnail ?? "",
    createdAt: new Date().toISOString(),
  };

  await addProject(project);
  revalidatePath("/");
  revalidatePath("/projects");
  return NextResponse.json(project, { status: 201 });
}

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deleteProject, getProjectById, updateProject } from "@/lib/store";
import { checkAdminPassword } from "@/lib/auth";

interface Params {
  params: { id: string };
}

export async function GET(_req: NextRequest, { params }: Params) {
  const project = await getProjectById(params.id);
  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const body = await req.json();
  const { password, ...updates } = body;

  if (!checkAdminPassword(password)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const updated = await updateProject(params.id, updates);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${params.id}`);
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const body = await req.json();
  const { password } = body;

  if (!checkAdminPassword(password)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const deleted = await deleteProject(params.id);
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${params.id}`);
  return NextResponse.json({ success: true });
}

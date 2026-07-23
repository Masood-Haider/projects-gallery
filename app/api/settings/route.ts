import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { checkAdminPassword } from "@/lib/auth";
import { getSettings, updateSettings } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getSettings());
}

export async function PUT(req: NextRequest) {
  const { password, yearsOfExperience, profilePhoto } = await req.json();

  if (!checkAdminPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  if (typeof yearsOfExperience !== "number") {
    return NextResponse.json(
      { error: "yearsOfExperience must be a number" },
      { status: 400 }
    );
  }

  if (profilePhoto !== undefined && typeof profilePhoto !== "string") {
    return NextResponse.json(
      { error: "profilePhoto must be a string" },
      { status: 400 }
    );
  }

  const updated = await updateSettings({ yearsOfExperience, profilePhoto });
  revalidatePath("/");
  revalidatePath("/about");
  return NextResponse.json(updated);
}

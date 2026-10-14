import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: { id: true, fullName: true, email: true, role: true, preferredLang: true, isVerified: true, createdAt: true },
  });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ user });
}

export async function PATCH(req: NextRequest) {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const allowedFields = ["fullName", "preferredLang"];
    const updates: Record<string, string> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        const val = String(body[field]).trim();
        if (val) updates[field] = val;
      }
    }
    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }
    if (updates.fullName && (updates.fullName.length < 2 || updates.fullName.length > 100)) {
      return NextResponse.json({ error: "Full name must be 2-100 characters" }, { status: 400 });
    }
    const updated = await prisma.user.update({
      where: { id: session.id },
      data: updates,
      select: { id: true, fullName: true, email: true, role: true, preferredLang: true, isVerified: true, createdAt: true },
    });
    return NextResponse.json({ user: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update profile" }, { status: 500 });
  }
}

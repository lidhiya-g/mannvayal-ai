import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.id },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        role: true,
        preferredLang: true,
        state: true,
        district: true,
        farms: {
          include: {
            cropCycles: {
              where: { status: "ACTIVE" },
              include: {
                rescueTasks: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    console.error("Error fetching me:", error);
    return NextResponse.json({ error: "Failed to retrieve session" }, { status: 500 });
  }
}

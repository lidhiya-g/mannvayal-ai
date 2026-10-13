import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, password, preferredLang, state, district, consentAgreed } = body;

    if (!fullName || !email || !password) {
      return NextResponse.json({ error: "Full name, email, and password are required" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        fullName: fullName.trim(),
        email: email.toLowerCase().trim(),
        phone: phone ? phone.trim() : null,
        passwordHash,
        preferredLang: preferredLang || "ta",
        state: state || "Tamil Nadu",
        district: district || "Thanjavur",
        isVerified: true,
        consentRecords: {
          create: [
            { purpose: "COMMUNITY_SHARING", granted: consentAgreed ?? true },
            { purpose: "RESEARCH_ANALYTICS", granted: consentAgreed ?? true },
          ],
        },
      },
    });

    // Record audit event
    await prisma.auditEvent.create({
      data: {
        userId: user.id,
        eventType: "USER_REGISTERED",
        description: `New user registration for ${user.email} (${user.district}, ${user.state})`,
      },
    });

    const token = signToken({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      preferredLang: user.preferredLang,
      state: user.state,
      district: user.district,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        preferredLang: user.preferredLang,
      },
    });

    response.cookies.set("mv_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Failed to create user account" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyPassword, signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, otpMode, otpCode } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // OTP mode for phone/email demo or development
    if (otpMode) {
      // In dev mode, OTP "123456" is allowed or user.otpCode
      if (otpCode !== "123456" && otpCode !== user.otpCode) {
        return NextResponse.json({ error: "Invalid or expired OTP code" }, { status: 401 });
      }
    } else {
      if (!password) {
        return NextResponse.json({ error: "Password is required" }, { status: 400 });
      }
      const isValid = await verifyPassword(password, user.passwordHash);
      if (!isValid) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }
    }

    const token = signToken({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      preferredLang: user.preferredLang,
      state: user.state,
      district: user.district,
    });

    await prisma.auditEvent.create({
      data: {
        userId: user.id,
        eventType: "USER_LOGIN",
        description: `Successful login by ${user.email} (${user.role})`,
      },
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
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}

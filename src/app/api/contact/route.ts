import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    const request = await prisma.supportRequest.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        subject: subject ? subject.trim() : "General Support Inquiry",
        message: message.trim(),
        status: "OPEN",
      },
    });

    return NextResponse.json({ success: true, requestId: request.id });
  } catch (error: any) {
    console.error("Support request error:", error);
    return NextResponse.json({ error: "Failed to submit support request" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { askTamilFarmAdvisor } from "@/lib/advisorKnowledge";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, language, farmContext } = body;

    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Question is required" }, { status: 400 });
    }

    const lang = language === "en" ? "en" : "ta";
    const response = await askTamilFarmAdvisor(question, lang, farmContext);

    return NextResponse.json({
      success: true,
      response,
    });
  } catch (error: any) {
    console.error("Advisor API error:", error);
    return NextResponse.json({ error: "Failed to process advisor query" }, { status: 500 });
  }
}

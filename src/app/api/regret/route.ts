import { NextResponse } from "next/server";
import { calculateCropRegret, CandidateCropInput } from "@/lib/calculations/regretCalculator";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { candidates } = body as { candidates: CandidateCropInput[] };

    if (!candidates || candidates.length === 0) {
      return NextResponse.json({ error: "At least one candidate crop must be supplied" }, { status: 400 });
    }

    const analysis = calculateCropRegret(candidates);

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error: any) {
    console.error("Regret calculation error:", error);
    return NextResponse.json({ error: "Failed to calculate crop decision regret" }, { status: 500 });
  }
}

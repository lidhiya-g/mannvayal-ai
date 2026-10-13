import { NextResponse } from "next/server";
import { getVillageProfile } from "@/lib/rural/villageDataService";
import { getSessionUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const state = searchParams.get("state") || "Punjab";
    const district = searchParams.get("district") || "Ludhiana";
    const village = searchParams.get("village") || "";

    const profile = getVillageProfile(state, district, village);

    // Calculate infrastructure gap summaries
    const totalIndicators = profile.indicators.length;
    const adequateCount = profile.indicators.filter((i) => i.status === "ADEQUATE").length;
    const gapCount = profile.indicators.filter((i) => i.status === "MILD_GAP" || i.status === "DEFICIT").length;
    const unavailableCount = profile.indicators.filter((i) => i.status === "DATA_UNAVAILABLE").length;

    return NextResponse.json({
      success: true,
      profile,
      summary: {
        totalIndicators,
        adequateCount,
        gapCount,
        unavailableCount,
        overallDevelopmentIndex: Math.round((adequateCount / totalIndicators) * 100),
      },
    });
  } catch (error: any) {
    console.error("Village API error:", error);
    return NextResponse.json({ error: "Failed to fetch village data" }, { status: 500 });
  }
}

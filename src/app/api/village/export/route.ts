import { NextResponse } from "next/server";
import { getVillageProfile, INITIAL_DEVELOPMENT_PRIORITIES } from "@/lib/rural/villageDataService";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format") || "csv";
    const state = searchParams.get("state") || "Punjab";
    const district = searchParams.get("district") || "Ludhiana";
    const village = searchParams.get("village") || "Seh";

    const profile = getVillageProfile(state, district, village);

    if (format === "csv") {
      let csv = "ID,Category,Title,Urgency(1-5),Impact(1-5),Feasibility(1-5),CompositeScore(Max 5),Status,ResponsibleStakeholder,TargetMonths,EvidenceNotes,LastUpdated\n";

      for (const p of INITIAL_DEVELOPMENT_PRIORITIES) {
        csv += `"${p.id}","${p.category}","${p.title.replace(/"/g, '""')}","${p.urgency}","${p.communityImpact}","${p.feasibility}","${p.compositeScore}","${p.status}","${p.responsibleStakeholder.replace(/"/g, '""')}","${p.targetCompletionMonths}","${p.evidenceNotes.replace(/"/g, '""')}","${p.lastUpdated}"\n`;
      }

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="MannVayal_Village_Priority_Report_${profile.villageName}_${Date.now()}.csv"`,
        },
      });
    }

    return NextResponse.json({
      village: profile.villageName,
      district: profile.district,
      state: profile.state,
      priorities: INITIAL_DEVELOPMENT_PRIORITIES,
      indicators: profile.indicators,
    });
  } catch (error: any) {
    console.error("Export API error:", error);
    return NextResponse.json({ error: "Failed to export report" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { runClimateSimulation, SimulatorInput } from "@/lib/calculations/climateSimulator";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getSessionUser();
    const body = await req.json();

    const {
      farmId,
      scenarioName,
      cropCode,
      farmAreaAcres,
      soilType,
      sowingDate,
      currentStage,
      baselineRainfallMm,
      rainfallAnomalyPct,
      drySpellDurationDays,
      temperatureAnomalyC,
      availableWaterM3,
      hasBorewellOrCanal,
      save,
    } = body;

    const input: SimulatorInput = {
      cropCode: cropCode || "PADDY",
      farmAreaAcres: Number(farmAreaAcres) || 2.5,
      soilType: soilType || "Clay Loam",
      sowingDate: sowingDate || "2026-08-10",
      currentStage: currentStage || "Panicle Initiation",
      baselineRainfallMm: Number(baselineRainfallMm) || 650,
      rainfallAnomalyPct: Number(rainfallAnomalyPct) || -25,
      drySpellDurationDays: Number(drySpellDurationDays) || 10,
      temperatureAnomalyC: Number(temperatureAnomalyC) || 1.5,
      availableWaterM3: Number(availableWaterM3) || 1500,
      hasBorewellOrCanal: hasBorewellOrCanal ?? true,
    };

    const results = runClimateSimulation(input);

    let savedScenario = null;
    if (save && farmId && session) {
      savedScenario = await prisma.climateScenario.create({
        data: {
          farmId,
          scenarioName: scenarioName || `Simulation (${input.rainfallAnomalyPct}% Rain)`,
          cropCode: input.cropCode,
          rainfallAnomalyPct: input.rainfallAnomalyPct,
          tempAnomalyC: input.temperatureAnomalyC,
          drySpellDays: input.drySpellDurationDays,
          delayedSowingDays: 0,
          riskScore: results.riskScore,
          estimatedWaterDeficitMm: results.waterDeficitMm,
          yieldImpactPct: results.estimatedYieldImpactPct,
          recommendationsJson: JSON.stringify(results.recommendations.map((r) => r.titleEn)),
        },
      });
    }

    return NextResponse.json({
      success: true,
      results,
      savedScenario,
    });
  } catch (error: any) {
    console.error("Simulation error:", error);
    return NextResponse.json({ error: "Failed to execute scenario simulation" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { calculateWaterBudget, WaterBudgetInput } from "@/lib/calculations/waterBudget";
import prisma from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getSessionUser();
    const body = await req.json();

    const {
      farmId,
      farmAreaValue,
      areaUnit,
      cropCode,
      cropStage,
      planningPeriodDays,
      availableWaterVolumeM3,
      storageCapacityM3,
      expectedRainfallMm,
      irrigationMethod,
      soilTexture,
      save,
      periodName,
    } = body;

    const input: WaterBudgetInput = {
      farmAreaValue: Number(farmAreaValue) || 2.5,
      areaUnit: areaUnit || "ACRES",
      cropCode: cropCode || "PADDY",
      cropStage: cropStage || "Panicle Initiation",
      planningPeriodDays: Number(planningPeriodDays) || 30,
      availableWaterVolumeM3: Number(availableWaterVolumeM3) || 1200,
      storageCapacityM3: Number(storageCapacityM3) || 3000,
      expectedRainfallMm: Number(expectedRainfallMm) || 45,
      irrigationMethod: irrigationMethod || "FLOOD",
      soilTexture: soilTexture || "CLAY_LOAM",
    };

    const budget = calculateWaterBudget(input);

    let savedBudget = null;
    if (save && farmId && session) {
      savedBudget = await prisma.waterBudget.create({
        data: {
          farmId,
          periodName: periodName || `Budget (${input.planningPeriodDays} Days)`,
          availableSupplyM3: budget.availableWaterSupplyM3,
          effectiveRainfallM3: budget.effectiveRainfallContributionM3,
          cropDemandM3: budget.grossIrrigationDemandM3,
          netBalanceM3: budget.netWaterBalanceM3,
          deficitPercentage: budget.deficitPercentage,
          mitigationStrategy: budget.allocationAdviceEn[0] || "Standard monitoring",
        },
      });
    }

    return NextResponse.json({
      success: true,
      budget,
      savedBudget,
    });
  } catch (error: any) {
    console.error("Water budget error:", error);
    return NextResponse.json({ error: "Failed to calculate water budget" }, { status: 500 });
  }
}

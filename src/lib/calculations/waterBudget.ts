/**
 * MannVayal AI - Water Budget Wallet Engine
 * 
 * Based on FAO-56 Penman-Monteith crop water requirement principles:
 * ETc = Kc * ET0
 * Gross Irrigation Requirement = (ETc - Effective Rainfall) / Irrigation Efficiency
 */

export interface WaterBudgetInput {
  farmAreaValue: number;
  areaUnit: "ACRES" | "HECTARES" | "CENTS";
  cropCode: string;
  cropStage: string;
  planningPeriodDays: number; // e.g. 15, 30, or 90 days
  availableWaterVolumeM3: number;
  storageCapacityM3?: number;
  expectedRainfallMm: number;
  irrigationMethod: "FLOOD" | "FURROW" | "DRIP" | "SPRINKLER" | "AWD_PADDY";
  soilTexture: "CLAY_LOAM" | "SANDY_LOAM" | "RED_SOIL" | "BLACK_COTTON";
}

// Unit conversion factors to standard Acres and m³
export function convertAreaToAcres(value: number, unit: "ACRES" | "HECTARES" | "CENTS"): number {
  if (unit === "HECTARES") return value * 2.47105;
  if (unit === "CENTS") return value * 0.01;
  return value; // ACRES
}

export function convertM3ToLiters(m3: number): number {
  return m3 * 1000;
}

export function convertMmOverAreaToM3(mm: number, acres: number): number {
  // 1 mm over 1 acre = 4.04686 m3 = 4,047 Litres
  return mm * acres * 4.04686;
}

export interface WaterBudgetResult {
  farmAreaAcres: number;
  dailyET0Mm: number;
  stageKc: number;
  dailyETcMm: number;
  periodTotalETcMm: number;
  effectiveRainfallMm: number;
  netCropWaterDemandMm: number;
  irrigationEfficiencyPct: number;
  grossIrrigationDemandM3: number;
  availableWaterSupplyM3: number;
  effectiveRainfallContributionM3: number;
  netWaterBalanceM3: number; // Positive = Surplus, Negative = Deficit
  isDeficit: boolean;
  deficitPercentage: number;
  daysOfWaterRemaining: number;
  reservoirFillPct: number; // 0 to 100% of capacity
  waterSavingWithDripM3: number;
  allocationAdviceEn: string[];
  allocationAdviceTa: string[];
  scientificReference: string;
}

export const IRRIGATION_EFFICIENCIES: Record<string, number> = {
  FLOOD: 0.40,      // 40% efficiency due to deep percolation and conveyance losses
  FURROW: 0.60,     // 60%
  SPRINKLER: 0.75,  // 75%
  DRIP: 0.90,       // 90% micro-irrigation
  AWD_PADDY: 0.70,  // 70% alternate wetting and drying
};

export const CROP_STAGE_KC: Record<string, Record<string, number>> = {
  PADDY: {
    "Land preparation": 1.10,
    "Sowing / Nursery": 1.15,
    "Vegetative": 1.10,
    "Flowering / Panicle Initiation": 1.35, // Peak water extraction
    "Grain Filling": 1.20,
    "Maturity": 0.90,
    "Harvest": 0.00,
  },
  RAGI: {
    "Land preparation": 0.40,
    "Sowing": 0.50,
    "Vegetative": 0.75,
    "Flowering": 1.05,
    "Grain Filling": 0.85,
    "Maturity": 0.55,
    "Harvest": 0.00,
  },
  COTTON: {
    "Land preparation": 0.40,
    "Sowing": 0.45,
    "Vegetative": 0.75,
    "Flowering / Square Formation": 1.15,
    "Boll Development": 1.10,
    "Maturity": 0.65,
    "Harvest": 0.00,
  },
  GROUNDNUT: {
    "Land preparation": 0.40,
    "Sowing": 0.45,
    "Vegetative": 0.75,
    "Pegging & Flowering": 1.05,
    "Pod Formation": 0.95,
    "Maturity": 0.55,
    "Harvest": 0.00,
  },
  MAIZE: {
    "Land preparation": 0.40,
    "Sowing": 0.50,
    "Vegetative": 0.85,
    "Tasseling & Silking": 1.20,
    "Grain Filling": 1.10,
    "Maturity": 0.60,
    "Harvest": 0.00,
  },
  RED_GRAM: {
    "Land preparation": 0.35,
    "Sowing": 0.40,
    "Vegetative": 0.70,
    "Flowering & Podding": 1.00,
    "Grain Filling": 0.80,
    "Maturity": 0.45,
    "Harvest": 0.00,
  },
};

export function calculateWaterBudget(input: WaterBudgetInput): WaterBudgetResult {
  const farmAreaAcres = convertAreaToAcres(input.farmAreaValue, input.areaUnit);
  
  // Baseline Reference ET0 for Tamil Nadu / Tropical India (average 4.5 mm/day)
  const dailyET0Mm = 4.6;
  const stageKcMap = CROP_STAGE_KC[input.cropCode] || CROP_STAGE_KC.PADDY;
  const stageKc = stageKcMap[input.cropStage] ?? 1.0;
  
  const dailyETcMm = dailyET0Mm * stageKc;
  const periodTotalETcMm = dailyETcMm * input.planningPeriodDays;

  // Effective rainfall calculation
  let soilRetentionFactor = 0.70;
  if (input.soilTexture === "CLAY_LOAM" || input.soilTexture === "BLACK_COTTON") {
    soilRetentionFactor = 0.80;
  } else if (input.soilTexture === "SANDY_LOAM") {
    soilRetentionFactor = 0.55;
  }
  const effectiveRainfallMm = Math.min(periodTotalETcMm, input.expectedRainfallMm * soilRetentionFactor);
  const netCropWaterDemandMm = Math.max(0, periodTotalETcMm - effectiveRainfallMm);

  // Irrigation efficiency adjustment
  const efficiency = IRRIGATION_EFFICIENCIES[input.irrigationMethod] || 0.50;
  const grossWaterDemandMm = netCropWaterDemandMm / efficiency;

  // Volume calculations in m3
  const grossIrrigationDemandM3 = Math.round(convertMmOverAreaToM3(grossWaterDemandMm, farmAreaAcres));
  const effectiveRainfallContributionM3 = Math.round(convertMmOverAreaToM3(effectiveRainfallMm, farmAreaAcres));
  const availableWaterSupplyM3 = input.availableWaterVolumeM3;

  // Net Balance
  const netWaterBalanceM3 = Math.round(availableWaterSupplyM3 - grossIrrigationDemandM3);
  const isDeficit = netWaterBalanceM3 < 0;
  const deficitPercentage = isDeficit && grossIrrigationDemandM3 > 0
    ? Math.min(100, Math.round((Math.abs(netWaterBalanceM3) / grossIrrigationDemandM3) * 100))
    : 0;

  // Days of water remaining at current daily depletion rate
  const dailyDemandM3 = grossIrrigationDemandM3 / Math.max(1, input.planningPeriodDays);
  const daysOfWaterRemaining = dailyDemandM3 > 0
    ? Math.min(input.planningPeriodDays * 3, Math.round(availableWaterSupplyM3 / dailyDemandM3))
    : 999;

  // Storage Reservoir Fill Percentage
  const capacity = input.storageCapacityM3 && input.storageCapacityM3 > 0 ? input.storageCapacityM3 : Math.max(availableWaterSupplyM3, 1000);
  const reservoirFillPct = Math.min(100, Math.max(0, Math.round((availableWaterSupplyM3 / capacity) * 100)));

  // Potential water savings if converted to Drip (efficiency = 0.90)
  const dripDemandMm = netCropWaterDemandMm / 0.90;
  const dripDemandM3 = Math.round(convertMmOverAreaToM3(dripDemandMm, farmAreaAcres));
  const waterSavingWithDripM3 = Math.max(0, grossIrrigationDemandM3 - dripDemandM3);

  // Allocation & Rationing Guidance
  const allocationAdviceEn: string[] = [];
  const allocationAdviceTa: string[] = [];

  if (isDeficit) {
    allocationAdviceEn.push(`Deficit Alert: Available water falls short by ${Math.abs(netWaterBalanceM3).toLocaleString("en-IN")} m³ (${deficitPercentage}% deficit) over the next ${input.planningPeriodDays} days.`);
    allocationAdviceTa.push(`நீர் பற்றாக்குறை எச்சரிக்கை: அடுத்த ${input.planningPeriodDays} நாட்களில் ${Math.abs(netWaterBalanceM3).toLocaleString("en-IN")} மீ³ (${deficitPercentage}%) நீர் பற்றாக்குறை ஏற்படும் வாய்ப்புள்ளது.`);

    if (input.irrigationMethod === "FLOOD") {
      allocationAdviceEn.push(`Efficiency Upgrade: Shifting from flood irrigation to drip or sprinkler can conserve ${waterSavingWithDripM3.toLocaleString("en-IN")} m³ of water, eliminating ${Math.round((waterSavingWithDripM3 / Math.abs(netWaterBalanceM3)) * 100)}% of your deficit.`);
      allocationAdviceTa.push(`பாசன முறை மாற்றம்: வாய்க்கால் பாசனத்திற்கு பதிலாக சொட்டு நீர் பாசனம் அமைத்தால் ${waterSavingWithDripM3.toLocaleString("en-IN")} மீ³ நீரை சேமித்து பற்றாக்குறையை குறைக்கலாம்.`);
    }

    if (input.cropStage.includes("Vegetative")) {
      allocationAdviceEn.push(`Stage Rationing: During the vegetative stage, lengthen irrigation intervals by 2-3 days to encourage deeper root exploration and reserve water for the sensitive flowering phase.`);
      allocationAdviceTa.push(`பயிர் நிலைக்கேற்ப பங்கீடு: பயிர் வளர்ச்சி நிலையில் நீர் இடைவெளியை 2-3 நாட்கள் நீட்டிக்கலாம். பூக்கும் பருவத்திற்கு நீரை சேமித்து வைக்கவும்.`);
    }
  } else {
    allocationAdviceEn.push(`Water Balance Positive: You have an estimated buffer of ${netWaterBalanceM3.toLocaleString("en-IN")} m³ sufficient for approximately ${daysOfWaterRemaining} days under normal weather.`);
    allocationAdviceTa.push(`நீர் இருப்பு போதுமானது: அடுத்த ${daysOfWaterRemaining} நாட்களுக்கு தேவையான ${netWaterBalanceM3.toLocaleString("en-IN")} மீ³ உபரி நீர் இருப்பு உள்ளது.`);
  }

  return {
    farmAreaAcres: Math.round(farmAreaAcres * 100) / 100,
    dailyET0Mm,
    stageKc,
    dailyETcMm: Math.round(dailyETcMm * 100) / 100,
    periodTotalETcMm: Math.round(periodTotalETcMm),
    effectiveRainfallMm: Math.round(effectiveRainfallMm),
    netCropWaterDemandMm: Math.round(netCropWaterDemandMm),
    irrigationEfficiencyPct: Math.round(efficiency * 100),
    grossIrrigationDemandM3,
    availableWaterSupplyM3,
    effectiveRainfallContributionM3,
    netWaterBalanceM3,
    isDeficit,
    deficitPercentage,
    daysOfWaterRemaining,
    reservoirFillPct,
    waterSavingWithDripM3,
    allocationAdviceEn,
    allocationAdviceTa,
    scientificReference: "FAO-56 Penman-Monteith Guidelines & TNAU Water Technology Centre (WTC) irrigation benchmarks.",
  };
}

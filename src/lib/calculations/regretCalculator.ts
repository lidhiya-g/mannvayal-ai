/**
 * MannVayal AI - Crop Decision Regret Calculator
 * 
 * Implements Savage's Minimax Regret Criterion (1951) for agricultural decision analysis under climate uncertainty.
 * Evaluates downside risk and financial sensitivity across 5 climate states of nature.
 * 
 * Regret R(c, s) = BestReturn(s) - Return(c, s)
 * Minimax Recommendation = argmin_c [ max_s R(c, s) ]
 */

export interface CandidateCropInput {
  id: string;
  cropCode: string;
  cropName: string;
  farmAreaAcres: number;
  seedCostInr: number;
  fertilizerCostInr: number;
  labourCostInr: number;
  irrigationCostInr: number;
  otherInputCostsInr: number;
  expectedYieldKgPerAcre: number;
  expectedSellingPricePerKg: number;
  // Sensitivity multipliers under stress states
  droughtYieldMultiplier?: number;
  heatYieldMultiplier?: number;
}

export type ClimateScenarioKey = 
  | "NORMAL_MONSOON" 
  | "DEFICIT_RAINFALL" 
  | "SEVERE_DROUGHT" 
  | "DELAYED_MONSOON" 
  | "HEATWAVE_SHOCK";

export interface ClimateScenarioDefinition {
  key: ClimateScenarioKey;
  nameEn: string;
  nameTa: string;
  descriptionEn: string;
  probabilityLabel: string;
  rainfallFactor: number;
  tempAnomalyC: number;
  cropYieldMultipliers: Record<string, number>; // cropCode -> yield adjustment factor
}

export const CLIMATE_SCENARIOS: ClimateScenarioDefinition[] = [
  {
    key: "NORMAL_MONSOON",
    nameEn: "Normal Monsoon (Baseline)",
    nameTa: "வழக்கமான பருவமழை (இயல்பு)",
    descriptionEn: "Timely onset with rainfall within ±10% of long-period average.",
    probabilityLabel: "Historical Probability: 45%",
    rainfallFactor: 1.0,
    tempAnomalyC: 0.0,
    cropYieldMultipliers: {
      PADDY: 1.0,
      RAGI: 1.0,
      COTTON: 1.0,
      GROUNDNUT: 1.0,
      MAIZE: 1.0,
      RED_GRAM: 1.0,
    },
  },
  {
    key: "DEFICIT_RAINFALL",
    nameEn: "Deficit Rainfall (-25%)",
    nameTa: "குறைவான மழைப்பொழிவு (-25%)",
    descriptionEn: "Rainfall shortfall of 20% to 30% below seasonal normal with intermittent dry spells.",
    probabilityLabel: "Historical Probability: 25%",
    rainfallFactor: 0.75,
    tempAnomalyC: 0.8,
    cropYieldMultipliers: {
      PADDY: 0.65,      // High drop due to heavy water requirement
      RAGI: 0.90,       // Very resilient millet
      COTTON: 0.80,     // Moderate resilience
      GROUNDNUT: 0.78,  // Moderate resilience
      MAIZE: 0.70,      // Moderately sensitive
      RED_GRAM: 0.88,   // Deep taproot resilience
    },
  },
  {
    key: "SEVERE_DROUGHT",
    nameEn: "Severe Drought (-45%)",
    nameTa: "கடும் வறட்சி (-45%)",
    descriptionEn: "Deficit greater than 40% with surface water reservoir depletion.",
    probabilityLabel: "Historical Probability: 12%",
    rainfallFactor: 0.55,
    tempAnomalyC: 1.8,
    cropYieldMultipliers: {
      PADDY: 0.35,      // Critical failure without heavy borewell support
      RAGI: 0.75,       // Millets survive and yield
      COTTON: 0.55,
      GROUNDNUT: 0.50,
      MAIZE: 0.45,
      RED_GRAM: 0.70,
    },
  },
  {
    key: "DELAYED_MONSOON",
    nameEn: "Delayed Sowing Window (30+ Days)",
    nameTa: "தாமதமான பருவமழை (30+ நாட்கள்)",
    descriptionEn: "Late monsoon onset compresses growth duration and shifts flowering into pest/heat periods.",
    probabilityLabel: "Historical Probability: 10%",
    rainfallFactor: 0.85,
    tempAnomalyC: 1.0,
    cropYieldMultipliers: {
      PADDY: 0.60,      // Long duration varieties suffer sterility
      RAGI: 0.85,       // Short duration adapts well
      COTTON: 0.70,
      GROUNDNUT: 0.75,
      MAIZE: 0.65,
      RED_GRAM: 0.80,
    },
  },
  {
    key: "HEATWAVE_SHOCK",
    nameEn: "Elevated Heat Shock (+2.5°C)",
    nameTa: "தீவிர வெப்ப அலை (+2.5°C)",
    descriptionEn: "Critical flowering / reproductive period coincides with temperatures exceeding 38°C.",
    probabilityLabel: "Historical Probability: 8%",
    rainfallFactor: 0.90,
    tempAnomalyC: 2.5,
    cropYieldMultipliers: {
      PADDY: 0.72,      // Pollen sterility
      RAGI: 0.85,
      COTTON: 0.75,
      GROUNDNUT: 0.70,
      MAIZE: 0.58,      // Highly sensitive silking stage
      RED_GRAM: 0.82,
    },
  },
];

export interface CropScenarioOutcome {
  cropId: string;
  cropName: string;
  scenarioKey: ClimateScenarioKey;
  scenarioNameEn: string;
  scenarioNameTa: string;
  totalCostInr: number;
  expectedYieldKg: number;
  grossRevenueInr: number;
  netReturnInr: number;
  regretInr: number; // Regret vs best possible alternative in this scenario
}

export interface RegretAnalysisResult {
  candidateSummary: {
    cropId: string;
    cropCode: string;
    cropName: string;
    farmAreaAcres: number;
    totalCostInr: number;
    normalNetReturnInr: number;
    worstCaseNetReturnInr: number;
    maxRegretInr: number;
    averageReturnInr: number;
    downsideRiskCategory: "LOW" | "MODERATE" | "HIGH" | "VERY_HIGH";
    isMinimaxRecommendation: boolean;
  }[];
  scenarioOutcomes: CropScenarioOutcome[];
  minimaxCropId: string;
  minimaxCropName: string;
  maxProfitCropId: string;
  maxProfitCropName: string;
  keyInsightsEn: string[];
  keyInsightsTa: string[];
  decisionDisclaimer: string;
}

export function calculateCropRegret(candidates: CandidateCropInput[]): RegretAnalysisResult {
  if (!candidates || candidates.length === 0) {
    throw new Error("At least one candidate crop must be supplied for regret evaluation.");
  }

  // Calculate costs and scenario outcomes for all crops
  const rawOutcomes: {
    crop: CandidateCropInput;
    totalCost: number;
    scenarioResults: Record<ClimateScenarioKey, { yieldKg: number; grossRev: number; netReturn: number }>;
  }[] = [];

  for (const c of candidates) {
    const totalCost = (c.seedCostInr + c.fertilizerCostInr + c.labourCostInr + c.irrigationCostInr + c.otherInputCostsInr) * c.farmAreaAcres;
    const scenarioResults = {} as Record<ClimateScenarioKey, { yieldKg: number; grossRev: number; netReturn: number }>;

    for (const s of CLIMATE_SCENARIOS) {
      const mult = s.cropYieldMultipliers[c.cropCode] ?? 0.75;
      const effectiveYieldPerAcre = c.expectedYieldKgPerAcre * mult;
      const totalYieldKg = Math.round(effectiveYieldPerAcre * c.farmAreaAcres);
      const grossRev = Math.round(totalYieldKg * c.expectedSellingPricePerKg);
      const netReturn = grossRev - totalCost;

      scenarioResults[s.key] = {
        yieldKg: totalYieldKg,
        grossRev,
        netReturn,
      };
    }

    rawOutcomes.push({
      crop: c,
      totalCost,
      scenarioResults,
    });
  }

  // Find the maximum (ideal) return for each scenario: Oracle Payoff
  const oraclePayoff: Record<ClimateScenarioKey, number> = {} as any;
  for (const s of CLIMATE_SCENARIOS) {
    let maxReturn = -Infinity;
    for (const ro of rawOutcomes) {
      if (ro.scenarioResults[s.key].netReturn > maxReturn) {
        maxReturn = ro.scenarioResults[s.key].netReturn;
      }
    }
    oraclePayoff[s.key] = maxReturn;
  }

  // Calculate Regret for each candidate crop in each scenario
  const allOutcomes: CropScenarioOutcome[] = [];
  const candidateSummary: RegretAnalysisResult["candidateSummary"] = [];

  for (const ro of rawOutcomes) {
    let maxRegret = 0;
    let worstReturn = Infinity;
    let sumReturn = 0;

    for (const s of CLIMATE_SCENARIOS) {
      const net = ro.scenarioResults[s.key].netReturn;
      const regret = Math.max(0, oraclePayoff[s.key] - net);
      if (regret > maxRegret) maxRegret = regret;
      if (net < worstReturn) worstReturn = net;
      sumReturn += net;

      allOutcomes.push({
        cropId: ro.crop.id,
        cropName: ro.crop.cropName,
        scenarioKey: s.key,
        scenarioNameEn: s.nameEn,
        scenarioNameTa: s.nameTa,
        totalCostInr: ro.totalCost,
        expectedYieldKg: ro.scenarioResults[s.key].yieldKg,
        grossRevenueInr: ro.scenarioResults[s.key].grossRev,
        netReturnInr: net,
        regretInr: regret,
      });
    }

    const normalReturn = ro.scenarioResults["NORMAL_MONSOON"].netReturn;
    const avgReturn = Math.round(sumReturn / CLIMATE_SCENARIOS.length);

    let downsideCat: RegretAnalysisResult["candidateSummary"][0]["downsideRiskCategory"] = "MODERATE";
    if (worstReturn < -15000) downsideCat = "VERY_HIGH";
    else if (worstReturn < 0) downsideCat = "HIGH";
    else if (worstReturn > 15000) downsideCat = "LOW";

    candidateSummary.push({
      cropId: ro.crop.id,
      cropCode: ro.crop.cropCode,
      cropName: ro.crop.cropName,
      farmAreaAcres: ro.crop.farmAreaAcres,
      totalCostInr: ro.totalCost,
      normalNetReturnInr: normalReturn,
      worstCaseNetReturnInr: worstReturn,
      maxRegretInr: maxRegret,
      averageReturnInr: avgReturn,
      downsideRiskCategory: downsideCat,
      isMinimaxRecommendation: false,
    });
  }

  // Identify Minimax Regret crop (the one that minimizes maximum regret)
  let lowestMaxRegret = Infinity;
  let minimaxIndex = 0;
  for (let i = 0; i < candidateSummary.length; i++) {
    if (candidateSummary[i].maxRegretInr < lowestMaxRegret) {
      lowestMaxRegret = candidateSummary[i].maxRegretInr;
      minimaxIndex = i;
    }
  }
  candidateSummary[minimaxIndex].isMinimaxRecommendation = true;

  // Identify Highest Profit in Normal Conditions
  let highestNormalReturn = -Infinity;
  let maxProfitIndex = 0;
  for (let i = 0; i < candidateSummary.length; i++) {
    if (candidateSummary[i].normalNetReturnInr > highestNormalReturn) {
      highestNormalReturn = candidateSummary[i].normalNetReturnInr;
      maxProfitIndex = i;
    }
  }

  const minimaxCrop = candidateSummary[minimaxIndex];
  const maxProfitCrop = candidateSummary[maxProfitIndex];

  const keyInsightsEn = [
    `Minimax Regret Choice: ${minimaxCrop.cropName} limits your worst-case regret to ₹${minimaxCrop.maxRegretInr.toLocaleString("en-IN")}, protecting capital under erratic rainfall.`,
    `Max-Profit Under Normal Weather: ${maxProfitCrop.cropName} provides highest return (₹${maxProfitCrop.normalNetReturnInr.toLocaleString("en-IN")}) under favorable monsoon, but carries a downside of ₹${maxProfitCrop.worstCaseNetReturnInr.toLocaleString("en-IN")} during severe drought.`,
    minimaxCrop.cropId !== maxProfitCrop.cropId
      ? `Tradeoff Alert: Choosing ${maxProfitCrop.cropName} risks ₹${(minimaxCrop.worstCaseNetReturnInr - maxProfitCrop.worstCaseNetReturnInr).toLocaleString("en-IN")} more capital loss than ${minimaxCrop.cropName} if rainfall fails.`
      : `High Alignment: ${minimaxCrop.cropName} balances both robust profits and low downside regret.`,
  ];

  const keyInsightsTa = [
    `குறைந்த வருத்த தேர்வு (Minimax Regret): ${minimaxCrop.cropName} பயிர் மழைப்பொழிவு மாறினாலும் உங்கள் அதிகபட்ச இழப்பு வருத்தத்தை ₹${minimaxCrop.maxRegretInr.toLocaleString("en-IN")} ஆகக் கட்டுப்படுத்துகிறது.`,
    `இயல்பு மழையில் அதிக லாபம்: ${maxProfitCrop.cropName} இயல்பு மழையில் ₹${maxProfitCrop.normalNetReturnInr.toLocaleString("en-IN")} லாபம் தரும், ஆனால் வறட்சியில் ₹${maxProfitCrop.worstCaseNetReturnInr.toLocaleString("en-IN")} வரை குறையக்கூடும்.`,
    `முடிவெடுக்கும் வழிகாட்டல்: அதிக லாபத்தை மட்டுமே பார்க்காமல், நீர் இருப்பு மற்றும் வறட்சி அபாயத்தை ஒப்பிட்டு இறுதி பயிரை தேர்வு செய்யவும்.`,
  ];

  return {
    candidateSummary,
    scenarioOutcomes: allOutcomes,
    minimaxCropId: minimaxCrop.cropId,
    minimaxCropName: minimaxCrop.cropName,
    maxProfitCropId: maxProfitCrop.cropId,
    maxProfitCropName: maxProfitCrop.cropName,
    keyInsightsEn,
    keyInsightsTa,
    decisionDisclaimer: "Regret calculation is a decision-support model under climate uncertainty. It does not constitute a guaranteed financial outcome or profit promise.",
  };
}

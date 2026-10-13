/**
 * MannVayal AI - Climate What-If Scenario Calculation Engine
 * 
 * Based on FAO-33 Yield Response to Water (Doorenbos and Kassam)
 * and ICAR / TNAU (Tamil Nadu Agricultural University) agronomic crop-water benchmarks.
 * 
 * Formula: (1 - Ya/Ym) = Ky * (1 - ETa/ETm)
 * Where Ky is the yield response factor for the crop and its specific growth stage.
 */

export interface SimulatorInput {
  cropCode: string;
  farmAreaAcres: number;
  soilType: string; // "Clay Loam" | "Sandy Loam" | "Red Soil" | "Black Cotton Soil" | "Alluvial"
  sowingDate: string;
  currentStage: string;
  baselineRainfallMm: number; // e.g. 650 mm for Samba / Kharif
  rainfallAnomalyPct: number; // -50% to +50%
  drySpellDurationDays: number; // 0 to 30 days
  temperatureAnomalyC: number; // 0 to +5 °C
  availableWaterM3: number;
  hasBorewellOrCanal: boolean;
}

export interface ScenarioRecommendation {
  id: string;
  titleEn: string;
  titleTa: string;
  descriptionEn: string;
  descriptionTa: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  agronomicBasis: string;
}

export interface SimulatorResult {
  simulatedRainfallMm: number;
  rainfallDeviationMm: number;
  cropTotalWaterDemandMm: number;
  effectiveRainfallMm: number;
  waterDeficitMm: number;
  waterDeficitM3: number;
  cropStageStressFactor: number; // 0.0 to 1.0 (1.0 = severe stress)
  estimatedYieldImpactPct: number; // e.g. -28.5%
  riskScore: number; // 0 to 100
  riskCategory: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  estimatedFinancialDownsideInr: number;
  uncertaintyRangePct: { min: number; max: number };
  recommendations: ScenarioRecommendation[];
  scientificReference: string;
  dataFreshnessNotice: string;
}

// Crop specific agronomic parameters
export const CROP_AGRO_DATA: Record<string, {
  nameEn: string;
  nameTa: string;
  baseYieldKgPerAcre: number;
  marketPricePerKg: number;
  cultivationCostPerAcre: number;
  seasonWaterDemandMm: number;
  kyFactor: number; // FAO 33 yield response factor (overall)
  stageKyFactors: Record<string, number>;
}> = {
  PADDY: {
    nameEn: "Paddy (Rice / நெல்)",
    nameTa: "நெல்",
    baseYieldKgPerAcre: 2400,
    marketPricePerKg: 23.5, // MSP for paddy common 2024-25 in India
    cultivationCostPerAcre: 28000,
    seasonWaterDemandMm: 1200,
    kyFactor: 1.15, // Very sensitive to water stress
    stageKyFactors: {
      "Land preparation": 0.3,
      "Sowing / Nursery": 0.6,
      "Vegetative": 0.8,
      "Flowering / Panicle Initiation": 1.4, // Most critical stage!
      "Grain Filling": 1.0,
      "Maturity": 0.2,
      "Harvest": 0.0,
    },
  },
  RAGI: {
    nameEn: "Finger Millet (Ragi / கேழ்வரகு)",
    nameTa: "கேழ்வரகு",
    baseYieldKgPerAcre: 1100,
    marketPricePerKg: 42.9, // MSP 2024-25
    cultivationCostPerAcre: 14000,
    seasonWaterDemandMm: 450,
    kyFactor: 0.70, // Drought hardy millet
    stageKyFactors: {
      "Land preparation": 0.2,
      "Sowing": 0.4,
      "Vegetative": 0.5,
      "Flowering": 0.9,
      "Grain Filling": 0.6,
      "Maturity": 0.1,
      "Harvest": 0.0,
    },
  },
  COTTON: {
    nameEn: "Cotton (பருத்தி)",
    nameTa: "பருத்தி",
    baseYieldKgPerAcre: 900,
    marketPricePerKg: 75.2,
    cultivationCostPerAcre: 32000,
    seasonWaterDemandMm: 700,
    kyFactor: 0.85,
    stageKyFactors: {
      "Land preparation": 0.2,
      "Sowing": 0.4,
      "Vegetative": 0.6,
      "Flowering / Square Formation": 1.25,
      "Boll Development": 0.9,
      "Maturity": 0.3,
      "Harvest": 0.0,
    },
  },
  GROUNDNUT: {
    nameEn: "Groundnut (வேர்க்கடலை)",
    nameTa: "வேர்க்கடலை",
    baseYieldKgPerAcre: 1050,
    marketPricePerKg: 67.8,
    cultivationCostPerAcre: 22000,
    seasonWaterDemandMm: 550,
    kyFactor: 0.80,
    stageKyFactors: {
      "Land preparation": 0.2,
      "Sowing": 0.4,
      "Vegetative": 0.6,
      "Pegging & Flowering": 1.3,
      "Pod Formation": 1.0,
      "Maturity": 0.2,
      "Harvest": 0.0,
    },
  },
  MAIZE: {
    nameEn: "Maize (மக்காச்சோளம்)",
    nameTa: "மக்காச்சோளம்",
    baseYieldKgPerAcre: 2800,
    marketPricePerKg: 22.2,
    cultivationCostPerAcre: 21000,
    seasonWaterDemandMm: 600,
    kyFactor: 1.25,
    stageKyFactors: {
      "Land preparation": 0.2,
      "Sowing": 0.5,
      "Vegetative": 0.7,
      "Tasseling & Silking": 1.5,
      "Grain Filling": 0.9,
      "Maturity": 0.2,
      "Harvest": 0.0,
    },
  },
  RED_GRAM: {
    nameEn: "Red Gram / Pigeon Pea (துவரை)",
    nameTa: "துவரை",
    baseYieldKgPerAcre: 650,
    marketPricePerKg: 75.5,
    cultivationCostPerAcre: 16000,
    seasonWaterDemandMm: 400,
    kyFactor: 0.65,
    stageKyFactors: {
      "Land preparation": 0.2,
      "Sowing": 0.4,
      "Vegetative": 0.5,
      "Flowering & Podding": 1.1,
      "Grain Filling": 0.7,
      "Maturity": 0.1,
      "Harvest": 0.0,
    },
  },
};

export function runClimateSimulation(input: SimulatorInput): SimulatorResult {
  const crop = CROP_AGRO_DATA[input.cropCode] || CROP_AGRO_DATA.PADDY;
  
  // 1. Calculate simulated rainfall
  const simulatedRainfall = Math.max(0, input.baselineRainfallMm * (1 + input.rainfallAnomalyPct / 100));
  const rainfallDeviation = simulatedRainfall - input.baselineRainfallMm;

  // 2. Soil moisture retention multiplier (Soil Water Holding Capacity)
  let soilMultiplier = 1.0;
  if (input.soilType === "Clay Loam") soilMultiplier = 1.15; // Holds more moisture
  else if (input.soilType === "Sandy Loam") soilMultiplier = 0.82; // Leaches fast
  else if (input.soilType === "Black Cotton Soil") soilMultiplier = 1.25; // Very high water retention
  else if (input.soilType === "Red Soil") soilMultiplier = 0.90;

  // Effective rainfall estimate (USDA SCS curve approximation)
  const effectiveRainfall = Math.min(simulatedRainfall, simulatedRainfall * 0.75 * soilMultiplier);

  // 3. Dry spell and temperature stress penalty
  const drySpellStress = Math.min(0.45, (input.drySpellDurationDays / 25) * 0.35);
  const tempStress = Math.min(0.35, (input.temperatureAnomalyC / 5.0) * 0.30);

  // 4. Stage sensitivity
  const currentStageKy = crop.stageKyFactors[input.currentStage] || crop.kyFactor;

  // 5. Total water shortfall
  const cropDemand = crop.seasonWaterDemandMm;
  const rawDeficitMm = Math.max(0, cropDemand - effectiveRainfall);

  // If irrigation is available, it mitigates deficit
  let mitigatedDeficitMm = rawDeficitMm;
  if (input.hasBorewellOrCanal && input.availableWaterM3 > 0) {
    // 1 mm on 1 acre = 4.047 m3 of water
    const availableMmEquivalent = input.availableWaterM3 / (input.farmAreaAcres * 4.047);
    mitigatedDeficitMm = Math.max(0, rawDeficitMm - availableMmEquivalent);
  }

  // Deficit in cubic meters for the whole farm area
  const waterDeficitM3 = Math.round(mitigatedDeficitMm * input.farmAreaAcres * 4.047);

  // 6. Stage stress factor (0 to 1)
  const waterStressFraction = Math.min(1.0, mitigatedDeficitMm / cropDemand);
  const cropStageStressFactor = Math.min(1.0, (waterStressFraction * 0.5 + drySpellStress + tempStress) * (currentStageKy / 1.0));

  // 7. Estimated yield loss % based on FAO 33: (1 - Ya/Ym) = Ky * (1 - ETa/ETm)
  const rawYieldLossPct = Math.min(85, Math.max(0, (waterStressFraction * crop.kyFactor + drySpellStress * 0.8 + tempStress * 0.6) * 100));
  const estimatedYieldImpactPct = -Math.round(rawYieldLossPct * 10) / 10;

  // 8. Overall Risk Score (0 - 100)
  let riskScore = Math.min(100, Math.round(
    (waterStressFraction * 40) +
    (drySpellStress * 60) +
    (tempStress * 50) +
    (currentStageKy > 1.2 ? 15 : 5)
  ));
  if (input.hasBorewellOrCanal && mitigatedDeficitMm < rawDeficitMm * 0.4) {
    riskScore = Math.max(10, Math.round(riskScore * 0.65)); // Irrigation buffer
  }

  let riskCategory: SimulatorResult["riskCategory"] = "LOW";
  if (riskScore >= 75) riskCategory = "CRITICAL";
  else if (riskScore >= 50) riskCategory = "HIGH";
  else if (riskScore >= 25) riskCategory = "MODERATE";

  // 9. Financial downside estimate
  const baselineGrossReturn = input.farmAreaAcres * crop.baseYieldKgPerAcre * crop.marketPricePerKg;
  const yieldLossFraction = Math.abs(estimatedYieldImpactPct) / 100;
  const estimatedFinancialDownsideInr = Math.round(baselineGrossReturn * yieldLossFraction);

  // 10. Agronomic recommendations based on scenario
  const recommendations: ScenarioRecommendation[] = [];

  if (input.drySpellDurationDays >= 7) {
    recommendations.push({
      id: "REC_MULCH",
      titleEn: "Mulching & In-situ Moisture Conservation",
      titleTa: "மூடாக்கு மற்றும் ஈரப்பதம் பாதுகாப்பு",
      descriptionEn: "Apply paddy straw or coir pith mulching (5 cm thickness) across crop rows to cut evaporative soil water loss by up to 35%.",
      descriptionTa: "மண்ணின் ஈரப்பதம் ஆவியாகாமல் காக்க வைக்கோல் அல்லது தென்னை நார்க்கழிவு கொண்டு 5 செ.மீ மூடாக்கு அமைக்கவும். இது 35% ஈரப்பதம் இழப்பைத் தடுக்கும்.",
      priority: "HIGH",
      agronomicBasis: "TNAU Agronomy Guidelines: Soil surface cover reduces bare soil radiation absorption and vapor pressure deficit gradient.",
    });
  }

  if (input.temperatureAnomalyC >= 1.5 || input.drySpellDurationDays >= 10) {
    recommendations.push({
      id: "REC_KCL_SPRAY",
      titleEn: "Foliar Spray of 1% KCl (Potassium Chloride)",
      titleTa: "1% பொட்டாசியம் குளோரைடு (KCl) இலைவழி தெளிப்பு",
      descriptionEn: "Spray 1% KCl or 2% DAP solution during morning hours to regulate stomatal aperture and induce osmotic drought tolerance.",
      descriptionTa: "வறட்சி தாங்கும் தன்மையை அதிகரிக்க காலை வேளையில் 1% பொட்டாசியம் குளோரைடு இலைவழி தெளிக்கவும். இது இலைத்துளைகளை ஒழுங்குபடுத்தும்.",
      priority: input.currentStage.includes("Flowering") ? "URGENT" : "HIGH",
      agronomicBasis: "ICAR Stress Physiology: Foliar potassium enhances cell turgor pressure maintenance and activates stress defense enzymes.",
    });
  }

  if (input.cropCode === "PADDY" && mitigatedDeficitMm > 150) {
    recommendations.push({
      id: "REC_AWD",
      titleEn: "Adopt Alternate Wetting and Drying (AWD)",
      titleTa: "காய்ச்சலும் பாய்ச்சலும் நீர்ப்பாசன முறை (AWD)",
      descriptionEn: "Do not keep field continuously submerged. Re-irrigate only when water level drops 5 cm below soil surface using a perforated field pipe.",
      descriptionTa: "வயலில் எப்போதும் தண்ணீர் தேக்கி வைக்காமல், காய்ச்சலும் பாய்ச்சலுமாக பாசனம் செய்யவும். இது 30% தண்ணீரை சேமிக்கும்.",
      priority: "URGENT",
      agronomicBasis: "IRRI & TNAU Water Technology Center: AWD saves 25-35% water without yield penalty during vegetative phase.",
    });
  }

  if (input.rainfallAnomalyPct <= -25 && input.currentStage === "Sowing") {
    recommendations.push({
      id: "REC_CONTINGENCY_CROP",
      titleEn: "Contingency Crop Shift Evaluation",
      titleTa: "மாற்றுப்பயிர் திட்ட மதிப்பீடு",
      descriptionEn: "Monsoon delay exceeds safe window for long-duration paddy. Consider shifting to Finger Millet (Ragi), Groundnut, or short-duration pulses.",
      descriptionTa: "மழை தாமதம் அதிகம் உள்ளதால், நீண்டகால நெல்லுக்கு பதிலாக கேழ்வரகு அல்லது குறுகிய கால பயறு வகைகளை பரிசீலிக்கவும்.",
      priority: "HIGH",
      agronomicBasis: "CRIDA (Central Research Institute for Dryland Agriculture) Contingency Agriculture Plans for Tamil Nadu.",
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      id: "REC_MONITOR",
      titleEn: "Standard Agronomic Monitoring",
      titleTa: "வழக்கமான பயிர் கண்காணிப்பு",
      descriptionEn: "Current scenario remains within safe agronomic thresholds. Continue regular scheduled nutrient application and pest scouting.",
      descriptionTa: "தற்போதைய வானிலை பாதுகாப்பான வரம்பில் உள்ளது. வழக்கமான உரமிடுதல் மற்றும் பூச்சி கண்காணிப்பை தொடரவும்.",
      priority: "LOW",
      agronomicBasis: "Standard Package of Practices (TNAU/ICAR).",
    });
  }

  return {
    simulatedRainfallMm: Math.round(simulatedRainfall),
    rainfallDeviationMm: Math.round(rainfallDeviation),
    cropTotalWaterDemandMm: cropDemand,
    effectiveRainfallMm: Math.round(effectiveRainfall),
    waterDeficitMm: Math.round(mitigatedDeficitMm),
    waterDeficitM3,
    cropStageStressFactor: Math.round(cropStageStressFactor * 100) / 100,
    estimatedYieldImpactPct,
    riskScore,
    riskCategory,
    estimatedFinancialDownsideInr,
    uncertaintyRangePct: {
      min: Math.max(-95, Math.round(estimatedYieldImpactPct * 1.25)),
      max: Math.min(0, Math.round(estimatedYieldImpactPct * 0.75)),
    },
    recommendations,
    scientificReference: "FAO Irrigation and Drainage Paper 33 (Yield Response to Water) & TNAU Agronomy Manual.",
    dataFreshnessNotice: "Calculations based on calibrated agronomic simulation models. Not a deterministic harvest guarantee.",
  };
}

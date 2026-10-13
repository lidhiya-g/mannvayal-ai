import test from "node:test";
import assert from "node:assert/strict";

// We test the business logic directly
import { runClimateSimulation } from "../src/lib/calculations/climateSimulator.ts";
import { calculateCropRegret, CLIMATE_SCENARIOS } from "../src/lib/calculations/regretCalculator.ts";
import { calculateWaterBudget, convertAreaToAcres, convertMmOverAreaToM3 } from "../src/lib/calculations/waterBudget.ts";

test("Climate Simulator - Calculates rainfall deviation and stress under drought", () => {
  const result = runClimateSimulation({
    cropCode: "PADDY",
    farmAreaAcres: 2.5,
    soilType: "Clay Loam",
    sowingDate: "2026-07-15",
    currentStage: "Flowering / Panicle Initiation",
    baselineRainfallMm: 600,
    rainfallAnomalyPct: -40, // 40% deficit
    drySpellDurationDays: 14,
    temperatureAnomalyC: 2.0,
    availableWaterM3: 200,
    hasBorewellOrCanal: true,
  });

  assert.equal(result.simulatedRainfallMm, 360, "Simulated rainfall should be 360mm");
  assert.equal(result.rainfallDeviationMm, -240, "Deviation should be -240mm");
  assert.ok(result.riskScore > 50, "Risk score should be high under 40% deficit + flowering stage");
  assert.ok(result.waterDeficitMm > 0, "Water deficit should be positive");
  assert.ok(result.estimatedYieldImpactPct < -20, "Yield impact should reflect substantial drop");
  assert.ok(result.recommendations.length > 0, "Should generate agronomic recommendations");
});

test("Crop Decision Regret Calculator - Evaluates Minimax Regret across 5 scenarios", () => {
  const candidates = [
    {
      id: "C1",
      cropCode: "PADDY",
      cropName: "Paddy (Rice)",
      farmAreaAcres: 2.0,
      seedCostInr: 2500,
      fertilizerCostInr: 6000,
      labourCostInr: 14000,
      irrigationCostInr: 3000,
      otherInputCostsInr: 2500,
      expectedYieldKgPerAcre: 2400,
      expectedSellingPricePerKg: 23.5,
    },
    {
      id: "C2",
      cropCode: "RAGI",
      cropName: "Finger Millet (Ragi)",
      farmAreaAcres: 2.0,
      seedCostInr: 1200,
      fertilizerCostInr: 2500,
      labourCostInr: 6000,
      irrigationCostInr: 1000,
      otherInputCostsInr: 1500,
      expectedYieldKgPerAcre: 1100,
      expectedSellingPricePerKg: 42.9,
    },
  ];

  const analysis = calculateCropRegret(candidates);

  assert.equal(analysis.candidateSummary.length, 2);
  assert.ok(analysis.scenarioOutcomes.length === 2 * CLIMATE_SCENARIOS.length);
  assert.ok(analysis.minimaxCropId, "Should identify a minimax regret crop");
  assert.ok(analysis.keyInsightsEn.length >= 2, "Should provide English agronomic insights");
  assert.ok(analysis.keyInsightsTa.length >= 2, "Should provide Tamil agronomic insights");
});

test("Water Budget Wallet - Validates unit conversions and water balance equation", () => {
  // Test conversion
  const acresFromHectares = convertAreaToAcres(1, "HECTARES");
  assert.ok(Math.abs(acresFromHectares - 2.471) < 0.01, "1 Hectare should be approx 2.47 acres");

  const m3PerMm = convertMmOverAreaToM3(100, 1);
  assert.ok(Math.abs(m3PerMm - 404.686) < 1, "100mm over 1 acre should be ~404.7 m3");

  // Test budget calculation
  const budget = calculateWaterBudget({
    farmAreaValue: 2,
    areaUnit: "ACRES",
    cropCode: "PADDY",
    cropStage: "Flowering / Panicle Initiation",
    planningPeriodDays: 30,
    availableWaterVolumeM3: 1500,
    expectedRainfallMm: 50,
    irrigationMethod: "FLOOD",
    soilTexture: "CLAY_LOAM",
  });

  assert.equal(budget.farmAreaAcres, 2);
  assert.ok(budget.grossIrrigationDemandM3 > 0, "Gross irrigation demand should be calculated");
  assert.ok(budget.allocationAdviceEn.length > 0, "Should offer allocation advice");
  assert.ok(budget.allocationAdviceTa.length > 0, "Should offer Tamil allocation advice");
});

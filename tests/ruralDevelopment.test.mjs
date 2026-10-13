import test from "node:test";
import assert from "node:assert/strict";

import {
  getVillageProfile,
  computePriorityScore,
  OFFICIAL_BENCHMARKS,
  SAMPLE_VILLAGE_DATABASE,
  INITIAL_DEVELOPMENT_PRIORITIES,
} from "../src/lib/rural/villageDataService.ts";

test("Village Resource Assessment - Retrieves verified village profile with official indicators", () => {
  const punjabVillage = getVillageProfile("Punjab", "Ludhiana", "Seh");
  assert.equal(punjabVillage.state, "Punjab");
  assert.equal(punjabVillage.district, "Ludhiana");
  assert.ok(punjabVillage.indicators.length >= 8, "Should have at least 8 core public utility indicators");

  const waterInd = punjabVillage.indicators.find((i) => i.category === "WATER");
  assert.ok(waterInd, "Water indicator must exist");
  assert.equal(waterInd.benchmarkValue, 100);
  assert.equal(waterInd.unit, "% Households");
  assert.equal(waterInd.dataSource, "Mission Antyodaya Survey & State Jal Shakti Portal");

  const roadInd = punjabVillage.indicators.find((i) => i.category === "CONNECTIVITY");
  assert.ok(roadInd, "Road connectivity indicator must exist");
  assert.equal(roadInd.status, "ADEQUATE");
});

test("Rural Infrastructure Gap Assessment - Detects deficits against official Ministry standards", () => {
  const mhVillage = getVillageProfile("Maharashtra", "Nashik", "Pimpalgaon Baswant");
  const waterInd = mhVillage.indicators.find((i) => i.category === "WATER");

  assert.ok(waterInd);
  assert.equal(waterInd.status, "DEFICIT", "Should identify drinking water deficit (79% observed vs 100% benchmark)");
  assert.ok(waterInd.gapDescription.includes("21% shortfall"), "Should describe the gap clearly");
  assert.equal(waterInd.confidence, "OFFICIAL_GOVT");
});

test("Missing Data Governance - Accurately reports DATA_UNAVAILABLE instead of fabricating fake data", () => {
  // Test fallback village for unmapped region
  const genericVillage = getVillageProfile("Odisha", "Sambalpur", "Rengali");
  const digitalInd = genericVillage.indicators.find((i) => i.category === "DIGITAL");

  assert.ok(digitalInd);
  assert.equal(digitalInd.status, "DATA_UNAVAILABLE");
  assert.equal(digitalInd.observedValue, "Data unavailable");
  assert.equal(digitalInd.confidence, "COMMUNITY_REPORTED");
});

test("Village Development Priority Planner - Validates transparent multi-factor composite score calculation", () => {
  // Formula: (Urgency * 0.40) + (Community Impact * 0.40) + (Feasibility * 0.20)
  
  // Test Case 1: Max Priority (5, 5, 5) => 2.0 + 2.0 + 1.0 = 5.0
  const maxScore = computePriorityScore(5, 5, 5);
  assert.equal(maxScore, 5.0);

  // Test Case 2: Minimum Priority (1, 1, 1) => 0.4 + 0.4 + 0.2 = 1.0
  const minScore = computePriorityScore(1, 1, 1);
  assert.equal(minScore, 1.0);

  // Test Case 3: Mixed (Urgency: 5, Impact: 4, Feasibility: 3)
  // (5 * 0.4 = 2.0) + (4 * 0.4 = 1.6) + (3 * 0.2 = 0.6) = 4.2
  const mixedScore = computePriorityScore(5, 4, 3);
  assert.equal(mixedScore, 4.2);

  // Test Case 4: Initial priority items integrity
  for (const item of INITIAL_DEVELOPMENT_PRIORITIES) {
    const expected = computePriorityScore(item.urgency, item.communityImpact, item.feasibility);
    assert.equal(item.compositeScore, expected, `Priority item ${item.id} score must match formula`);
    assert.ok(item.compositeScore >= 1.0 && item.compositeScore <= 5.0);
  }
});

test("Rural Livelihood Insights - Evaluates seasonal lean periods and enterprise opportunities", () => {
  const tnVillage = getVillageProfile("Tamil Nadu", "Thanjavur", "Megalathur");
  const summary = tnVillage.livelihoodSummary;

  assert.ok(summary.agriDependencePct > 50, "Cauvery delta should reflect high agricultural dependence");
  assert.ok(summary.leanSeasonMonths.length >= 2, "Should identify agricultural lean months");
  assert.ok(summary.potentialEnterprises.length >= 3, "Should recommend local micro-enterprises");
  assert.ok(summary.localFPOsAndCooperatives.length >= 1, "Should identify local farmer producer organizations");
});

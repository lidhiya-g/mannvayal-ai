import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting MannVayal AI database seeding...");

  // 1. Password hashing
  const salt = await bcrypt.genSalt(10);
  const farmerPassword = await bcrypt.hash("MannVayal@2026", salt);
  const advisorPassword = await bcrypt.hash("Advisor@2026", salt);
  const communityPassword = await bcrypt.hash("Community@2026", salt);
  const adminPassword = await bcrypt.hash("Admin@2026", salt);

  // 2. Clear old data cleanly
  await prisma.rescueTask.deleteMany({});
  await prisma.cropCycle.deleteMany({});
  await prisma.waterBudget.deleteMany({});
  await prisma.climateScenario.deleteMany({});
  await prisma.weatherObservation.deleteMany({});
  await prisma.farmJournalEntry.deleteMany({});
  await prisma.farmOutcome.deleteMany({});
  await prisma.consentRecord.deleteMany({});
  await prisma.communityMembership.deleteMany({});
  await prisma.farm.deleteMany({});
  await prisma.cropStageCatalog.deleteMany({});
  await prisma.cropCatalog.deleteMany({});
  await prisma.auditEvent.deleteMany({});
  await prisma.supportRequest.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("🧹 Cleaned existing tables.");

  // 3. Seed Users
  const farmer = await prisma.user.create({
    data: {
      email: "farmer@mannvayal.ai",
      phone: "+91 98765 43210",
      fullName: "Murugan Selvam",
      passwordHash: farmerPassword,
      role: "FARMER",
      preferredLang: "ta",
      state: "Tamil Nadu",
      district: "Thanjavur",
      isVerified: true,
      consentRecords: {
        create: [
          { purpose: "COMMUNITY_SHARING", granted: true },
          { purpose: "RESEARCH_ANALYTICS", granted: true },
        ],
      },
      communityMember: {
        create: {
          district: "Thanjavur",
          blockOrTaluk: "Budalur",
          isConsented: true,
        },
      },
    },
  });

  const advisor = await prisma.user.create({
    data: {
      email: "advisor@mannvayal.ai",
      phone: "+91 94432 10987",
      fullName: "Dr. K. Jayaraman (TNAU Extension)",
      passwordHash: advisorPassword,
      role: "ADVISOR",
      preferredLang: "ta",
      state: "Tamil Nadu",
      district: "Thanjavur",
      isVerified: true,
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: "admin@mannvayal.ai",
      phone: "+91 99999 11111",
      fullName: "MannVayal Platform Operations",
      passwordHash: adminPassword,
      role: "PLATFORM_ADMIN",
      preferredLang: "en",
      state: "Tamil Nadu",
      district: "Chennai",
      isVerified: true,
    },
  });

  console.log("👤 Created users: Farmer, Advisor, Platform Admin");

  // 4. Seed Crop Catalog
  const paddy = await prisma.cropCatalog.create({
    data: {
      code: "PADDY",
      nameEnglish: "Paddy (Rice / நெல்)",
      nameTamil: "நெல் (பாரம்பரிய & உயர் விளைச்சல் ரகங்கள்)",
      category: "Cereals",
      durationDays: 135,
      waterRequirementMm: 1200,
      droughtTolerance: "LOW",
      heatTolerance: "MEDIUM",
      suitableSoils: "Clay Loam, Alluvial, Heavy Clay",
      descriptionEn: "Staple wetland crop of Tamil Nadu Cauvery Delta. Highly sensitive to water deficit during panicle initiation and flowering.",
      descriptionTa: "காவிரி டெல்டா மற்றும் தமிழகத்தின் பிரதான பயிர். கருக்கட்டும் மற்றும் பூக்கும் பருவங்களில் நீர் பற்றாக்குறைக்கு மிக உணர்திறன் உடையது.",
      baselineYieldKgPerAcre: 2400,
      baselineCostPerAcre: 28000,
      baselinePricePerKg: 23.5,
      cropStages: {
        create: [
          { stageOrder: 1, stageNameEn: "Land preparation", stageNameTa: "நிலம் தயாரித்தல்", startDay: 1, endDay: 12, waterNeedPct: 15, criticality: "MEDIUM", vulnerabilities: "Canal delay, leveling unevenness" },
          { stageOrder: 2, stageNameEn: "Nursery / Sowing", stageNameTa: "நாற்றங்கால் / விதைப்பு", startDay: 13, endDay: 30, waterNeedPct: 8, criticality: "HIGH", vulnerabilities: "Dry spell, seed rot" },
          { stageOrder: 3, stageNameEn: "Vegetative / Tillering", stageNameTa: "தூர்கட்டும் பருவம்", startDay: 31, endDay: 65, waterNeedPct: 22, criticality: "MEDIUM", vulnerabilities: "Stem borer, drought" },
          { stageOrder: 4, stageNameEn: "Panicle Initiation", stageNameTa: "கருக்கட்டும் பருவம்", startDay: 66, endDay: 85, waterNeedPct: 20, criticality: "CRITICAL", vulnerabilities: "Sterility from water stress" },
          { stageOrder: 5, stageNameEn: "Flowering & Anthesis", stageNameTa: "பூக்கும் பருவம்", startDay: 86, endDay: 100, waterNeedPct: 15, criticality: "CRITICAL", vulnerabilities: "Heat stress, pollen desiccation" },
          { stageOrder: 6, stageNameEn: "Grain Filling", stageNameTa: "பால் பிடிக்கும் பருவம்", startDay: 101, endDay: 118, waterNeedPct: 12, criticality: "HIGH", vulnerabilities: "BPH, lodging" },
          { stageOrder: 7, stageNameEn: "Maturity", stageNameTa: "முதிர்ச்சிப் பருவம்", startDay: 119, endDay: 128, waterNeedPct: 6, criticality: "LOW", vulnerabilities: "Premature dry out" },
          { stageOrder: 8, stageNameEn: "Harvest", stageNameTa: "அறுவடை", startDay: 129, endDay: 135, waterNeedPct: 2, criticality: "LOW", vulnerabilities: "Flash rains, high humidity" },
        ],
      },
    },
  });

  const ragi = await prisma.cropCatalog.create({
    data: {
      code: "RAGI",
      nameEnglish: "Finger Millet (Ragi / கேழ்வரகு)",
      nameTamil: "கேழ்வரகு (சிறுதானியம்)",
      category: "Millets",
      durationDays: 105,
      waterRequirementMm: 450,
      droughtTolerance: "VERY_HIGH",
      heatTolerance: "HIGH",
      suitableSoils: "Red Loam, Sandy Loam, Light Clay",
      descriptionEn: "Climate-resilient nutri-cereal requiring less than 40% of paddy's water demand. Ideal contingency crop during delayed monsoon.",
      descriptionTa: "நெல்லை விட 40% க்கும் குறைவான நீர் தேவைப்படும் ஊட்டச்சத்து மிகுந்த சிறுதானியம். பருவமழை தாமதமாகும் காலங்களில் சிறந்த மாற்றுப்பயிர்.",
      baselineYieldKgPerAcre: 1100,
      baselineCostPerAcre: 14000,
      baselinePricePerKg: 42.9,
    },
  });

  const groundnut = await prisma.cropCatalog.create({
    data: {
      code: "GROUNDNUT",
      nameEnglish: "Groundnut (வேர்க்கடலை)",
      nameTamil: "வேர்க்கடலை (நிலக்கடலை)",
      category: "Oilseeds",
      durationDays: 110,
      waterRequirementMm: 550,
      droughtTolerance: "HIGH",
      heatTolerance: "MEDIUM",
      suitableSoils: "Sandy Loam, Red Soil",
      descriptionEn: "Valuable oilseed and nitrogen-fixing legume. Sensitive during peg penetration and pod formation stages.",
      descriptionTa: "மண்ணிற்கு தழைச்சத்து சேர்க்கும் எண்ணெய் வித்துப்பயிர். விழுது இறங்கும் மற்றும் காய் பிடிக்கும் பருவங்களில் நீர் அவசியம்.",
      baselineYieldKgPerAcre: 1050,
      baselineCostPerAcre: 22000,
      baselinePricePerKg: 67.8,
    },
  });

  const cotton = await prisma.cropCatalog.create({
    data: {
      code: "COTTON",
      nameEnglish: "Cotton (பருத்தி)",
      nameTamil: "பருத்தி (வெள்ளை தங்கம்)",
      category: "Cash",
      durationDays: 155,
      waterRequirementMm: 700,
      droughtTolerance: "MEDIUM",
      heatTolerance: "HIGH",
      suitableSoils: "Black Cotton Soil, Deep Loam",
      descriptionEn: "Commercial fiber crop. Requires good drainage; square and boll formation stages are sensitive to moisture fluctuations.",
      descriptionTa: "வணிக நார் பயிர். கரிசல் மண்ணில் சிறந்தது; பூ மொட்டு மற்றும் காய் பிடிக்கும் பருவங்களில் ஈரப்பதம் சீராக இருக்க வேண்டும்.",
      baselineYieldKgPerAcre: 900,
      baselineCostPerAcre: 32000,
      baselinePricePerKg: 75.2,
    },
  });

  console.log("🌾 Seeded Crop Catalog: Paddy, Ragi, Groundnut, Cotton");

  // 5. Seed Farmer's Farm
  const farm1 = await prisma.farm.create({
    data: {
      userId: farmer.id,
      name: "செழிம்பு வயல் (Cauvery Delta Farm)",
      state: "Tamil Nadu",
      district: "Thanjavur",
      village: "Budalur",
      latitude: 10.787,
      longitude: 79.1378,
      totalArea: 3.5, // acres
      soilType: "Clay Loam",
      irrigationType: "Canal & Borewell",
      waterCapacityM3: 4500,
      cropCycles: {
        create: [
          {
            cropCode: "PADDY",
            season: "Samba 2026",
            sowingDate: new Date("2026-08-10"),
            expectedHarvest: new Date("2026-12-20"),
            currentStage: "Panicle Initiation",
            areaAllocated: 3.5,
            status: "ACTIVE",
            rescueTasks: {
              create: [
                {
                  stageName: "Panicle Initiation",
                  titleEn: "Maintain 2.5cm standing water buffer",
                  titleTa: "2.5 செ.மீ கட்டாய நீர் தேக்குதலை உறுதி செய்யவும்",
                  descriptionEn: "Monsoon dry spell detected. Ensure 2.5cm water depth in fields to avert pollen sterility.",
                  descriptionTa: "வறட்சி காரணமாக கதிர் வெளிவரும் பருவத்தில் மலட்டுத்தன்மை ஏற்படுவதை தடுக்க 2.5 செ.மீ நீர் தேக்குங்கள்.",
                  priority: "URGENT",
                  isCompleted: false,
                  triggeredBy: "DROUGHT_ALERT",
                },
                {
                  stageName: "Panicle Initiation",
                  titleEn: "Apply 1% Potassium Nitrate (KNO3) foliar spray",
                  titleTa: "1% பொட்டாசியம் நைட்ரேட் இலைவழி தெளிப்பு",
                  descriptionEn: "Spray early morning to reinforce grain filling vigor under elevated temperature conditions.",
                  descriptionTa: "அதிகாலை வேளையில் 1% பொட்டாசியம் நைட்ரேட் தெளித்து தானிய எடையை அதிகரிக்கவும்.",
                  priority: "HIGH",
                  isCompleted: true,
                  completedAt: new Date(),
                  triggeredBy: "SCHEDULE",
                },
              ],
            },
          },
        ],
      },
      weatherCache: {
        create: [
          {
            source: "OPEN_METEO_IMD_REFERENCE",
            temperatureC: 31.4,
            tempMaxC: 34.2,
            tempMinC: 25.1,
            humidityPct: 68.0,
            precipitationMm: 2.4,
            isSimulated: false,
            forecastDaysJson: JSON.stringify([
              { day: "Tue", tempMax: 34, tempMin: 25, rainMm: 2.4, condition: "Partly Cloudy" },
              { day: "Wed", tempMax: 35, tempMin: 26, rainMm: 0.0, condition: "Sunny" },
              { day: "Thu", tempMax: 35, tempMin: 25, rainMm: 4.1, condition: "Scattered Showers" },
              { day: "Fri", tempMax: 33, tempMin: 24, rainMm: 12.0, condition: "Monsoon Rain" },
              { day: "Sat", tempMax: 32, tempMin: 24, rainMm: 8.5, condition: "Light Rain" },
              { day: "Sun", tempMax: 33, tempMin: 25, rainMm: 1.0, condition: "Passing Clouds" },
              { day: "Mon", tempMax: 34, tempMin: 25, rainMm: 0.0, condition: "Clear" },
            ]),
          },
        ],
      },
      climateScenarios: {
        create: [
          {
            scenarioName: "Delayed Northeast Monsoon (-30% Rain)",
            cropCode: "PADDY",
            rainfallAnomalyPct: -30.0,
            tempAnomalyC: 1.5,
            drySpellDays: 12,
            delayedSowingDays: 14,
            riskScore: 68.0,
            estimatedWaterDeficitMm: 185.0,
            yieldImpactPct: -22.5,
            recommendationsJson: JSON.stringify([
              "Shift to Alternate Wetting and Drying (AWD)",
              "Foliar spray of 1% KCl for drought stress resilience",
              "Mulch boundary channels to prevent perimeter moisture loss",
            ]),
          },
        ],
      },
      waterBudgets: {
        create: [
          {
            periodName: "Samba Mid-Season 30-Day Budget",
            availableSupplyM3: 3800.0,
            effectiveRainfallM3: 1100.0,
            cropDemandM3: 4250.0,
            netBalanceM3: 650.0,
            deficitPercentage: 0.0,
            mitigationStrategy: "Maintain AWD pacing and monitor canal roster schedule.",
          },
        ],
      },
      journalEntries: {
        create: [
          {
            userId: farmer.id,
            title: "Sowing completed with CR-1009 Sub-1",
            content: "Direct sowing completed on 3.5 acres using certified seed with Pseudomonas treatment. Good germination observed.",
            category: "SOWING",
          },
          {
            userId: farmer.id,
            title: "Borewell recharge and test run",
            content: "Tested 5HP solar pump. Discharge rate 180 liters/minute. Sufficient for 4 hours daily scheduled pumping.",
            category: "IRRIGATION",
          },
        ],
      },
      outcomes: {
        create: [
          {
            userId: farmer.id,
            seasonYear: "Kuruvai 2025",
            cropCode: "PADDY",
            plannedYieldKg: 8400,
            actualYieldKg: 7950,
            plannedCostInr: 95000,
            actualCostInr: 91200,
            harvestPricePerKg: 22.8,
            actualRainfallDescription: "Kuruvai season had 15% deficit, but canal turn water arrived reliably.",
            keyLearnings: "Adopting AWD during vegetative stage saved 4 irrigation cycles without dropping test weight.",
            farmerFeedback: "Early warning helped schedule pumping before tail-end canal drying.",
          },
        ],
      },
    },
  });

  console.log(`🚜 Created sample farm: ${farm1.name} with crop cycles, weather cache, and scenarios.`);

  // 6. Audit Event
  await prisma.auditEvent.create({
    data: {
      userId: admin.id,
      eventType: "SYSTEM_INITIALIZED",
      severity: "INFO",
      description: "MannVayal AI database initialized with verified TNAU & ICAR crop-water baselines.",
    },
  });

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

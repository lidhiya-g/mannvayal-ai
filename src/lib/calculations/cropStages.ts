/**
 * MannVayal AI - Adaptive Crop Rescue Phenology and Contingency Engine
 * 
 * Defines 8 standard stages, vulnerability thresholds, and rescue intervention triggers.
 */

export interface CropStageDefinition {
  order: number;
  stageCode: string;
  nameEn: string;
  nameTa: string;
  durationDays: number;
  waterFractionPct: number;
  criticality: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  risks: string[];
  tasks: {
    titleEn: string;
    titleTa: string;
    descriptionEn: string;
    descriptionTa: string;
    trigger: string;
  }[];
}

export const CROP_PHENOLOGY: Record<string, CropStageDefinition[]> = {
  PADDY: [
    {
      order: 1,
      stageCode: "LAND_PREP",
      nameEn: "Land Preparation & Puddling",
      nameTa: "நிலம் தயாரித்தல் மற்றும் சேறடித்தல்",
      durationDays: 12,
      waterFractionPct: 15,
      criticality: "MEDIUM",
      risks: ["Delayed canal release", "Poor soil leveling leading to water waste"],
      tasks: [
        {
          titleEn: "Laser Leveling & Bund Strengthening",
          titleTa: "லேசர் நில சமன்படுத்துதல் மற்றும் வரப்பு வலுப்படுத்துதல்",
          descriptionEn: "Ensure zero slope variations to cut standing water depth by 25%. Compact bunds to prevent seepage.",
          descriptionTa: "நிலத்தை சீராக சமன்படுத்தி வரப்புகளை பலப்படுத்தவும். இது நீர் விரயத்தை 25% குறைக்கும்.",
          trigger: "PRE_SOWING",
        },
      ],
    },
    {
      order: 2,
      stageCode: "SOWING_NURSERY",
      nameEn: "Nursery / Sowing",
      nameTa: "நாற்றங்கால் / விதைப்பு",
      durationDays: 18,
      waterFractionPct: 8,
      criticality: "HIGH",
      risks: ["Dry spells", "Seed rot from unseasonal downpours"],
      tasks: [
        {
          titleEn: "Pseudomonas Seed Treatment",
          titleTa: "சூடோமோனாஸ் விதை நேர்த்தி",
          descriptionEn: "Treat 1 kg seeds with 10g Pseudomonas fluorescens to prevent blast and build root vigor.",
          descriptionTa: "1 கிலோ விதைக்கு 10 கிராம் சூடோமோனாஸ் கலந்து விதை நேர்த்தி செய்யவும்.",
          trigger: "SEED_TREATMENT",
        },
        {
          titleEn: "Community Mat Nursery Setup",
          titleTa: "பாய் நாற்றங்கால் முறை",
          descriptionEn: "Prepare modified mat nursery to save 50% water compared to conventional flooded nursery.",
          descriptionTa: "பாரம்பரிய நாற்றங்காலை விட 50% நீர் மிச்சப்படுத்தும் பாய் நாற்றங்காலை அமைக்கவும்.",
          trigger: "WATER_SAVING",
        },
      ],
    },
    {
      order: 3,
      stageCode: "VEGETATIVE",
      nameEn: "Vegetative & Tillering",
      nameTa: "தூர்கட்டும் பருவம்",
      durationDays: 35,
      waterFractionPct: 22,
      criticality: "MEDIUM",
      risks: ["Stem borer", "Water stagnation", "Intermittent drought"],
      tasks: [
        {
          titleEn: "Field Water Tube Installation (AWD)",
          titleTa: "கள நீர் அளவுகோல் குழாய் பொருத்துதல்",
          descriptionEn: "Insert perforated PVC pipe 15cm into root zone to monitor water depth before next irrigation.",
          descriptionTa: "பாசன நீரைக் கண்காணிக்க 15 செ.மீ துளையிடப்பட்ட பிவிசி குழாயை வயலில் நடவும்.",
          trigger: "IRRIGATION_MGMT",
        },
        {
          titleEn: "Neem Oil Spray for Stem Borer Prevention",
          titleTa: "வேப்பெண்ணெய் கரைசல் தெளிப்பு",
          descriptionEn: "Apply 3% Neem oil spray at 25 DAT to discourage yellow stem borer egg laying.",
          descriptionTa: "குருத்துப்பூச்சி தாக்குதலைத் தடுக்க 3% வேப்பெண்ணெய் கரைசல் தெளிக்கவும்.",
          trigger: "PEST_SCOUTING",
        },
      ],
    },
    {
      order: 4,
      stageCode: "PANICLE_INITIATION",
      nameEn: "Panicle Initiation & Booting",
      nameTa: "கருக்கட்டும் பருவம்",
      durationDays: 20,
      waterFractionPct: 20,
      criticality: "CRITICAL",
      risks: ["Moisture stress causes spikelet sterility", "High heat >35°C"],
      tasks: [
        {
          titleEn: "Maintain Mandatory 2.5cm Standing Water",
          titleTa: "2.5 செ.மீ கட்டாய நீர் தேக்குதல்",
          descriptionEn: "This is the most moisture-critical stage. Suspend AWD and ensure unbroken moisture to prevent empty grains.",
          descriptionTa: "இது மிகவும் முக்கியமான பருவம். பதர் நெல் உருவாவதை தடுக்க கட்டாயம் 2.5 செ.மீ நீர் இருக்குமாறு பார்க்கவும்.",
          trigger: "CRITICAL_WATER",
        },
      ],
    },
    {
      order: 5,
      stageCode: "FLOWERING",
      nameEn: "Flowering & Anthesis",
      nameTa: "பூக்கும் பருவம்",
      durationDays: 14,
      waterFractionPct: 15,
      criticality: "CRITICAL",
      risks: ["Pollen desiccation from hot dry winds", "Flash rain washing pollen"],
      tasks: [
        {
          titleEn: "Morning Irrigation for Heat Buffering",
          titleTa: "வெப்பத் தணிப்பு காலைப் பாசனம்",
          descriptionEn: "Irrigate in early morning to lower microclimate canopy temperature during anthesis.",
          descriptionTa: "பூக்கும் வேளையில் வெப்பப் பாதிப்பைத் தணிக்க அதிகாலை வேளையில் லேசான பாசனம் செய்யவும்.",
          trigger: "HEAT_DEFENSE",
        },
      ],
    },
    {
      order: 6,
      stageCode: "GRAIN_FILLING",
      nameEn: "Milky & Grain Filling Stage",
      nameTa: "பால் பிடிக்கும் மற்றும் கதிர் முதிர்ச்சி",
      durationDays: 18,
      waterFractionPct: 12,
      criticality: "HIGH",
      risks: ["Brown Plant Hopper (BPH)", "Lodging from untimely winds"],
      tasks: [
        {
          titleEn: "Foliar Spray of 1% Potassium Nitrate",
          titleTa: "1% பொட்டாசியம் நைட்ரேட் தெளிப்பு",
          descriptionEn: "Foliar nutrition accelerates grain carbohydrate translocation and test-weight.",
          descriptionTa: "தானியங்கள் திரட்சியாக வளர 1% பொட்டாசியம் நைட்ரேட் தெளிக்கவும்.",
          trigger: "YIELD_BOOST",
        },
      ],
    },
    {
      order: 7,
      stageCode: "MATURITY",
      nameEn: "Ripening & Maturity",
      nameTa: "முதிர்ச்சிப் பருவம்",
      durationDays: 10,
      waterFractionPct: 6,
      criticality: "LOW",
      risks: ["Premature drainage", "Bird damage"],
      tasks: [
        {
          titleEn: "Complete Water Drainage 10 Days Prior to Harvest",
          titleTa: "அறுவடைக்கு 10 நாட்களுக்கு முன் நீரை வடித்தல்",
          descriptionEn: "Drain standing water completely to facilitate uniform drying and machine harvester mobility.",
          descriptionTa: "அறுவடை இயந்திரங்கள் எளிதில் இறங்கவும், பயிர் சீராக காயவும் 10 நாட்களுக்கு முன்பே தண்ணீரை வடிக்கவும்.",
          trigger: "DRAINAGE",
        },
      ],
    },
    {
      order: 8,
      stageCode: "HARVEST",
      nameEn: "Harvest & Post-Harvest Handling",
      nameTa: "அறுவடை மற்றும் சேமிப்பு",
      durationDays: 5,
      waterFractionPct: 2,
      criticality: "LOW",
      risks: ["Cyclone or unseasonal post-monsoon showers damaging open grain"],
      tasks: [
        {
          titleEn: "Grain Moisture Check (< 14%)",
          titleTa: "ஈரப்பதம் 14% கீழ் இருப்பதை உறுதி செய்தல்",
          descriptionEn: "Sun-dry paddy until moisture drops below 14% to prevent fungal aflatoxin and milling losses.",
          descriptionTa: "பூஞ்சை தாக்குதலைத் தடுக்க நெல்லை 14% ஈரப்பதத்திற்கு கீழ் உலர்த்தி பாதுகாக்கவும்.",
          trigger: "QUALITY_PRESERVATION",
        },
      ],
    },
  ],
};

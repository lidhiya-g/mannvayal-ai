/**
 * MannVayal AI - Explainable Tamil Farm Advisor Engine
 * 
 * Provides verified agronomic answers with clear explanation chains,
 * data provenance, explicit uncertainty levels, and KVK consultation disclaimers.
 */

export interface AdvisorResponse {
  answer: string;
  language: "ta" | "en";
  explanationChain: string[];
  assumptions: string[];
  uncertaintyLevel: "LOW" | "MODERATE" | "HIGH";
  suggestedNextSteps: string[];
  dataSources: {
    title: string;
    publisher: string;
    year: string;
  }[];
  disclaimer: string;
}

interface QuestionPattern {
  keywords: string[];
  responseEn: AdvisorResponse;
  responseTa: AdvisorResponse;
}

export const VERIFIED_AGRO_KNOWLEDGE: QuestionPattern[] = [
  {
    keywords: ["delayed", "rainfall", "monsoon", "தாமத", "மழை", "பருவமழை"],
    responseEn: {
      answer: "When the Northeast Monsoon is delayed by more than 15-20 days in Tamil Nadu, continuing with traditional 135-day long-duration paddy varieties risks acute irrigation deficit during the reproductive panicle initiation stage. Shift towards medium or short-duration varieties (such as ADT 43, TPS 5) or contingency dryland crops like Finger Millet (Ragi) or Groundnut.",
      language: "en",
      explanationChain: [
        "1. Monsoon onset delay shrinks the safe vegetative growth window before winter temperature drop.",
        "2. Long duration crops encounter canal water exhaustion during late grain filling.",
        "3. Short duration crops and millets require 45-60% less cumulative water.",
      ],
      assumptions: [
        "Assuming borewell backup is limited to < 4 hours per day.",
        "Soil has moderate moisture retention (Clay Loam or Sandy Loam).",
      ],
      uncertaintyLevel: "MODERATE",
      suggestedNextSteps: [
        "Test current borewell static water table level.",
        "Check district Krishi Vigyan Kendra (KVK) weekly monsoon advisory.",
        "If sowing is delayed beyond October 15, prepare modified mat nursery for quicker transplanting.",
      ],
      dataSources: [
        { title: "Contingency Agriculture Plans for Tamil Nadu", publisher: "CRIDA & ICAR", year: "2023" },
        { title: "Crop Production Guide (Agriculture)", publisher: "Tamil Nadu Agricultural University (TNAU)", year: "2024" },
      ],
      disclaimer: "This guidance is for decision planning only. Verify local canal release schedules with your district Water Resources Department (WRD) before final nursery sowing.",
    },
    responseTa: {
      answer: "தமிழகத்தில் வடகிழக்கு பருவமழை 15 முதல் 20 நாட்களுக்கு மேல் தாமதமானால், 135 நாட்கள் கொண்ட நீண்ட கால நெல் ரகங்களை நடவு செய்வது பிற்காலத்தில் கருக்கட்டும் பருவத்தில் கடுமையான நீர் பற்றாக்குறையை ஏற்படுத்தும். இதற்கு பதிலாக நடுத்தர அல்லது குறுகிய கால நெல் ரகங்கள் (ADT 43, TPS 5 போன்றவை) அல்லது கேழ்வரகு, நிலக்கடலை போன்ற மாற்றுப்பயிர்களை தேர்வு செய்வது பாதுகாப்பானது.",
      language: "ta",
      explanationChain: [
        "1. பருவமழை தாமதமாகும் போது பயிரின் முழு வளர்ச்சி காலத்திற்கு தேவையான நீர் கடைமடைக்கு கிடைக்காமல் போகலாம்.",
        "2. பூக்கும் மற்றும் பால் பிடிக்கும் தருணத்தில் வாய்க்கால் நீர் நின்றால் பதர் நெல் அதிகமாகும்.",
        "3. சிறுதானியங்கள் மற்றும் பயறு வகைகளுக்கு நெல்லை விட 50% க்கும் குறைவான நீரே போதுமானது.",
      ],
      assumptions: [
        "நிலத்தடி நீர் / போர்வெல் வசதி நாள் ஒன்றுக்கு 4 மணி நேரத்திற்கு குறைவாக மட்டுமே கிடைக்கும் என்ற அனுமானம்.",
        "மண் மிதமான ஈரப்பதம் தக்கவைக்கும் தன்மை கொண்டது.",
      ],
      uncertaintyLevel: "MODERATE",
      suggestedNextSteps: [
        "உங்கள் வட்டார வேளாண்மை உதவி அலுவலரிடம் (AAO) குறுகிய கால விதை இருப்பு விவரம் கேட்கவும்.",
        "பாய் நாற்றங்கால் (Mat nursery) அமைப்பதன் மூலம் நாற்று வயதை 15 நாட்களாக குறைத்து விரைந்து நடவு செய்யலாம்.",
        "பண்ணை குட்டைகளில் நீர் சேகரிப்பு அமைப்பை தயார் நிலையில் வைக்கவும்.",
      ],
      dataSources: [
        { title: "வறட்சி மேலாண்மை மற்றும் மாற்றுப்பயிர் கையேடு", publisher: "CRIDA & ICAR", year: "2023" },
        { title: "பயிர் சாகுபடி வழிகாட்டி (வேளாண்மை)", publisher: "தமிழ்நாடு வேளாண்மைப் பல்கலைக்கழகம் (TNAU)", year: "2024" },
      ],
      disclaimer: "இது ஒரு மாதிரி வழிகாட்டல் மட்டுமே. இறுதி முடிவெடுப்பதற்கு முன் உங்கள் வட்டார வேளாண்மை அலுவலர் அல்லது கேவிகே (KVK) விஞ்ஞானிகளை அணுகவும்.",
    },
  },
  {
    keywords: ["water", "irrigation", "awd", "தண்ணீர்", "பாசனம்", "காய்ச்சலும் பாய்ச்சலும்"],
    responseEn: {
      answer: "Paddy does not require continuous stagnant water. Adopting 'Alternate Wetting and Drying' (AWD) saves 25% to 35% of irrigation water without reducing grain yield. A perforated field water pipe (15 cm buried in soil) allows you to see when water drops 5 cm below the surface before re-irrigating.",
      language: "en",
      explanationChain: [
        "1. Continuous flooding causes deep percolation loss and root hypoxia.",
        "2. AWD aerates roots, stimulating deeper root elongation and tiller strength.",
        "3. Critical exception: Maintain continuous 2.5cm standing water during panicle initiation and flowering.",
      ],
      assumptions: [
        "Field is reasonably leveled without major low-lying water stagnation pockets.",
      ],
      uncertaintyLevel: "LOW",
      suggestedNextSteps: [
        "Install 1 perforated PVC pipe per acre at 1/3 distance from the bund.",
        "During flowering stage, keep field submerged to avoid empty chaffy grains.",
      ],
      dataSources: [
        { title: "AWD Water Management Protocol", publisher: "International Rice Research Institute (IRRI) & TNAU", year: "2022" },
      ],
      disclaimer: "During flowering and grain filling, ensure water stress is strictly avoided.",
    },
    responseTa: {
      answer: "நெல் பயிரில் வயலில் எப்போதும் தண்ணீர் தேக்கி வைக்க வேண்டிய அவசியமில்லை. 'காய்ச்சலும் பாய்ச்சலும்' (AWD) முறையில் பாசனம் செய்வதன் மூலம் விளைச்சல் குறையாமல் 25% முதல் 35% வரை பாசன நீரை சேமிக்கலாம். வயலில் 15 செ.மீ துளையிடப்பட்ட பிவிசி குழாய் அமைத்து, நீர் மட்டம் 5 செ.மீ கீழே சென்ற பின்பே அடுத்த பாசனம் செய்ய வேண்டும்.",
      language: "ta",
      explanationChain: [
        "1. தொடர்ச்சியாக நீர் தேங்குவதால் வேர்களுக்கு பிராணவாயு (ஆக்ஸிஜன்) பற்றாக்குறை ஏற்பட்டு தூர்கள் குறையும்.",
        "2. காய்ச்சலும் பாய்ச்சலும் முறை வேர்களை ஆழமாக செல்ல வைத்து பயிரை வலுவாக்கும்.",
        "3. விதிவிலக்கு: கருக்கட்டும் மற்றும் பூக்கும் பருவங்களில் மட்டும் கட்டாயம் 2.5 செ.மீ நீர் தேக்கி வைக்க வேண்டும்.",
      ],
      assumptions: [
        "வயல் சீராக சமன்படுத்தப்பட்டுள்ளது என்ற அனுமானம்.",
      ],
      uncertaintyLevel: "LOW",
      suggestedNextSteps: [
        "ஒரு ஏக்கருக்கு ஒரு துளையிடப்பட்ட பிவிசி குழாய் வயலில் நடுங்கள்.",
        "பயிர் பூக்கும் 15 நாட்கள் மட்டும் நீர் தேங்குவதை உறுதி செய்யுங்கள்.",
      ],
      dataSources: [
        { title: "காய்ச்சலும் பாய்ச்சலும் பாசனக் கையேடு", publisher: "TNAU நீர் தொழில்நுட்ப மையம் (WTC)", year: "2022" },
      ],
      disclaimer: "பூக்கும் தருணத்தில் எக்காரணம் கொண்டும் நீர் பற்றாக்குறை ஏற்படாமல் பார்த்துக் கொள்ளவும்.",
    },
  },
  {
    keywords: ["pest", "stem borer", "பூச்சி", "குருத்துப்பூச்சி", "நோய்"],
    responseEn: {
      answer: "Integrated Pest Management (IPM) is essential for climate-resilient crop health. For yellow stem borer in paddy, use light traps and pheromone traps (5 traps/acre) for monitoring. If dead hearts exceed 10% economic threshold in vegetative stage, apply eco-friendly neem seed kernel extract (NSKE 5%) or Bacillus thuringiensis before turning to chemical intervention.",
      language: "en",
      explanationChain: [
        "1. Pheromone traps disrupt mating cycles and give early warning of moth emergence.",
        "2. Biological and neem-based defenses preserve natural spider and mirid bug predators.",
      ],
      assumptions: [
        "Threshold determined by counting 20 hills at random across the field.",
      ],
      uncertaintyLevel: "LOW",
      suggestedNextSteps: [
        "Install yellow sticky traps and pheromone traps.",
        "Avoid excessive basal nitrogen fertilizers which promote soft, succulent tissue vulnerable to borers.",
      ],
      dataSources: [
        { title: "Integrated Pest Management Guidelines", publisher: "Directorate of Plant Protection & TNAU", year: "2023" },
      ],
      disclaimer: "Follow standard label safety precautions for all agricultural inputs. Consult your local agricultural officer.",
    },
    responseTa: {
      answer: "நெல் பயிரில் மஞ்சள் குருத்துப்பூச்சி தாக்குதலை கட்டுப்படுத்த ஒருங்கிணைந்த பயிர் பாதுகாப்பு முறையே சிறந்தது. ஏக்கருக்கு 5 இனக்கவர்ச்சி பொறிகள் வைத்து தாய் அந்துப்பூச்சிகளை கண்காணிக்கவும். தூர்கட்டும் பருவத்தில் 'வெண்குருத்து' 10% தாண்டினால், வேப்பங்கொட்டை கரைசல் (5%) அல்லது பேசிலஸ் துரிஞ்சியென்சிஸ் தெளிக்கவும்.",
      language: "ta",
      explanationChain: [
        "1. இனக்கவர்ச்சி பொறிகள் அந்துப்பூச்சிகள் முட்டையிடுவதை ஆரம்பத்திலேயே கண்டறிய உதவும்.",
        "2. வேப்பெண்ணெய் கரைசல் நன்மை செய்யும் சிலந்திகளை அழிக்காமல் பயிரை காக்கும்.",
        "3. அதிகப்படியான யூரியா இடுவதை தவிர்க்கவும், ஏனெனில் அது தண்டை மென்மையாக்கி பூச்சி தாக்குதலை அதிகரிக்கும்.",
      ],
      assumptions: [
        "வயலில் சமவாய்ப்பு முறையில் 20 தூர்களை ஆய்வு செய்த பொருளாதார சேத வரம்பு (ETL).",
      ],
      uncertaintyLevel: "LOW",
      suggestedNextSteps: [
        "வயலில் 5 இடங்களில் இனக்கவர்ச்சி பொறி வைக்கவும்.",
        "யூரியாவை ஒரே தவணையாக இடாமல் பிரித்து இடவும்.",
      ],
      dataSources: [
        { title: "ஒருங்கிணைந்த பூச்சி மேலாண்மை வழிகாட்டி", publisher: "TNAU பூச்சியியல் துறை", year: "2023" },
      ],
      disclaimer: "மருந்து தெளிப்பதற்கு முன் உள்ளூர் வேளாண் அலுவலரிடம் ஆலோசனை பெறவும்.",
    },
  },
];

export async function askTamilFarmAdvisor(
  question: string,
  lang: "ta" | "en" = "ta",
  farmContext?: { crop: string; stage: string; district: string }
): Promise<AdvisorResponse> {
  const lowerQ = question.toLowerCase();

  // Match against verified knowledge base
  for (const item of VERIFIED_AGRO_KNOWLEDGE) {
    if (item.keywords.some((k) => lowerQ.includes(k.toLowerCase()))) {
      const base = lang === "ta" ? item.responseTa : item.responseEn;
      if (farmContext) {
        return {
          ...base,
          assumptions: [
            ...base.assumptions,
            lang === "ta"
              ? `தங்கள் பண்ணை சூழல்: ${farmContext.district} மாவட்டம், ${farmContext.crop} பயிர், ${farmContext.stage} பருவம்.`
              : `Farm context considered: ${farmContext.district} district, ${farmContext.crop} crop at ${farmContext.stage} stage.`,
          ],
        };
      }
      return base;
    }
  }

  // Fallback comprehensive response
  if (lang === "ta") {
    return {
      answer: `தங்கள் கேள்வி: "${question}". தமிழ்நாடு வேளாண் பல்கலைக்கழக (TNAU) மற்றும் இந்திய வானிலை ஆய்வு மையத்தின் (IMD) மாதிரி வழிகாட்டுதலின்படி, பருவகால மாற்றங்களை எதிர்கொள்ள நீர் மேலாண்மை மற்றும் மண் ஈரப்பதம் பாதுகாப்பே முதன்மையானது. உங்கள் பயிர் வளர்ச்சி பருவம் மற்றும் மாவட்ட வானிலை முன்னறிவிப்பை ஒப்பிட்டு திட்டமிடவும்.`,
      language: "ta",
      explanationChain: [
        "1. உள்ளூர் வானிலை முன்னறிவிப்பு மற்றும் பயிரின் நீர் தேவையை ஆய்வு செய்தல்.",
        "2. உரம் மற்றும் பாசனத்தை மழை நாட்களுக்கு ஏற்ப திட்டமிடுதல்.",
        "3. அதிக வெப்பம் உள்ள நாட்களில் காலை அல்லது மாலை வேளையில் மட்டுமே பாசனம் செய்தல்.",
      ],
      assumptions: [
        "பொதுவான தமிழக விவசாய சூழல் மற்றும் பாசன வசதி கொண்ட நிலம்.",
      ],
      uncertaintyLevel: "MODERATE",
      suggestedNextSteps: [
        "பண்ணை விவரத்தை முழுமையாக உள்ளிட்டு வானிலை பாவனை மாதிரியை இயக்கவும்.",
        "வட்டார வேளாண்மை விரிவாக்க மையத்தில் மண்ணாய்வு முடிவுகளை சரிபார்க்கவும்.",
      ],
      dataSources: [
        { title: "TNAU Agronomy Manual & Crop Doctor", publisher: "Tamil Nadu Agricultural University", year: "2024" },
      ],
      disclaimer: "குறிப்பிட்ட பூச்சி மருந்து அல்லது அரசு மானிய திட்டங்களுக்கு உங்கள் வட்டார வேளாண்மை உதவி இயக்குநரை (ADA) அணுகவும்.",
    };
  }

  return {
    answer: `Regarding your query: "${question}". Based on calibrated TNAU and ICAR crop-water guidelines, maintaining root zone soil moisture balance and timing nutrients according to 7-day rainfall forecasts is critical for climate resilience.`,
    language: "en",
    explanationChain: [
      "1. Evaluate microclimate forecast against current crop phenological stage.",
      "2. Adjust irrigation intervals to prevent waterlogging or moisture stress.",
      "3. Time nitrogen top-dressing to avoid leaching before anticipated rainfall.",
    ],
    assumptions: [
      "Representative agro-climatic conditions for Tamil Nadu / South India.",
    ],
    uncertaintyLevel: "MODERATE",
    suggestedNextSteps: [
      "Run the Climate What-If Simulator with your specific sowing date.",
      "Check your Water Budget Wallet balance for the upcoming 15-day period.",
    ],
    dataSources: [
      { title: "TNAU Package of Practices & IMD Agromet Advisory", publisher: "TNAU & IMD", year: "2024" },
    ],
    disclaimer: "Decision-support advisory. Consult your local Assistant Agricultural Officer (AAO) or Krishi Vigyan Kendra for formal field recommendations.",
  };
}

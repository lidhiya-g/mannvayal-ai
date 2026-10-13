import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, LanguageOption } from "./languages";

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  taglineTamil: string;
  nav: {
    home: string;
    about: string;
    features: string;
    howItWorks: string;
    methodology: string;
    dashboard: string;
    simulator: string;
    regretCalculator: string;
    waterBudget: string;
    timeline: string;
    community: string;
    advisor: string;
    memory: string;
    admin: string;
    signIn: string;
    register: string;
    signOut: string;
    farmProfile: string;
    reports: string;
    alerts: string;
    confidence: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    exploreFarm: string;
    seeHowItWorks: string;
    liveIndicator: string;
    demoIndicator: string;
    badgeText: string;
  };
  dashboard: {
    greeting: string;
    farmSelector: string;
    currentCrop: string;
    stage: string;
    weatherTitle: string;
    rainfallTrend: string;
    tempTrend: string;
    waterSummary: string;
    riskScore: string;
    activeAlerts: string;
    pendingTasks: string;
    quickTools: string;
    confidenceLevel: string;
    lastUpdated: string;
  };
  simulator: {
    title: string;
    subtitle: string;
    rainfallAnomaly: string;
    drySpell: string;
    tempAnomaly: string;
    runSimulation: string;
    riskSummary: string;
    yieldImpact: string;
    waterDeficit: string;
    financialDownside: string;
    recommendations: string;
    disclaimer: string;
  };
  regret: {
    title: string;
    subtitle: string;
    candidateCrops: string;
    addCrop: string;
    calculate: string;
    minimaxRecommendation: string;
    downsideRisk: string;
    costBreakdown: string;
    decisionNote: string;
  };
  water: {
    title: string;
    subtitle: string;
    availableWater: string;
    cropDemand: string;
    netBalance: string;
    reservoirStorage: string;
    daysRemaining: string;
    dripSaving: string;
    awdGuidance: string;
  };
  advisor: {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    send: string;
    suggestedQuestions: string;
    disclaimer: string;
    kvkNotice: string;
  };
  timeline: {
    title: string;
    subtitle: string;
    currentStage: string;
    advanceStage: string;
    contingencyTasks: string;
    markCompleted: string;
  };
  common: {
    acres: string;
    hectares: string;
    cents: string;
    rupee: string;
    save: string;
    cancel: string;
    loading: string;
    error: string;
    success: string;
    low: string;
    moderate: string;
    high: string;
    critical: string;
    themeLight: string;
    themeDark: string;
    themeSystem: string;
  };
}

// English Dictionary
export const enDict: TranslationDictionary = {
  appName: "MannVayal AI",
  tagline: "Predict Climate. Protect Crops. Empower Farmers.",
  taglineTamil: "காலநிலையை கணித்து, பயிர்களை காத்து, விவசாயத்தை வளப்படுத்துவோம்.",
  nav: {
    home: "Home",
    about: "About",
    features: "Features",
    howItWorks: "How It Works",
    methodology: "Methodology",
    dashboard: "Dashboard",
    simulator: "What-If Simulator",
    regretCalculator: "Regret Calculator",
    waterBudget: "Water Wallet",
    timeline: "Rescue Timeline",
    community: "Community Sync",
    advisor: "Tamil Farm Advisor",
    memory: "Farm Memory",
    admin: "Admin Center",
    signIn: "Sign In",
    register: "Get Started",
    signOut: "Sign Out",
    farmProfile: "Farm Profile",
    reports: "Reports",
    alerts: "Weather Alerts",
    confidence: "Data Confidence",
  },
  hero: {
    headline: "Turn Climate Uncertainty Into Smarter Farming Decisions.",
    subheadline: "Predict climate risks, simulate rainfall shocks, minimize decision regret, and manage crop water budgets with India's dedicated agro-climatic intelligence platform.",
    exploreFarm: "Explore Your Farm",
    seeHowItWorks: "See How It Works",
    liveIndicator: "Live IMD / Open-Meteo Feed",
    demoIndicator: "Simulated Calibration Mode",
    badgeText: "Tamil Nadu & Cauvery Delta Decision Engine",
  },
  dashboard: {
    greeting: "Vanakkam, Farmer",
    farmSelector: "Active Farm",
    currentCrop: "Current Crop",
    stage: "Crop Stage",
    weatherTitle: "Microclimate & 7-Day Forecast",
    rainfallTrend: "Rainfall History & Forecast",
    tempTrend: "Temperature Deviation",
    waterSummary: "Water Budget Balance",
    riskScore: "Climate Risk Index",
    activeAlerts: "Active Contingency Alerts",
    pendingTasks: "Pending Agronomic Tasks",
    quickTools: "Decision Engines",
    confidenceLevel: "Data Confidence",
    lastUpdated: "Last Synced",
  },
  simulator: {
    title: "Climate What-If Simulator",
    subtitle: "Simulate rainfall deficits, dry spells, and heat shocks to model yield risks before they happen.",
    rainfallAnomaly: "Rainfall Anomaly (% deviation from baseline)",
    drySpell: "Consecutive Dry-Spell Duration (Days)",
    tempAnomaly: "Temperature Anomaly (°C rise)",
    runSimulation: "Run Scenario Simulation",
    riskSummary: "Scenario Risk Evaluation",
    yieldImpact: "Estimated Yield Impact",
    waterDeficit: "Projected Water Shortfall",
    financialDownside: "Estimated Financial Downside",
    recommendations: "Recommended Contingency Actions",
    disclaimer: "Calibrated simulation model based on FAO-33 / TNAU benchmarks. Not a deterministic yield guarantee.",
  },
  regret: {
    title: "Crop Decision Regret Calculator",
    subtitle: "Compare alternative crops across 5 climate states to find the crop that minimizes worst-case regret.",
    candidateCrops: "Evaluated Candidate Crops",
    addCrop: "Add Crop Option",
    calculate: "Calculate Decision Regrets",
    minimaxRecommendation: "Minimax Regret Choice (Safest Downside)",
    downsideRisk: "Downside Capital Risk",
    costBreakdown: "Input Cultivation Expenses",
    decisionNote: "Savage's Minimax Criterion shields your capital under erratic monsoons by minimizing the pain of making the wrong choice.",
  },
  water: {
    title: "Water Budget Wallet",
    subtitle: "Track crop evapotranspiration, available borewell/canal water, and stage-by-stage deficits.",
    availableWater: "Available Water Supply",
    cropDemand: "Net Crop Demand (ETc)",
    netBalance: "Net Water Balance",
    reservoirStorage: "Reservoir Storage Level",
    daysRemaining: "Days of Water Remaining",
    dripSaving: "Potential Water Saved with Micro-Irrigation",
    awdGuidance: "Alternate Wetting & Drying Guidance",
  },
  advisor: {
    title: "Explainable Tamil Farm Advisor",
    subtitle: "Conversational agronomical intelligence providing transparent, source-attributed farming guidance.",
    inputPlaceholder: "Ask about climate risks, water management, or crop stages (Tamil or English)...",
    send: "Send Question",
    suggestedQuestions: "Common Questions",
    disclaimer: "AI agricultural guidance is decision-support only. Always consult your local Krishi Vigyan Kendra (KVK) or Assistant Agricultural Officer for critical crop decisions.",
    kvkNotice: "Source verified with TNAU Crop Production Guide & ICAR advisory archives.",
  },
  timeline: {
    title: "Adaptive Crop Rescue Timeline",
    subtitle: "Dynamic 8-stage phenological timeline with climate triggers and action tasks.",
    currentStage: "Active Crop Growth Stage",
    advanceStage: "Update to Next Stage",
    contingencyTasks: "Stage-Specific Contingency Tasks",
    markCompleted: "Mark as Completed",
  },
  common: {
    acres: "Acres",
    hectares: "Hectares",
    cents: "Cents",
    rupee: "₹",
    save: "Save",
    cancel: "Cancel",
    loading: "Loading...",
    error: "An error occurred",
    success: "Saved successfully",
    low: "Low Risk",
    moderate: "Moderate Risk",
    high: "High Risk",
    critical: "Critical Risk",
    themeLight: "Light Mode",
    themeDark: "Dark Mode",
    themeSystem: "System Default",
  },
};

// Tamil Dictionary (Primary Native Priority)
export const taDict: TranslationDictionary = {
  appName: "மண்வயல் AI (MannVayal)",
  tagline: "காலநிலையை கணித்து, பயிர்களை காத்து, விவசாயத்தை வளப்படுத்துவோம்.",
  taglineTamil: "காலநிலையை கணித்து, பயிர்களை காத்து, விவசாயத்தை வளப்படுத்துவோம்.",
  nav: {
    home: "முகப்பு",
    about: "எங்களை பற்றி",
    features: "செயல்பாடுகள்",
    howItWorks: "செயல்முறை",
    methodology: "தரவு முறைமை",
    dashboard: "விவசாயி பலகை",
    simulator: "வானிலை பாவனை மாதிரி",
    regretCalculator: "பயிர் வருத்தக் கணிப்பான்",
    waterBudget: "நீர் வரவு-செலவு பை",
    timeline: "பயிர் பாதுகாப்பு காலவரிசை",
    community: "சமூக ஒருங்கிணைப்பு",
    advisor: "தமிழ் விவசாய ஆலோசகர்",
    memory: "பண்ணை நினைவகம்",
    admin: "நிர்வாக மையம்",
    signIn: "உள்நுழைக",
    register: "தொடங்குக",
    signOut: "வெளியேறுக",
    farmProfile: "பண்ணை விவரம்",
    reports: "அறிக்கைகள்",
    alerts: "வானிலை எச்சரிக்கைகள்",
    confidence: "தரவு நம்பகத்தன்மை",
  },
  hero: {
    headline: "காலநிலை நிச்சயமற்ற தன்மையை தெளிவான விவசாய முடிவுகளாக மாற்றுங்கள்.",
    subheadline: "மழைப்பொழிவு அபாயங்களை முன்கூட்டியே கணிக்கவும், மாற்றுப்பயிர்களை ஒப்பிடவும், நீர் பற்றாக்குறையை நிர்வகிக்கவும் உதவும் இந்தியாவின் சிறப்பு காலநிலை-வேளாண் வழிகாட்டி.",
    exploreFarm: "உங்கள் பண்ணையை ஆராயுங்கள்",
    seeHowItWorks: "எப்படி செயல்படுகிறது?",
    liveIndicator: "நேரடி IMD / வானிலை இணைப்பு",
    demoIndicator: "பாவனை மாதிரி முறை",
    badgeText: "தமிழ்நாடு மற்றும் காவிரி டெல்டா முடிவு இயந்திரம்",
  },
  dashboard: {
    greeting: "வணக்கம், விவசாயி",
    farmSelector: "செயலில் உள்ள பண்ணை",
    currentCrop: "தற்போதைய பயிர்",
    stage: "பயிர் பருவம்",
    weatherTitle: "நுண் வானிலை & 7 நாள் முன்னறிவிப்பு",
    rainfallTrend: "மழைப்பொழிவு போக்கு",
    tempTrend: "வெப்பநிலை மாற்றம்",
    waterSummary: "நீர் இருப்பு சமநிலை",
    riskScore: "காலநிலை இடர் குறியீடு",
    activeAlerts: "செயலில் உள்ள அவசர எச்சரிக்கைகள்",
    pendingTasks: "நிலுவையில் உள்ள பணிகள்",
    quickTools: "முடிவெடுக்கும் கருவிகள்",
    confidenceLevel: "தரவு நம்பிக்கை",
    lastUpdated: "கடைசி புதுப்பிப்பு",
  },
  simulator: {
    title: "வானிலை பாவனை மாதிரி (What-If Simulator)",
    subtitle: "மழைப்பொழிவு பற்றாக்குறை, வறட்சி நாட்கள் மற்றும் வெப்ப உயர்வை முன்கூட்டியே சோதித்து பயிர் இழப்பைத் தடுத்திடுங்கள்.",
    rainfallAnomaly: "மழைப்பொழிவு மாறுபாடு (% குறைவு / கூடுதல்)",
    drySpell: "தொடர் மழை இல்லா நாட்கள் (Dry-Spell)",
    tempAnomaly: "வெப்பநிலை உயர்வு (°C)",
    runSimulation: "மாதிரியை இயக்குக",
    riskSummary: "அபாய மதிப்பீடு",
    yieldImpact: "எதிர்பார்க்கப்படும் விளைச்சல் தாக்கம்",
    waterDeficit: "நீர் பற்றாக்குறை அளவு",
    financialDownside: "மதிப்பிடப்பட்ட நிதி இழப்பு",
    recommendations: "பரிந்துரைக்கப்படும் உடனடி நடவடிக்கைகள்",
    disclaimer: "FAO-33 மற்றும் தமிழ்நாடு வேளாண் பல்கலைக்கழக வழிகாட்டுதல் அடிப்படையிலான மதிப்பீடு. விளைச்சல் உத்தரவாதம் அல்ல.",
  },
  regret: {
    title: "பயிர் தேர்வு வருத்தக் கணிப்பான் (Regret Calculator)",
    subtitle: "5 வகையான காலநிலை சூழல்களில் பல்வேறு பயிர்களை ஒப்பிட்டு, எச்சூழலிலும் குறைந்த வருத்தத்தைத் தரும் பயிரை கண்டறியுங்கள்.",
    candidateCrops: "ஒப்பிடப்படும் பயிர்கள்",
    addCrop: "புதிய பயிர் சேர்க்க",
    calculate: "வருத்தத்தை கணக்கிடுக",
    minimaxRecommendation: "குறைந்த வருத்த தேர்வு (Minimax Choice)",
    downsideRisk: "இழப்பு நிதி அபாயம்",
    costBreakdown: "சாகுபடி செலவு விவரம்",
    decisionNote: "அதிக லாபத்தை மட்டுமே பார்க்காமல், வறட்சி வந்தாலும் முதலீட்டை காப்பாற்றும் பாதுகாப்பான பயிரை தேர்வு செய்ய இது உதவுகிறது.",
  },
  water: {
    title: "நீர் வரவு-செலவு பை (Water Budget Wallet)",
    subtitle: "பயிரின் நீர் தேவை, கிணறு/வாய்க்கால் நீர் இருப்பு மற்றும் பருவ வாரியான உபரி/பற்றாக்குறையை துல்லியமாக திட்டமிடுங்கள்.",
    availableWater: "கிடைக்கும் நீர் இருப்பு",
    cropDemand: "பயிரின் நிகர நீர் தேவை (ETc)",
    netBalance: "நிகர நீர் இருப்பு",
    reservoirStorage: "குளம் / தொட்டி நீர் அளவு",
    daysRemaining: "நீர் போதுமான நாட்கள்",
    dripSaving: "சொட்டு நீர் பாசனத்தில் சேமிக்கப்படும் நீர்",
    awdGuidance: "காய்ச்சலும் பாய்ச்சலும் பாசன வழிகாட்டல்",
  },
  advisor: {
    title: "விளக்கமளிக்கும் தமிழ் விவசாய ஆலோசகர்",
    subtitle: "காரணங்கள், ஆதாரங்கள் மற்றும் நிபந்தனைகளுடன் பதிலளிக்கும் செயற்கை நுண்ணறிவு வேளாண் வழிகாட்டி.",
    inputPlaceholder: "வானிலை அபாயம், பாசனம், உரம் அல்லது பயிர் பாதுகாப்பு பற்றி கேளுங்கள்...",
    send: "கேள்வி கேட்க",
    suggestedQuestions: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    disclaimer: "இது முடிவெடுப்பதற்கான வழிகாட்டல் மட்டுமே. முக்கியமான பயிர் முடிவுகளுக்கு உங்கள் பகுதி வேளாண்மை அலுவலர் அல்லது கேவிகே (KVK) மையத்தை அணுகவும்.",
    kvkNotice: "தமிழ்நாடு வேளாண் பல்கலைக்கழக பயிர் உற்பத்தி கையேடு தரவுகளுடன் சரிபார்க்கப்பட்டது.",
  },
  timeline: {
    title: "பயிர் பாதுகாப்பு காலவரிசை (Crop Rescue Timeline)",
    subtitle: "8 வளர்ச்சிப் பருவங்கள், காலநிலை எச்சரிக்கைகள் மற்றும் மீட்புப் பணிகள் கொண்ட இயங்கு காலவரிசை.",
    currentStage: "தற்போதைய பயிர் பருவம்",
    advanceStage: "அடுத்த பருவத்திற்கு மாற்று",
    contingencyTasks: "பருவ வாரியான அவசரப் பணிகள்",
    markCompleted: "முடிக்கப்பட்டது என குறிக்க",
  },
  common: {
    acres: "ஏக்கர்",
    hectares: "ஹெக்டேர்",
    cents: "சென்ட்",
    rupee: "₹",
    save: "சேமிக்க",
    cancel: "ரத்து செய்",
    loading: "காத்திருக்கவும்...",
    error: "பிழை ஏற்பட்டது",
    success: "வெற்றிகரமாக சேமிக்கப்பட்டது",
    low: "குறைந்த அபாயம்",
    moderate: "நடுத்தர அபாயம்",
    high: "அதிக அபாயம்",
    critical: "தீவிர அபாயம்",
    themeLight: "பகல் முறை (Light)",
    themeDark: "இரவு முறை (Dark)",
    themeSystem: "கணினி முறை",
  },
};

// Hindi Dictionary
export const hiDict: TranslationDictionary = {
  ...enDict,
  appName: "मन्नवायल AI (MannVayal)",
  tagline: "जलवायु का अनुमान। फसलों की सुरक्षा। किसानों का सशक्तिकरण।",
  taglineTamil: "காலநிலையை கணித்து, பயிர்களை காத்து, விவசாயத்தை வளப்படுத்துவோம்.",
  nav: {
    ...enDict.nav,
    home: "होम",
    about: "हमारे बारे में",
    features: "विशेषताएं",
    dashboard: "किसान डैशबोर्ड",
    simulator: "जलवायु सिमुलेटर",
    regretCalculator: "फसल निर्णय कैलकुलेटर",
    waterBudget: "जल बजट वॉलेट",
    timeline: "फसल बचाव समयरेखा",
    advisor: "कृषि सलाहकार",
    admin: "प्रशासन केंद्र",
    signIn: "लॉग इन",
    register: "शुरू करें",
    signOut: "लॉग आउट",
  },
  hero: {
    ...enDict.hero,
    headline: "जलवायु अनिश्चितता को बेहतर कृषि निर्णयों में बदलें।",
    subheadline: "मौसम के जोखिमों का पूर्वानुमान लगाएं, परिदृश्यों का अनुकरण करें और जल बजट का सटीक प्रबंधन करें।",
    exploreFarm: "अपने खेत को देखें",
    seeHowItWorks: "यह कैसे काम करता है",
  },
  dashboard: {
    ...enDict.dashboard,
    greeting: "नमस्ते, किसान साथी",
    currentCrop: "वर्तमान फसल",
    stage: "फसल चरण",
    weatherTitle: "7-दिवसीय मौसम पूर्वानुमान",
    waterSummary: "जल बजट संतुलन",
    riskScore: "जलवायु जोखिम सूचकांक",
  },
  common: {
    ...enDict.common,
    acres: "एकड़",
    hectares: "हेक्टेयर",
    save: "सहेजें",
    cancel: "रद्द करें",
    low: "कम जोखिम",
    moderate: "मध्यम जोखिम",
    high: "उच्च जोखिम",
    critical: "गंभीर जोखिम",
  },
};

// Dictionary Registry for all 13 Indian languages
export const DICTIONARIES: Record<string, TranslationDictionary> = {
  en: enDict,
  ta: taDict,
  hi: hiDict,
  te: { ...enDict, appName: "మన్నవాయల్ AI", tagline: "వాతావరణాన్ని అంచనా వేయండి. పంటలను రక్షించండి. రైతులకు సాధికారత కల్పించండి." },
  kn: { ...enDict, appName: "ಮನ್ನವಾಯಲ್ AI", tagline: "ಹವಾಮಾನವನ್ನು ಊಹಿಸಿ. ಬೆಳೆಗಳನ್ನು ರಕ್ಷಿಸಿ. ರೈತರನ್ನು ಸಶಕ್ತಗೊಳಿಸಿ." },
  ml: { ...enDict, appName: "മണ്ണവയൽ AI", tagline: "കാലാവസ്ഥ പ്രവചിക്കുക. വിളകൾ സംരക്ഷിക്കുക. കർഷകരെ ശാക്തീകരിക്കുക." },
  bn: { ...enDict, appName: "মানভায়াল AI", tagline: "আবহাওয়া পূর্বাভাস। ফসল সুরক্ষা। কৃষকের ক্ষমতায়ন।" },
  mr: { ...enDict, appName: "मन्नवायल AI", tagline: "हवामानाचा अंदाज घ्या. पिकांचे रक्षण करा. शेतकऱ्यांना सक्षम करा." },
  gu: { ...enDict, appName: "મન્નવાયલ AI", tagline: "હવામાનની આગાહી કરો. પાકનું રક્ષણ કરો. ખેડૂતોને સશક્ત બનાવો." },
  pa: { ...enDict, appName: "ਮੰਨਵਾਇਲ AI", tagline: "ਮੌਸਮ ਦਾ ਅੰਦਾਜ਼ਾ ਲਗਾਓ। ਫਸਲਾਂ ਦੀ ਰੱਖਿਆ ਕਰੋ। ਕਿਸਾਨਾਂ ਨੂੰ ਸਮਰੱਥ ਬਣਾਓ।" },
  or: { ...enDict, appName: "ମନ୍ନଭାୟାଲ AI", tagline: "ପାଣିପାଗ ପୂର୍ବାନୁମାନ। ଫସଲ ସୁରକ୍ଷା। କୃଷକ ସଶକ୍ତୀକରଣ।" },
  as: { ...enDict, appName: "মানভায়াল AI", tagline: "বতৰৰ পূৰ্বাভাস। শস্য সুৰক্ষা। কৃষকৰ সৱলীকৰণ।" },
  ur: { ...enDict, appName: "من وائل AI", tagline: "موسم کی پیش گوئی۔ فصلوں کا تحفظ۔ کسانوں کو بااختیار بنانا۔" },
};

export function getDictionary(lang: string = DEFAULT_LANGUAGE): TranslationDictionary {
  return DICTIONARIES[lang] || DICTIONARIES[DEFAULT_LANGUAGE] || enDict;
}

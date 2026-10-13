# MannVayal AI (மண்வயல்)

> **"Predict Climate. Protect Crops. Empower Farmers."**  
> *"காலநிலையை கணித்து, பயிர்களை காத்து, விவசாயத்தை வளப்படுத்துவோம்."*

MannVayal AI is a production-minded full-stack climate-smart agriculture and agricultural risk management web platform designed for Indian smallholder and marginal farmers, agricultural cooperatives (FPOs), and extension officers.

---

## 🌟 Core Product Vision & Restrictions

1. **Software-Only Architecture**: Operates purely on user-reported farm parameters, open high-resolution weather datasets, and academic agronomic models (TNAU / ICAR / FAO-33). **Zero IoT hardware, drones, or soil probes required.**
2. **Responsible AI & Honest Data**: We separate deterministic mathematical formulations from generative AI. We never fabricate crop yields, market prices, or weather forecasts.
3. **13 Indian Regional Languages**: Native multilingual architecture with primary dedication to **Tamil (தமிழ்)**, alongside Hindi, Telugu, Kannada, Malayalam, Bengali, Marathi, Gujarati, Punjabi, Odia, Assamese, and Urdu (with RTL layout).

---

## 🚀 6 Flagship Decision Engines

1. **Climate What-If Simulator** (`/dashboard/simulator`)
   - Simulates rainfall anomalies (-50% to +50%), dry spells up to 30 days, delayed monsoon onsets, and temperature spikes.
   - Calculates yield impact using FAO-33 yield response factor ($K_y$) and stage sensitivity coefficients.
   - Generates TNAU contingency guidance (e.g., foliar sprays of 1% KCl, mulching, AWD shift).
2. **Crop Decision Regret Calculator** (`/dashboard/regret-calculator`)
   - Implements **Savage's Minimax Regret Criterion (1951)**.
   - Evaluates multi-crop portfolios across 5 climate states to find the crop that minimizes worst-case financial regret rather than chasing fragile top profits.
3. **Water Budget Wallet** (`/dashboard/water-budget`)
   - Balances daily crop evapotranspiration ($ET_c = K_c \times ET_0$) against borewell quota, canal turns, and farm pond reserves.
   - Features an interactive 3D-styled reservoir depth and capacity gauge.
   - Quantifies water savings from Alternate Wetting and Drying (AWD) and micro-drip conversions.
4. **Adaptive Crop Rescue Timeline** (`/dashboard/timeline`)
   - 8-stage phenological growth progression (Land preparation, Nursery, Vegetative, Panicle Initiation, Flowering, Grain Filling, Maturity, Harvest).
   - Dynamic stage advances and interactive checklist of rescue tasks.
5. **Community Sowing Synchronizer** (`/dashboard/community`)
   - Opt-in, privacy-preserving regional dashboard that aggregates sowing dates and crop acreages to forecast collective canal water peaks and prevent tail-end desiccation.
6. **Explainable Tamil Farm Advisor** (`/dashboard/advisor`)
   - Conversational agronomical intelligence providing transparent reasoning chains, documented assumptions, data source citations, and referrals to local KVK extension officers.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons, Canvas 2D/3D Parallax.
- **Backend**: Next.js Server Components, Route Handlers, REST APIs with strict input validation.
- **Database**: SQLite for instant zero-configuration local development & local testing; PostgreSQL supported via Prisma ORM (`DATABASE_URL`).
- **Authentication**: JWT-based session management (`mv_session` HttpOnly cookie) with bcryptjs password hashing and OTP fallback.
- **Testing**: Native Node.js test runner via `tsx --test`.

---

## 📂 Project Structure

```
c:/MannVayal AI/
├── prisma/
│   └── schema.prisma           # 30+ database models & relations
├── scripts/
│   └── seed.mjs                # Database seeder with TNAU/ICAR data
├── src/
│   ├── app/
│   │   ├── api/                # REST endpoints (auth, weather, simulator, etc.)
│   │   ├── dashboard/          # Farmer dashboard and flagship engines
│   │   ├── legal/              # Privacy, Terms, Data Sources, AI Limitations
│   │   ├── page.tsx            # Master landing page
│   │   └── globals.css         # Design system tokens and dark mode
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, Sidebar, ThemeLanguageControls
│   │   └── visual/             # Hero3DField, ReservoirVisualizer, CropGrowthStage3D
│   ├── context/
│   │   └── AppContext.tsx      # Global state for i18n, theme, user, and active farm
│   └── lib/
│       ├── calculations/       # Scientific calculation engines (FAO-33, Regret, Water)
│       ├── i18n/               # Multi-language dictionaries for 13 Indian languages
│       ├── advisorKnowledge.ts # Explainable agronomic knowledge base
│       └── weatherService.ts   # Open-Meteo & IMD weather integration
└── tests/
    └── calculations.test.mjs   # Automated unit tests for calculation engines
```

---

## 💻 Quick Start & Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database & Seed
```bash
npx prisma db push
npm run db:seed
```

### 3. Run Automated Tests
```bash
npm test
```

### 4. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Pre-Seeded Demonstration Accounts

You can log in instantly using the one-click demo selectors on `/login`:
- **Farmer Demo**: `farmer@mannvayal.ai` / `MannVayal@2026`
- **Advisor Demo**: `advisor@mannvayal.ai` / `Advisor@2026`
- **Platform Admin**: `admin@mannvayal.ai` / `Admin@2026`

---

## 🛡️ Security & Privacy Checklist

- [x] No plaintext passwords (Bcrypt with salt rounds = 10).
- [x] HttpOnly, SameSite cookies for sessions.
- [x] Strict user isolation on all farm endpoints.
- [x] Input sanitization and error handling without secret leakage.
- [x] Cryptographic privacy suppression for community sowing data.
- [x] Honest live vs simulated data mode indicators.

---

## 📜 Scientific & Data Citations
- **FAO-33**: Doorenbos, J. & Kassam, A.H. (1979). *Yield response to water*. Irrigation and Drainage Paper 33, Food and Agriculture Organization of the United Nations.
- **FAO-56**: Allen, R.G., et al. (1998). *Crop evapotranspiration: Guidelines for computing crop water requirements*. FAO Irrigation and Drainage Paper 56.
- **TNAU**: Tamil Nadu Agricultural University (2024). *Crop Production Guide (Agriculture)*. Coimbatore, Tamil Nadu.
- **IMD**: India Meteorological Department, Ministry of Earth Sciences, Government of India.

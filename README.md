# Train with Nish

Personalized fitness coaching platform — track workouts, protein, PRs, cravings, and explore an interactive muscle map.

**Portfolio:** [nishthasinghportfolio.netlify.app](https://nishthasinghportfolio.netlify.app/)

## Features

| Module | What it does |
| --- | --- |
| **Muscle Map** | Interactive front/back body map — tap muscles for training tips and exercise guidance |
| **Track PRs** | Log personal records with charts and progress over time |
| **Track Protein** | Hybrid food lookup (local map + USDA API fallback) with smart caching |
| **Cravings Controller** | Identify craving types and get actionable alternatives |

## Stack

React · Vite · React Router · Recharts · LocalStorage

## Run locally

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173/`.

### Optional — USDA protein lookup

For unknown foods, the app falls back to [USDA FoodData Central](https://fdc.nal.usda.gov/) (free API key):

1. Sign up: [fdc.nal.usda.gov/api-key-signup.html](https://fdc.nal.usda.gov/api-key-signup.html)
2. Copy `.env.example` → `.env`
3. Add `VITE_USDA_API_KEY=your_key`
4. Restart the dev server

Works offline for common foods even without a key.

## Project structure

```
src/
├── pages/          # Hero, MuscleMap, TrackPRs, TrackProtein, CravingsController
├── data/           # Muscle regions, protein map, craving types
├── services/       # Protein lookup, PR storage, USDA cache
└── utils/          # Meal parsing, body image helpers
```

## Scripts

```bash
npm run dev       # Development server
npm run build     # Production build
npm run preview   # Preview production build
```

---

Built by **Nishtha Singh**

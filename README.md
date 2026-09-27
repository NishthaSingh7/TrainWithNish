# TrainWithNish

A personal fitness coaching web app for tracking protein, personal records, workouts, and habits — plus interactive tools like a muscle map and cravings timer.

**Portfolio:** [nishthasinghportfolio.netlify.app](https://nishthasinghportfolio.netlify.app/)

---

## What this project is

TrainWithNish is a React single-page app that brings common gym coaching tools into one place. There is no backend — data you save (PRs, weekly plans, challenge progress) stays in your browser via `localStorage`.

It started as a protein tracker and has grown into a full fitness toolkit with a redesigned homepage and mobile-friendly navigation.

---

## What's built so far

### Live interactive tools

| Feature | Route | What you can do |
| --- | --- | --- |
| **Track Protein** | `/trackprotein` | Set a daily protein goal, log meals (text), see totals and a pie chart. Optional USDA FoodData Central lookup for foods not in the local map. |
| **Track Your PRs** | `/trackprs` | Log lifts (exercise, weight, reps, notes). Bests and history are saved in the browser. |
| **Progress Tracker** | `/progress` | Dashboard over your saved PRs — totals, recent lifts, and personal bests. |
| **Muscle Map** | `/musclemap` | Interactive male/female, front/back body figures. Tap a muscle for name, tips, and training guidance. |
| **Cravings Controller** | `/cravings` | Pick a craving type, run a wait-it-out timer, and get rotating motivation / distraction tips. |
| **Workout Planner** | `/planner` | Apply weekly split templates, customize days, and save your plan locally. |
| **Challenge Corner** | `/challenges` | 30-day-style challenges with checkable tasks and saved progress. |

### Guides & content

| Feature | Route | What you get |
| --- | --- | --- |
| **Exercises** | `/exercises` | Filterable exercise catalog by muscle group, with tips and a link to the Muscle Map. |
| **Daily Motivation** | `/motivation` | Quote of the day plus a theme-filtered quote grid. |
| **Supplement Guide** | `/supplements` | Category-filtered cards (purpose, dose, timing, notes) with a disclaimer. |
| **Nutrition Tips** | `/nutrition` | Macro basics, meal timing tips, and high-protein meal ideas. |
| **Transformation Stories** | `/stories` | Community-style success story cards. |

### Homepage & UX

- Landing page with hero, how-it-works, live tools spotlight, full feature grid, value props, motivation strip, and CTA
- Fixed navbar with links to Home, Track Protein, Exercises, Planner, and external **Laugh Bites**
- Mobile-friendly layout: hamburger menu, responsive pages, shared spacing/layout variables
- Scroll-reveal animations on homepage sections

---

## Stack

| Layer | Choice |
| --- | --- |
| UI | React 19 |
| Build | Vite 8 |
| Routing | React Router 7 |
| Charts | Recharts |
| Effects | react-confetti (protein goal) |
| Persistence | Browser `localStorage` |
| Optional API | [USDA FoodData Central](https://fdc.nal.usda.gov/) |

Requires **Node.js ≥ 20.19**.

---

## Run locally

```bash
npm install
npm run dev
```

App: [http://localhost:5173/](http://localhost:5173/)

### Scripts

```bash
npm run dev       # Development server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint
```

### Optional — USDA protein lookup

For foods not in the local map, the app can call USDA FoodData Central (free API key):

1. Sign up: [fdc.nal.usda.gov/api-key-signup.html](https://fdc.nal.usda.gov/api-key-signup.html)
2. Copy `.env.example` → `.env`
3. Set `VITE_USDA_API_KEY=your_key`
4. Restart the dev server

Common foods still work offline without a key.

---

## Project structure

```
src/
├── pages/          # Routes + homepage sections (Hero, FeatureCard, etc.)
├── data/           # Exercises, plans, muscles, protein map, quotes, guides
├── services/       # Protein lookup, PR storage, feature storage, USDA cache
├── utils/          # Meal parsing, muscle map helpers
├── hooks/          # Scroll reveal
└── css/            # Page and section styles
public/
└── images/         # Body figures for Muscle Map
```

---

## Notes

- **No account / no server** — PRs, planner, challenges, and USDA cache are stored in the browser only.
- **Nav vs all features** — Every tool is reachable from the homepage feature grid; the top nav highlights a few primary links.
- **Laugh Bites** in the navbar opens a separate joke app (external Railway deploy).

---

Built by **Nishtha Singh**

# TrainWithNish

Fitness-focused React app built with Vite.

## Run locally

```bash
npm install
npm run dev
```

App runs on `http://localhost:5173/`.

## Track Protein lookup (local + API fallback)

The `Track Protein` route uses hybrid lookup:

- Local map lookup first (fast and works offline for known foods).
- API fallback for unknown food/dish names.

### Optional API setup (USDA FoodData Central — free)

For unknown foods, the app falls back to [USDA FoodData Central](https://fdc.nal.usda.gov/).

1. Get a free API key: [https://fdc.nal.usda.gov/api-key-signup.html](https://fdc.nal.usda.gov/api-key-signup.html)
2. Copy `.env.example` to `.env` in the project root
3. Add your key:

```bash
VITE_USDA_API_KEY=your_usda_api_key_here
```

4. Restart the dev server: `npm run dev`

If the key is missing, the app still works with local food mapping only.

### USDA caching

USDA results are cached by food name for 7 days (browser `localStorage` + in-memory).
Repeat lookups like `100g salmon` and `200g salmon` reuse the same cached USDA data and do not call the API again.

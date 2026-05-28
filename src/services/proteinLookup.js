import { parseMealInput } from '../utils/parseMealInput';
import { getCachedUsdaFood, setCachedUsdaFood } from './usdaCache';

const FDC_SEARCH_URL = 'https://api.nal.usda.gov/fdc/v1/foods/search';
const FDC_FOOD_URL = 'https://api.nal.usda.gov/fdc/v1/food';
const PROTEIN_NUTRIENT_ID = 1003;

const toNumber = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

function extractProteinPer100g(food) {
  const nutrients = food?.foodNutrients;
  if (!Array.isArray(nutrients)) {
    return null;
  }

  const proteinNutrient = nutrients.find((nutrient) => {
    const id = nutrient?.nutrientId ?? nutrient?.nutrient?.id;
    const name = (nutrient?.nutrientName ?? nutrient?.nutrient?.name ?? '').toLowerCase();
    return id === PROTEIN_NUTRIENT_ID || name.includes('protein');
  });

  if (!proteinNutrient) {
    return null;
  }

  const value = proteinNutrient.value ?? proteinNutrient.amount;
  const protein = toNumber(value);
  return protein > 0 ? protein : null;
}

function getServingGrams(food, parsedInput) {
  const servingSize = toNumber(food?.servingSize);
  const unit = (food?.servingSizeUnit || '').toLowerCase();

  if (servingSize > 0 && unit === 'g') {
    return servingSize;
  }

  if (parsedInput.unit === 'grams') {
    return parsedInput.amount;
  }

  if (parsedInput.unit === 'count') {
    return 100 * parsedInput.amount;
  }

  return 100;
}

function calculateProteinFromPer100g(proteinPer100g, parsedInput, servingGrams) {
  if (parsedInput.unit === 'grams') {
    return (parsedInput.amount / 100) * proteinPer100g;
  }

  if (parsedInput.unit === 'count') {
    const grams = servingGrams * parsedInput.amount;
    return (grams / 100) * proteinPer100g;
  }

  return (servingGrams / 100) * proteinPer100g;
}

function buildLookupResult({ proteinPer100g, description, defaultServingGrams }, parsedInput, fromCache) {
  const foodLike = {
    servingSize: defaultServingGrams,
    servingSizeUnit: 'g'
  };
  const servingGrams = getServingGrams(foodLike, parsedInput);
  const proteinAmount = calculateProteinFromPer100g(proteinPer100g, parsedInput, servingGrams);

  if (proteinAmount <= 0) {
    return null;
  }

  const amountLabel =
    parsedInput.unit === 'grams'
      ? `${parsedInput.amount}g`
      : parsedInput.unit === 'count'
        ? `${parsedInput.amount} serving(s)`
        : `${servingGrams}g default serving`;

  const sourceLabel = fromCache ? 'USDA, cached' : 'USDA';

  return {
    proteinAmount,
    breakdown: `${description} (${amountLabel}, ${proteinPer100g.toFixed(1)}g protein per 100g, ${sourceLabel})`
  };
}

async function fetchFoodById(fdcId, apiKey) {
  const response = await fetch(`${FDC_FOOD_URL}/${fdcId}?api_key=${apiKey}`);
  if (!response.ok) {
    return null;
  }
  return response.json();
}

async function fetchUsdaFoodBase(foodText, apiKey) {
  const params = new URLSearchParams({
    query: foodText,
    pageSize: '1',
    dataType: 'Foundation,SR Legacy,Survey (FNDDS),Branded',
    api_key: apiKey
  });

  const response = await fetch(`${FDC_SEARCH_URL}?${params.toString()}`);
  if (!response.ok) {
    return null;
  }

  const payload = await response.json();
  let food = payload?.foods?.[0];
  if (!food?.fdcId) {
    return null;
  }

  let proteinPer100g = extractProteinPer100g(food);
  if (!proteinPer100g) {
    const foodDetails = await fetchFoodById(food.fdcId, apiKey);
    proteinPer100g = extractProteinPer100g(foodDetails);
    if (foodDetails) {
      food = { ...food, ...foodDetails };
    }
  }

  if (!proteinPer100g) {
    return null;
  }

  const defaultServingGrams = getServingGrams(food, {
    amount: 1,
    unit: 'default',
    foodText
  });

  return {
    proteinPer100g,
    description: food.description || foodText,
    defaultServingGrams
  };
}

export async function lookupProteinFromApi(rawQuery) {
  const apiKey = import.meta.env.VITE_USDA_API_KEY;
  if (!apiKey || !rawQuery?.trim()) {
    return null;
  }

  const parsedInput = parseMealInput(rawQuery);
  if (!parsedInput?.foodText) {
    return null;
  }

  const cached = getCachedUsdaFood(parsedInput.foodText);
  if (cached) {
    return buildLookupResult(cached, parsedInput, true);
  }

  try {
    const foodBase = await fetchUsdaFoodBase(parsedInput.foodText, apiKey);
    if (!foodBase) {
      return null;
    }

    setCachedUsdaFood(parsedInput.foodText, foodBase);
    return buildLookupResult(foodBase, parsedInput, false);
  } catch {
    return null;
  }
}

const GRAM_PATTERN = /(\d+(?:\.\d+)?)\s*(?:g|gram|grams|gm)\b/i;
const COUNT_PATTERN = /^(\d+(?:\.\d+)?)\s+(.+)$/;

export function parseMealInput(rawValue) {
  const input = rawValue.trim().toLowerCase();
  if (!input) {
    return null;
  }

  const gramMatch = input.match(GRAM_PATTERN);
  if (gramMatch) {
    return {
      amount: Number(gramMatch[1]),
      unit: 'grams',
      foodText: input.replace(GRAM_PATTERN, ' ').replace(/\s+/g, ' ').trim()
    };
  }

  const countMatch = input.match(COUNT_PATTERN);
  if (countMatch) {
    return {
      amount: Number(countMatch[1]),
      unit: 'count',
      foodText: countMatch[2].trim()
    };
  }

  return {
    amount: 1,
    unit: 'default',
    foodText: input
  };
}

export function calculateLocalProtein({ proteinPer100g, proteinPerPiece, defaultServingGrams }, parsedInput) {
  const { amount, unit } = parsedInput;

  if (unit === 'grams' && proteinPer100g != null) {
    const protein = (amount / 100) * proteinPer100g;
    return {
      proteinAmount: protein,
      breakdown: `${amount}g -> ${proteinPer100g}g protein per 100g`
    };
  }

  if (unit === 'count' && proteinPerPiece != null) {
    const protein = amount * proteinPerPiece;
    return {
      proteinAmount: protein,
      breakdown: `${amount} x ${proteinPerPiece}g per piece`
    };
  }

  if (unit === 'count' && proteinPer100g != null) {
    const servingGrams = (defaultServingGrams || 100) * amount;
    const protein = (servingGrams / 100) * proteinPer100g;
    return {
      proteinAmount: protein,
      breakdown: `${amount} serving(s) x ${defaultServingGrams || 100}g -> ${proteinPer100g}g per 100g`
    };
  }

  if (proteinPer100g != null) {
    const servingGrams = defaultServingGrams || 100;
    const protein = (servingGrams / 100) * proteinPer100g;
    return {
      proteinAmount: protein,
      breakdown: `default ${servingGrams}g serving -> ${proteinPer100g}g per 100g`
    };
  }

  if (proteinPerPiece != null) {
    const protein = amount * proteinPerPiece;
    return {
      proteinAmount: protein,
      breakdown: `${amount} x ${proteinPerPiece}g per piece`
    };
  }

  return null;
}

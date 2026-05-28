import { proteinData, keywordMap } from '../data/proteinMap';
import { calculateLocalProtein, parseMealInput } from '../utils/parseMealInput';

function matchFoodKeys(foodText) {
  const matchedKeys = [];

  Object.entries(keywordMap).forEach(([mainKey, variants]) => {
    for (const variant of variants) {
      const escapedVariant = variant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escapedVariant}\\b`, 'i');
      if (regex.test(foodText)) {
        matchedKeys.push(mainKey);
        break;
      }
    }
  });

  return [...new Set(matchedKeys)];
}

export function getLocalProteinEstimate(rawValue) {
  const parsedInput = parseMealInput(rawValue);
  if (!parsedInput?.foodText) {
    return null;
  }

  const matchedKeys = matchFoodKeys(parsedInput.foodText);
  if (matchedKeys.length === 0) {
    return null;
  }

  let totalProtein = 0;
  const breakdownParts = [];

  matchedKeys.forEach((key) => {
    const foodMeta = proteinData[key];
    const result = calculateLocalProtein(foodMeta, parsedInput);
    if (result) {
      totalProtein += result.proteinAmount;
      breakdownParts.push(`${key}: ${result.breakdown}`);
    }
  });

  if (totalProtein <= 0) {
    return null;
  }

  return {
    proteinAmount: totalProtein,
    breakdown: breakdownParts.join(' | '),
    source: 'Local'
  };
}

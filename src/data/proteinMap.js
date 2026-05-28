// Protein values are per 100g unless marked as per-piece.
// defaultServingGrams is used when user enters only food name (e.g. "paneer").

export const proteinData = {
  egg: { proteinPerPiece: 6, defaultServingGrams: 50 },
  'chicken breast': { proteinPer100g: 31, defaultServingGrams: 100 },
  paneer: { proteinPer100g: 18, defaultServingGrams: 100 },
  milk: { proteinPer100g: 3.4, defaultServingGrams: 250 },
  whey: { proteinPer100g: 80, defaultServingGrams: 30 },
  tofu: { proteinPer100g: 8, defaultServingGrams: 100 },
  almonds: { proteinPer100g: 21, defaultServingGrams: 28 },
  banana: { proteinPer100g: 1.1, defaultServingGrams: 120 },
  curry: { proteinPer100g: 5, defaultServingGrams: 200 }
};

export const keywordMap = {
  egg: ['egg', 'eggs', 'boiled eggs', 'scrambled eggs', 'omelette', 'poached egg', 'fried egg'],
  'chicken breast': ['chicken breast', 'grilled chicken', 'roasted chicken', 'boiled chicken', 'chicken'],
  paneer: ['paneer', 'cottage cheese'],
  milk: ['milk'],
  whey: ['whey', 'whey protein', 'whey scoop', 'whey protein shake'],
  tofu: ['tofu'],
  almonds: ['almonds', 'nuts', 'almond'],
  banana: ['banana'],
  curry: ['curry', 'veg curry', 'normal curry', 'chicken curry']
};

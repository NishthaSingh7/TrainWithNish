export const macroGuide = {
  protein: {
    label: 'Protein',
    role: 'Builds and repairs muscle tissue. Priority for lifters.',
    target: 'Rough guide: 1.6–2.2g per kg of bodyweight daily.',
    sources: ['Chicken, fish, eggs', 'Greek yogurt, cottage cheese', 'Tofu, legumes, protein powder'],
  },
  carbs: {
    label: 'Carbs',
    role: 'Primary fuel for training and recovery.',
    target: 'Adjust based on activity — higher on training days, moderate on rest days.',
    sources: ['Rice, oats, potatoes', 'Fruit, whole-grain bread', 'Pasta, quinoa'],
  },
  fats: {
    label: 'Fats',
    role: 'Hormone health, satiety, and nutrient absorption.',
    target: 'Typically 0.8–1g per kg bodyweight, or ~20–35% of calories.',
    sources: ['Olive oil, avocado', 'Nuts, nut butter', 'Fatty fish, eggs'],
  },
};

export const mealTips = [
  {
    title: 'Pre-workout meal',
    timing: '1–3 hours before training',
    ideas: ['Oats with banana and protein', 'Rice bowl with chicken', 'Toast with eggs'],
    tip: 'Keep fat moderate so digestion doesn\'t slow you down.',
  },
  {
    title: 'Post-workout meal',
    timing: 'Within 2 hours after training',
    ideas: ['Protein shake + fruit', 'Chicken wrap with rice', 'Greek yogurt with berries'],
    tip: 'Prioritize protein; carbs help refill glycogen.',
  },
  {
    title: 'High-protein snack',
    timing: 'Between meals',
    ideas: ['Cottage cheese', 'Protein bar (check labels)', 'Hard-boiled eggs', 'Edamame'],
    tip: 'Use Track Protein to log snacks so they count toward your daily goal.',
  },
  {
    title: 'Rest day nutrition',
    timing: 'Non-training days',
    ideas: ['Same protein target', 'Slightly fewer carbs', 'Plenty of vegetables and water'],
    tip: 'Recovery days still need protein — muscle repair happens on rest days too.',
  },
  {
    title: 'Hydration baseline',
    timing: 'All day',
    ideas: ['Water with every meal', 'Electrolytes on long sessions', 'Limit sugary drinks'],
    tip: 'Thirst lags behind need — sip consistently, especially in hot gyms.',
  },
];

export const quickMeals = [
  { name: 'Overnight oats + whey', protein: '~35g', prep: '5 min' },
  { name: 'Tuna rice bowl', protein: '~40g', prep: '10 min' },
  { name: 'Scrambled eggs on toast', protein: '~25g', prep: '8 min' },
  { name: 'Greek yogurt parfait', protein: '~30g', prep: '3 min' },
  { name: 'Chicken stir-fry', protein: '~45g', prep: '20 min' },
];

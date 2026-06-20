export const cravingTypes = [
  {
    id: 'sweet',
    label: 'Sweet / Sugar',
    emoji: '🍰',
    durationMinutes: 15,
    summary: 'Sugar cravings usually peak and fade within 15 minutes.',
    motivations: [
      'This craving is a wave — it will pass if you wait it out.',
      'Every time you wait, you build real self-control muscle.',
      'Your future self will thank you for staying on track.',
      'You are stronger than a temporary urge.',
      'Progress beats perfection. One win at a time.',
    ],
    distractions: [
      'Drink a full glass of water slowly.',
      'Brush your teeth or chew sugar-free gum.',
      'Take a 5-minute walk outside.',
      'Text a friend about your workout goals.',
      'Do 20 air squats or push-ups right now.',
      'Plan your next healthy meal instead of eating.',
    ],
  },
  {
    id: 'salty',
    label: 'Salty / Chips',
    emoji: '🍟',
    durationMinutes: 12,
    summary: 'Salty snack urges often fade in about 12 minutes.',
    motivations: [
      'Cravings feel urgent but they are not emergencies.',
      'You do not have to act on every thought about food.',
      'Staying consistent matters more than one snack.',
      'You have waited through harder things than this.',
    ],
    distractions: [
      'Eat a handful of nuts or a boiled egg if you need protein.',
      'Stretch your neck and shoulders for 2 minutes.',
      'Watch a short funny video — change your mental state.',
      'Review your PR list and remember why you started.',
    ],
  },
  {
    id: 'fastfood',
    label: 'Fast Food',
    emoji: '🍔',
    durationMinutes: 18,
    summary: 'Fast-food cravings can take a bit longer — give it 18 minutes.',
    motivations: [
      'Convenience is tempting; discipline is rewarding.',
      'One skipped impulse meal keeps your week on track.',
      'You are investing in how you feel tomorrow morning.',
      'The craving is loud now — it will get quieter soon.',
    ],
    distractions: [
      'Search a quick high-protein recipe you can cook instead.',
      'Delete or hide the delivery app for tonight.',
      'Prep tomorrow’s lunch while you wait.',
      'Call someone instead of ordering food.',
    ],
  },
  {
    id: 'soda',
    label: 'Soda / Sweet Drinks',
    emoji: '🥤',
    durationMinutes: 10,
    summary: 'Drink cravings often drop off within 10 minutes.',
    motivations: [
      'Hydration beats empty calories every time.',
      'Your taste buds adapt — cravings weaken with consistency.',
      'Small choices compound into big results.',
    ],
    distractions: [
      'Sparkling water with lemon or mint.',
      'Make iced green tea or black coffee.',
      'Hold an ice cube — the cold shock resets the urge.',
    ],
  },
  {
    id: 'latenight',
    label: 'Late-Night Snack',
    emoji: '🌙',
    durationMinutes: 20,
    summary: 'Night cravings need patience — wait about 20 minutes.',
    motivations: [
      'Sleep quality matters as much as training.',
      'You will wake up prouder if you skip this one.',
      'Late eating rarely solves what you actually need — rest does.',
    ],
    distractions: [
      'Start your bedtime routine early.',
      'Read 5 pages of a book in dim light.',
      'Journal one thing you did well at the gym today.',
      'Herbal tea and phone on charge away from the bed.',
    ],
  },
  {
    id: 'emotional',
    label: 'Emotional Eating',
    emoji: '💭',
    durationMinutes: 18,
    summary: 'Emotional urges need space — allow 18 minutes to settle.',
    motivations: [
      'Food is fuel, not a fix for every feeling.',
      'Naming the feeling is half the battle — you are aware, and that helps.',
      'You deserve care that lasts longer than a snack.',
      'This moment does not define your journey.',
    ],
    distractions: [
      'Write down what triggered the craving in one sentence.',
      'Box breathing: 4 seconds in, 4 hold, 4 out, 4 hold.',
      'Step outside and notice 3 things you can see and hear.',
      'Message someone you trust — connection beats isolation.',
    ],
  },
];

export function getCravingById(id) {
  return cravingTypes.find((c) => c.id === id) ?? null;
}

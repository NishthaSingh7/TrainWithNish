export const motivationQuotes = [
  { text: 'The only bad workout is the one that didn\'t happen.', author: 'Unknown', theme: 'Consistency' },
  { text: 'Discipline is choosing between what you want now and what you want most.', author: 'Abraham Lincoln', theme: 'Discipline' },
  { text: 'Your body can stand almost anything. It\'s your mind you have to convince.', author: 'Unknown', theme: 'Mindset' },
  { text: 'Success isn\'t always about greatness. It\'s about consistency.', author: 'Dwayne Johnson', theme: 'Consistency' },
  { text: 'The hard days are what make you stronger.', author: 'Aly Raisman', theme: 'Resilience' },
  { text: 'Don\'t limit your challenges. Challenge your limits.', author: 'Unknown', theme: 'Growth' },
  { text: 'Strength does not come from winning. Your struggles develop your strengths.', author: 'Arnold Schwarzenegger', theme: 'Strength' },
  { text: 'Motivation is what gets you started. Habit is what keeps you going.', author: 'Jim Ryun', theme: 'Habits' },
  { text: 'The pain you feel today will be the strength you feel tomorrow.', author: 'Unknown', theme: 'Resilience' },
  { text: 'Small daily improvements are the key to long-term results.', author: 'Unknown', theme: 'Progress' },
  { text: 'You don\'t have to be extreme, just consistent.', author: 'Unknown', theme: 'Consistency' },
  { text: 'The clock is ticking. Are you becoming the person you want to be?', author: 'Unknown', theme: 'Mindset' },
];

export function getQuoteOfTheDay() {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((today - start) / 86400000);
  return motivationQuotes[dayOfYear % motivationQuotes.length];
}

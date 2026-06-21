const PLANNER_KEY = 'trainwithnish_weekly_plan';
const CHALLENGE_KEY = 'trainwithnish_challenge_progress';

export function loadWeeklyPlan() {
  try {
    const raw = localStorage.getItem(PLANNER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveWeeklyPlan(plan) {
  localStorage.setItem(PLANNER_KEY, JSON.stringify(plan));
}

export function loadChallengeProgress() {
  try {
    const raw = localStorage.getItem(CHALLENGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export function saveChallengeProgress(progress) {
  localStorage.setItem(CHALLENGE_KEY, JSON.stringify(progress));
}

export function toggleChallengeTask(challengeId, taskIndex) {
  const progress = loadChallengeProgress();
  const key = `${challengeId}:${taskIndex}`;
  progress[key] = !progress[key];
  saveChallengeProgress(progress);
  return progress;
}

export function isChallengeTaskDone(challengeId, taskIndex) {
  const progress = loadChallengeProgress();
  return Boolean(progress[`${challengeId}:${taskIndex}`]);
}

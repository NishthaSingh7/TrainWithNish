const STORAGE_KEY = 'trainwithnish_prs';

function readRaw() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeRaw(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function loadPRs() {
  return readRaw().sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function savePR(entry) {
  const records = readRaw();
  records.push(entry);
  writeRaw(records);
  return entry;
}

export function deletePR(id) {
  const next = readRaw().filter((r) => r.id !== id);
  writeRaw(next);
  return next;
}

export function clearAllPRs() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getBestByExercise(records) {
  const best = {};
  for (const record of records) {
    const key = record.exercise.trim().toLowerCase();
    if (!key) continue;
    const existing = best[key];
    if (!existing || record.weight > existing.weight) {
      best[key] = record;
    }
  }
  return Object.values(best).sort((a, b) => a.exercise.localeCompare(b.exercise));
}

export function createPRRecord({ exercise, weight, unit, reps, notes }) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    exercise: exercise.trim(),
    weight: Number(weight),
    unit: unit || 'kg',
    reps: reps ? Number(reps) : null,
    notes: notes?.trim() || '',
    date: new Date().toISOString(),
  };
}

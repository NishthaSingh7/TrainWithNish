const CACHE_STORAGE_KEY = 'trainwithnish_usda_cache_v1';
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const memoryCache = new Map();

function normalizeFoodKey(foodText) {
  return foodText.trim().toLowerCase().replace(/\s+/g, ' ');
}

function readStorageCache() {
  try {
    const raw = localStorage.getItem(CACHE_STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function writeStorageCache(data) {
  try {
    localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore quota or private-mode errors; memory cache still helps.
  }
}

function isFresh(entry) {
  if (!entry?.cachedAt) {
    return false;
  }
  return Date.now() - entry.cachedAt < CACHE_TTL_MS;
}

export function getCachedUsdaFood(foodText) {
  const key = normalizeFoodKey(foodText);
  if (!key) {
    return null;
  }

  const fromMemory = memoryCache.get(key);
  if (fromMemory && isFresh(fromMemory)) {
    return fromMemory;
  }

  const storage = readStorageCache();
  const fromStorage = storage[key];
  if (fromStorage && isFresh(fromStorage)) {
    memoryCache.set(key, fromStorage);
    return fromStorage;
  }

  return null;
}

export function setCachedUsdaFood(foodText, entry) {
  const key = normalizeFoodKey(foodText);
  if (!key || !entry?.proteinPer100g) {
    return;
  }

  const record = {
    proteinPer100g: entry.proteinPer100g,
    description: entry.description || foodText,
    defaultServingGrams: entry.defaultServingGrams || 100,
    cachedAt: Date.now()
  };

  memoryCache.set(key, record);

  const storage = readStorageCache();
  storage[key] = record;
  writeStorageCache(storage);
}

export function clearUsdaCache() {
  memoryCache.clear();
  try {
    localStorage.removeItem(CACHE_STORAGE_KEY);
  } catch {
    // no-op
  }
}

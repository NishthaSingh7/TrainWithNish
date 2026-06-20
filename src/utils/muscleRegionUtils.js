import { muscleRegions as defaultMuscleRegions } from '../data/muscleRegions';

const STORAGE_KEY = 'trainwithnish_muscle_regions';

export function cloneRegions(regions) {
  return JSON.parse(JSON.stringify(regions));
}

/** Migrate legacy polygon / hitPolygons format to { sides: { left|right|center: { polygon } } }. */
export function normalizeMuscle(muscle) {
  if (muscle?.sides) return muscle;

  if (muscle?.hitPolygons?.length === 2) {
    const { polygon, hitPolygons, ...rest } = muscle;
    return {
      ...rest,
      sides: {
        left: { polygon: hitPolygons[0] },
        right: { polygon: hitPolygons[1] },
      },
    };
  }

  const { polygon, hitPolygons, ...rest } = muscle;
  return {
    ...rest,
    sides: {
      center: { polygon: polygon ?? hitPolygons?.[0] ?? [] },
    },
  };
}

export function normalizeRegions(regions) {
  const next = { front: {}, back: {} };
  for (const view of ['front', 'back']) {
    for (const [id, muscle] of Object.entries(regions[view] ?? {})) {
      next[view][id] = normalizeMuscle(muscle);
    }
  }
  return next;
}

export function getMuscleSides(muscle) {
  const normalized = normalizeMuscle(muscle);
  return Object.entries(normalized.sides).map(([sideKey, side]) => ({
    sideKey,
    polygon: side.polygon,
  }));
}

export function getMuscleHitPolygons(muscle) {
  return getMuscleSides(muscle).map((s) => s.polygon);
}

export function getSidePolygon(muscle, sideKey) {
  return normalizeMuscle(muscle).sides[sideKey]?.polygon ?? null;
}

export function sideDisplayLabel(muscle, sideKey) {
  if (sideKey === 'center') return muscle.label;
  const sideName = sideKey === 'left' ? 'Left' : 'Right';
  return `${muscle.label} (${sideName})`;
}

export function calibrationTargetKey(muscleId, sideKey) {
  return `${muscleId}:${sideKey}`;
}

export function parseCalibrationTarget(targetKey) {
  const [muscleId, sideKey] = targetKey.split(':');
  return { muscleId, sideKey };
}

export function getCalibrationTargets(viewRegions) {
  const targets = [];
  for (const [muscleId, muscle] of Object.entries(viewRegions)) {
    for (const { sideKey } of getMuscleSides(muscle)) {
      targets.push({
        muscleId,
        sideKey,
        targetKey: calibrationTargetKey(muscleId, sideKey),
        chipLabel: sideDisplayLabel(muscle, sideKey),
      });
    }
  }
  return targets;
}

export function computeCentroid(poly) {
  if (!poly?.length) return { x: 50, y: 50 };
  let sumX = 0;
  let sumY = 0;
  poly.forEach(([x, y]) => {
    sumX += x;
    sumY += y;
  });
  return { x: sumX / poly.length, y: sumY / poly.length };
}

export function translatePolygon(poly, dx, dy) {
  return poly.map(([x, y]) => [
    Math.max(0, Math.min(100, x + dx)),
    Math.max(0, Math.min(100, y + dy)),
  ]);
}

export function moveMuscleSideCentroid(regions, view, muscleId, sideKey, targetPoint) {
  const muscle = regions[view][muscleId];
  if (!muscle) return regions;

  const normalized = normalizeMuscle(muscle);
  const side = normalized.sides[sideKey];
  if (!side?.polygon) return regions;

  const current = computeCentroid(side.polygon);
  const dx = targetPoint.x - current.x;
  const dy = targetPoint.y - current.y;

  const nextSides = { ...normalized.sides };
  nextSides[sideKey] = {
    ...side,
    polygon: translatePolygon(side.polygon, dx, dy),
  };

  return {
    ...regions,
    [view]: {
      ...regions[view],
      [muscleId]: { ...normalized, sides: nextSides },
    },
  };
}

export function loadCalibratedRegions() {
  return normalizeRegions(loadCalibratedRegionsFromBrowser());
}

export function loadCalibratedRegionsFromBrowser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.front && parsed?.back) return normalizeRegions(parsed);
    }
  } catch {
    // fall through
  }
  return normalizeRegions(defaultMuscleRegions);
}

export function saveCalibratedRegions(regions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeRegions(regions)));
}

export function resetCalibratedRegions() {
  localStorage.removeItem(STORAGE_KEY);
  return normalizeRegions(defaultMuscleRegions);
}

export function polygonArea(poly) {
  let area = 0;
  for (let i = 0; i < poly.length; i++) {
    const [x1, y1] = poly[i];
    const [x2, y2] = poly[(i + 1) % poly.length];
    area += x1 * y2 - x2 * y1;
  }
  return Math.abs(area / 2);
}

export function pointInPoly([x, y], poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0];
    const yi = poly[i][1];
    const xj = poly[j][0];
    const yj = poly[j][1];
    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi + 0.0000001) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

export function findMuscleAtPoint(point, view, regions) {
  const viewRegions = regions[view];
  if (!viewRegions) return null;

  const matches = [];
  for (const [id, muscle] of Object.entries(viewRegions)) {
    const normalized = normalizeMuscle(muscle);
    for (const [sideKey, side] of Object.entries(normalized.sides)) {
      const poly = side.polygon;
      if (pointInPoly([point.x, point.y], poly)) {
        matches.push({
          id,
          sideKey,
          displayLabel: sideDisplayLabel(muscle, sideKey),
          label: muscle.label,
          scientific: muscle.scientific,
          tip: muscle.tip,
          area: polygonArea(poly),
        });
      }
    }
  }

  if (matches.length === 0) return null;
  matches.sort((a, b) => a.area - b.area);
  return matches[0];
}

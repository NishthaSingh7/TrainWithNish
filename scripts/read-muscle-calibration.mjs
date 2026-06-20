import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outPath = join(root, 'src/data/muscleRegions.saved.json');

const profilePaths = [
  `${process.env.HOME}/Library/Application Support/Cursor/Partitions/cursor-browser`,
  `${process.env.HOME}/Library/Application Support/Google/Chrome/Profile 4`,
];

const url = process.env.MUSCLE_MAP_URL || 'http://localhost:5174/musclemap';

let data = null;

for (const userDataDir of profilePaths) {
  try {
    const context = await chromium.launchPersistentContext(userDataDir, {
      channel: 'chromium',
      headless: true,
    });
    const page = await context.pages()[0] || (await context.newPage());
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    data = await page.evaluate(() => localStorage.getItem('trainwithnish_muscle_regions'));
    await context.close();
    if (data) break;
  } catch {
    // try next profile
  }
}

if (!data) {
  console.error('No calibration found in browser storage. Open Muscle Map, click Save positions, then run again.');
  process.exit(1);
}

writeFileSync(outPath, JSON.stringify(JSON.parse(data), null, 2));
console.log(`Wrote ${outPath}`);

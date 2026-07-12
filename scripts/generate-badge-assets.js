const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'public', 'imgs', 'badges', 'run4fun');

const icons = [
  ['distance.svg', '#2f80ed', '#56ccf2', 'KM', 'M 37 82 H 63 M 50 30 V 72 M 34 46 L 50 30 L 66 46'],
  ['long-run.svg', '#27ae60', '#6fcf97', 'LR', 'M 28 58 C 38 42 47 74 58 52 C 64 40 70 38 76 44'],
  ['consistency.svg', '#f2994a', '#f2c94c', 'OK', 'M 31 54 L 44 67 L 71 37'],
  ['runner.svg', '#eb5757', '#f2994a', 'RUN', 'M 37 70 L 48 54 L 61 70 M 48 54 L 39 44 M 48 54 L 61 46 M 51 36 A 6 6 0 1 0 51 24 A 6 6 0 0 0 51 36'],
  ['walker.svg', '#219653', '#6fcf97', 'WALK', 'M 41 70 L 48 55 L 58 70 M 48 55 L 43 43 M 48 55 L 59 48 M 50 35 A 6 6 0 1 0 50 23 A 6 6 0 0 0 50 35'],
  ['pace.svg', '#9b51e0', '#bb6bd9', 'PACE', 'M 50 28 A 26 26 0 1 0 76 54 M 50 54 L 66 39'],
  ['explorer.svg', '#00a7a5', '#55d6be', 'MAP', 'M 28 35 L 43 29 L 57 35 L 72 29 V 67 L 57 73 L 43 67 L 28 73 Z M 43 29 V 67 M 57 35 V 73'],
  ['best-effort.svg', '#f2c94c', '#f2994a', 'PR', 'M 33 69 L 50 28 L 67 69 L 50 58 Z'],
  ['streak.svg', '#ff5a5f', '#f2c94c', 'STK', 'M 50 24 C 62 38 70 47 62 62 C 57 72 43 72 38 62 C 31 49 43 42 45 31 C 49 38 52 42 55 47'],
  ['monthly.svg', '#2d9cdb', '#56ccf2', 'MON', 'M 30 35 H 70 V 70 H 30 Z M 30 45 H 70 M 39 29 V 39 M 61 29 V 39'],
  ['race-ready.svg', '#333333', '#828282', 'RACE', 'M 35 31 H 68 L 62 45 L 68 59 H 35 Z M 35 31 V 72'],
];

function svg([fileName, colorA, colorB, label, pathData]) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g" x1="18" y1="18" x2="82" y2="82" gradientUnits="userSpaceOnUse">
      <stop stop-color="${colorA}"/>
      <stop offset="1" stop-color="${colorB}"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="43" fill="url(#g)"/>
  <circle cx="50" cy="50" r="34" fill="#ffffff" opacity="0.92"/>
  <path d="${pathData}" fill="none" stroke="${colorA}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="50" y="88" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#17252f">${label}</text>
</svg>
`;
}

fs.mkdirSync(outputDir, { recursive: true });
icons.forEach(icon => fs.writeFileSync(path.join(outputDir, icon[0]), svg(icon)));

console.log(`Generated ${icons.length} badge icons in ${outputDir}`);

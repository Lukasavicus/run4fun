const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'public', 'imgs', 'collectibles', 'nerd');

const themes = [
  ['super-heroes', '#f94144', '#277da1'],
  ['space-opera', '#577590', '#f9c74f'],
  ['retro-games', '#43aa8b', '#f3722c'],
  ['fantasy-rpg', '#90be6d', '#4d908e'],
  ['sci-fi-relics', '#7209b7', '#3a0ca3'],
];

const symbols = ['★', '✦', '◆', '⬢', '▲', '●', '✚', '⌁', '⚡', '◇'];

function svg(theme, title, symbol, colorA, colorB) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
  <rect width="320" height="320" rx="28" fill="${colorA}"/>
  <circle cx="258" cy="62" r="76" fill="${colorB}" opacity=".42"/>
  <circle cx="64" cy="264" r="92" fill="#ffffff" opacity=".16"/>
  <rect x="28" y="28" width="264" height="264" rx="22" fill="none" stroke="#ffffff" stroke-width="10" opacity=".72"/>
  <text x="160" y="146" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="94" fill="#ffffff">${symbol}</text>
  <text x="160" y="214" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" fill="#ffffff">${title}</text>
  <text x="160" y="248" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="#ffffff" opacity=".82">${theme}</text>
</svg>
`;
}

fs.mkdirSync(outputDir, { recursive: true });

themes.forEach(([theme, colorA, colorB], themeIndex) => {
  for (let idx = 1; idx <= 10; idx++) {
    const title = `${theme.split('-').map(part => part[0].toUpperCase() + part.slice(1)).join(' ')} ${idx}`;
    const fileName = `${theme}-${String(idx).padStart(2, '0')}.svg`;
    const symbol = symbols[(themeIndex + idx - 1) % symbols.length];
    fs.writeFileSync(path.join(outputDir, fileName), svg(theme, title, symbol, colorA, colorB));
  }
});

console.log(`Generated ${themes.length * 10} collectible SVGs in ${outputDir}`);

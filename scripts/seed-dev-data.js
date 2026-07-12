const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

require('../app/models/badges');
require('../app/models/collectibles');
require('../app/models/activities');
require('../app/models/transactions');
require('../app/models/users');

const Badge = mongoose.model('Badge');
const Collectible = mongoose.model('Collectible');
const Activity = mongoose.model('Activity');
const Transaction = mongoose.model('Transaction');
const User = mongoose.model('User');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/run4fun';

const gotCollectibles = [
  ['Game of Thrones', 'stark', 'House Stark', 'Winter is coming.', 120],
  ['Game of Thrones', 'lannister', 'House Lannister', 'Hear me roar.', 140],
  ['Game of Thrones', 'targaryen', 'House Targaryen', 'Fire and blood.', 160],
  ['Game of Thrones', 'baratheon', 'House Baratheon', 'Ours is the fury.', 110],
  ['Game of Thrones', 'greyjoy', 'House Greyjoy', 'We do not sow.', 90],
  ['Game of Thrones', 'tyrell', 'House Tyrell', 'Growing strong.', 100],
  ['Game of Thrones', 'martell', 'House Martell', 'Unbowed, unbent, unbroken.', 130],
  ['Game of Thrones', 'arryn', 'House Arryn', 'As high as honor.', 100],
  ['Game of Thrones', 'tully', 'House Tully', 'Family, duty, honor.', 95],
  ['Game of Thrones', 'houses', 'Great Houses', 'A complete set of Westeros houses.', 250],
];

const nerdCollections = [
  ['Super Heroes', ['Arc Reactor', 'Web Slinger', 'Cosmic Shield', 'Thunder Hammer', 'Mystic Cape', 'Quantum Helmet', 'Gamma Pulse', 'Panther Mask', 'Star Archer', 'Night Sentinel']],
  ['Space Opera', ['Twin Suns', 'Laser Blade', 'Starfighter', 'Droid Buddy', 'Galaxy Map', 'Rebel Medal', 'Asteroid Smuggler', 'Moon Base', 'Hyperspace Ring', 'Planet Crown']],
  ['Retro Games', ['Pixel Sword', 'Arcade Token', 'Boss Key', 'Mana Potion', '8 Bit Heart', 'Speed Boots', 'Golden Cartridge', 'High Score Crown', 'Glitch Cube', 'Save Point']],
  ['Fantasy RPG', ['Dragon Egg', 'Wizard Staff', 'Crystal Orb', 'Elven Bow', 'Dwarf Axe', 'Quest Scroll', 'Phoenix Feather', 'Knight Helm', 'Moon Amulet', 'Goblet of XP']],
  ['Sci Fi Relics', ['Time Crystal', 'Neon Visor', 'Plasma Core', 'Orbit Drone', 'Holo Deck', 'Gravity Boots', 'Nano Cube', 'Star Compass', 'Warp Cell', 'Rocket Badge']],
];

function totalDistanceCriteria(km) {
  return `(activities) => activities.reduce((total, activity) => total + Number(activity.route_distance || 0), 0) >= ${km}`;
}

function singleDistanceCriteria(km) {
  return `(activities) => activities.some(activity => Number(activity.route_distance || 0) >= ${km})`;
}

function activityCountCriteria(count, type) {
  if(!type) return `(activities) => activities.length >= ${count}`;
  return `(activities) => activities.filter(activity => activity.physical_activity == '${type}').length >= ${count}`;
}

function paceCriteria(pace) {
  return `(activities) => activities.filter(activity => { const d = Number(activity.route_distance || 0); const p = String(activity.time || '00:00:00').split(':').map(Number); const s = (p[0] || 0) * 3600 + (p[1] || 0) * 60 + (p[2] || 0); return d >= 3 && s > 0 && (s / 60) / d <= ${pace}; }).length >= 1`;
}

function placesCriteria(count) {
  return `(activities) => new Set(activities.map(activity => activity.place).filter(Boolean)).size >= ${count}`;
}

function monthlyDistanceCriteria(km) {
  return `(activities) => Object.values(activities.reduce((months, activity) => { const d = new Date(activity.date); if(isNaN(d)) return months; const key = d.getUTCFullYear() + '-' + d.getUTCMonth(); months[key] = (months[key] || 0) + Number(activity.route_distance || 0); return months; }, {})).some(total => total >= ${km})`;
}

function weeklyRunsCriteria(count) {
  return `(activities) => Object.values(activities.filter(activity => activity.physical_activity == 'running').reduce((weeks, activity) => { const d = new Date(activity.date); if(isNaN(d)) return weeks; const day = (d.getUTCDay() + 6) % 7; const monday = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - day)); const key = monday.toISOString().slice(0, 10); weeks[key] = (weeks[key] || 0) + 1; return weeks; }, {})).some(total => total >= ${count})`;
}

function consecutiveDaysCriteria(count) {
  return `(activities) => { const days = Array.from(new Set(activities.map(activity => new Date(activity.date)).filter(d => !isNaN(d)).map(d => d.toISOString().slice(0, 10)))).sort(); let best = 0; let streak = 0; let previous = null; days.forEach(day => { const current = new Date(day + 'T00:00:00Z').getTime(); streak = previous !== null && current - previous == 86400000 ? streak + 1 : 1; previous = current; if(streak > best) best = streak; }); return best >= ${count}; }`;
}

function iconPath(icon) {
  return `imgs/badges/run4fun/${icon}`;
}

function badge(title, group, icon, value, description, criteria, sortOrder) {
  return {
    title,
    group,
    icon: iconPath(icon),
    value,
    description,
    criteria,
    sort_order: sortOrder,
  };
}

function buildBadgeSeeds() {
  let seeds = [];
  let sortOrder = 1;
  const add = (title, group, icon, value, description, criteria) => {
    seeds.push(badge(title, group, icon, Math.max(1, Math.round(value || 1)), description, criteria, sortOrder++));
  };

  [1, 3, 5, 10, 15, 21, 30, 42, 50, 75, 100, 150, 200, 250, 300, 400, 500, 750, 1000, 1500]
    .forEach(km => add(`Distance ${km}km`, 'Distance', 'distance.svg', km, `Run ${km}km in total`, totalDistanceCriteria(km)));

  [1, 2, 3, 5, 8, 10, 12, 15, 18, 21, 25, 30, 35, 42, 50]
    .forEach(km => add(`Long Run ${km}km`, 'Long run', 'long-run.svg', km, `Complete one activity with at least ${km}km`, singleDistanceCriteria(km)));

  [1, 2, 3, 5, 7, 10, 14, 20, 25, 30, 40, 50, 75, 100, 150]
    .forEach(count => add(`Consistency ${count}`, 'Consistency', 'consistency.svg', count, `Log ${count} activities`, activityCountCriteria(count)));

  [1, 2, 3, 5, 7, 10, 14, 20, 25, 30, 40, 50]
    .forEach(count => add(`Runner ${count}`, 'Running', 'runner.svg', count, `Log ${count} running activities`, activityCountCriteria(count, 'running')));

  [1, 2, 3, 5, 7, 10, 14, 20, 25, 30, 40, 50]
    .forEach(count => add(`Walker ${count}`, 'Walking', 'walker.svg', count, `Log ${count} walking activities`, activityCountCriteria(count, 'walking')));

  [9, 8, 7, 6, 5, 4]
    .forEach(pace => add(`Pace ${pace}`, 'Pace', 'pace.svg', 10 - pace, `Finish a 3km+ activity under ${pace} min/km`, paceCriteria(pace)));

  [2, 3, 4, 5, 7, 10, 15, 20, 25, 30]
    .forEach(count => add(`Explorer ${count}`, 'Explorer', 'explorer.svg', count, `Run in ${count} different places`, placesCriteria(count)));

  [
    ['Best Effort 400m', 0.4],
    ['Best Effort 800m', 0.8],
    ['Best Effort 1K', 1],
    ['Best Effort 1.5K', 1.5],
    ['Best Effort 3K', 3],
    ['Best Effort 5K', 5],
    ['Best Effort 10K', 10],
    ['Best Effort 15K', 15],
    ['Best Effort 20K', 20],
    ['Best Effort 21K', 21.1],
    ['Best Effort 30K', 30],
    ['Best Effort 42K', 42.2],
    ['Best Effort 50K', 50],
  ].forEach(([title, km]) => add(title, 'Best efforts', 'best-effort.svg', km, `Complete the benchmark distance: ${title.replace('Best Effort ', '')}`, singleDistanceCriteria(km)));

  [3, 5, 7].forEach(count => add(`${count}x Weekly Streak`, 'Streaks', 'streak.svg', count, `Run ${count} times in the same week`, weeklyRunsCriteria(count)));
  [2, 3, 5, 7, 10, 14, 21].forEach(count => add(`${count} Day Streak`, 'Streaks', 'streak.svg', count, `Log activities on ${count} consecutive days`, consecutiveDaysCriteria(count)));

  [15, 25, 50, 75, 100, 150, 200, 250, 300, 400]
    .forEach(km => add(`Monthly ${km}km`, 'Monthly challenges', 'monthly.svg', km, `Run ${km}km in one calendar month`, monthlyDistanceCriteria(km)));

  [5, 10, 21, 42, 50, 100]
    .forEach(km => add(`Race Ready ${km}km`, 'Race ready', 'race-ready.svg', km, `Complete a classic ${km}km distance`, singleDistanceCriteria(km)));

  return seeds;
}

function buildCollectibleSeeds() {
  const got = gotCollectibles.map(([serie, slug, title, hist, value]) => ({
    title,
    serie,
    description: `${title} collectible`,
    value,
    icon: `imgs/collectibles/got/${slug}.png`,
    hist,
  }));

  const nerd = nerdCollections.flatMap(([serie, items], collectionIndex) =>
    items.map((item, index) => ({
      title: item,
      serie,
      description: `${item} collectible from ${serie}`,
      value: 80 + collectionIndex * 20 + index * 5,
      icon: `imgs/collectibles/nerd/${serie.toLowerCase().replaceAll(' ', '-')}-${String(index + 1).padStart(2, '0')}.svg`,
      hist: `${item} unlocked from the ${serie} collection.`,
    }))
  );

  return got.concat(nerd);
}

async function upsertBadges() {
  const badgeDir = path.join(__dirname, '..', 'public', 'imgs', 'badges', 'run4fun');
  if(!fs.existsSync(badgeDir)) throw new Error('Run pnpm assets:badges before pnpm seed:dev');

  const badgeSeeds = buildBadgeSeeds();

  await Badge.deleteMany({});

  for (const badge of badgeSeeds) {
    await Badge.updateOne(
      { title: badge.title },
      { $set: badge },
      { upsert: true }
    );
  }
}

async function upsertCollectibles() {
  for (const collectible of buildCollectibleSeeds()) {
    await Collectible.updateOne(
      { title: collectible.title },
      { $set: collectible },
      { upsert: true }
    );
  }
}

async function upsertDemoUser() {
  const existingUser = await User.findOne({ login: 'demo' });

  if (existingUser) {
    await Activity.deleteMany({ _id: { $in: existingUser.activities || [] } });
    await Transaction.deleteMany({ user_id: existingUser._id });
  }

  const collectibles = await Collectible.find({ title: { $in: ['House Stark', 'House Lannister', 'Arc Reactor', 'Laser Blade'] } }).select('_id');

  await User.updateOne(
    { login: 'demo' },
    {
      $set: {
        name: 'Demo Runner',
        email: 'demo@run4fun.local',
        login: 'demo',
        password: 'demo',
        role: 'user',
        balance: 500,
        badges: [],
        collectibles: collectibles.map(collectible => collectible._id),
        activities: [],
      },
    },
    { upsert: true }
  );
}

async function main() {
  await mongoose.connect(mongoUri);

  await upsertBadges();
  await upsertCollectibles();
  await upsertDemoUser();

  const [badges, collectibles, users] = await Promise.all([
    Badge.countDocuments(),
    Collectible.countDocuments(),
    User.countDocuments(),
  ]);

  console.log(`Seeded ${badges} badges, ${collectibles} collectibles, ${users} users.`);
  console.log('Demo login: demo / demo');

  await mongoose.connection.close();
}

main().catch(async err => {
  console.error(err);
  await mongoose.connection.close();
  process.exit(1);
});

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

function totalDistance(activities) {
  return activities.reduce((total, activity) => total + Number(activity.route_distance || 0), 0);
}

function longestRun(activities) {
  return activities.reduce((best, activity) => Math.max(best, Number(activity.route_distance || 0)), 0);
}

function activityCount(activities, type) {
  return activities.filter(activity => !type || activity.physical_activity == type).length;
}

function fastRuns(activities, minDistance, maxMinutesPerKm) {
  return activities.filter(activity => {
    const distance = Number(activity.route_distance || 0);
    const parts = String(activity.time || '00:00:00').split(':').map(Number);
    const seconds = (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);
    return distance >= minDistance && seconds > 0 && (seconds / 60) / distance <= maxMinutesPerKm;
  }).length;
}

const badgeGroups = [
  {
    prefix: 'Distance',
    thresholds: [1, 3, 5, 10, 15, 21, 30, 42, 50, 75, 100, 150, 200, 250, 300, 400, 500, 750, 1000, 1500],
    description: km => `Run ${km}km in total`,
    criteria: km => `(activities) => activities.reduce((total, activity) => total + Number(activity.route_distance || 0), 0) >= ${km}`,
  },
  {
    prefix: 'Long Run',
    thresholds: [1, 2, 3, 5, 8, 10, 12, 15, 18, 21, 25, 30, 35, 42, 50],
    description: km => `Complete one activity with at least ${km}km`,
    criteria: km => `(activities) => activities.some(activity => Number(activity.route_distance || 0) >= ${km})`,
  },
  {
    prefix: 'Consistency',
    thresholds: [1, 2, 3, 5, 7, 10, 14, 20, 25, 30, 40, 50, 75, 100, 150],
    description: count => `Log ${count} activities`,
    criteria: count => `(activities) => activities.length >= ${count}`,
  },
  {
    prefix: 'Runner',
    thresholds: [1, 2, 3, 5, 7, 10, 14, 20, 25, 30, 40, 50],
    description: count => `Log ${count} running activities`,
    criteria: count => `(activities) => activities.filter(activity => activity.physical_activity == 'running').length >= ${count}`,
  },
  {
    prefix: 'Walker',
    thresholds: [1, 2, 3, 5, 7, 10, 14, 20, 25, 30, 40, 50],
    description: count => `Log ${count} walking activities`,
    criteria: count => `(activities) => activities.filter(activity => activity.physical_activity == 'walking').length >= ${count}`,
  },
  {
    prefix: 'Pace',
    thresholds: [9, 8, 7, 6, 5, 4],
    description: pace => `Finish a 3km+ activity under ${pace} min/km`,
    criteria: pace => `(activities) => activities.filter(activity => { const d = Number(activity.route_distance || 0); const p = String(activity.time || '00:00:00').split(':').map(Number); const s = (p[0] || 0) * 3600 + (p[1] || 0) * 60 + (p[2] || 0); return d >= 3 && s > 0 && (s / 60) / d <= ${pace}; }).length >= 1`,
  },
  {
    prefix: 'Explorer',
    thresholds: [2, 3, 4, 5, 7, 10, 15, 20, 25, 30],
    description: count => `Run in ${count} different places`,
    criteria: count => `(activities) => new Set(activities.map(activity => activity.place).filter(Boolean)).size >= ${count}`,
  },
  {
    prefix: 'Race Ready',
    thresholds: [5, 10, 21, 42, 50, 100],
    description: km => `Complete a classic ${km}km distance`,
    criteria: km => `(activities) => activities.some(activity => Number(activity.route_distance || 0) >= ${km})`,
  },
  {
    prefix: 'Comeback',
    thresholds: [2, 4, 6, 8],
    description: count => `Log ${count} activities after starting your journey`,
    criteria: count => `(activities) => activities.length >= ${count}`,
  },
];

function buildBadgeSeeds(iconFiles) {
  let seeds = [];

  badgeGroups.forEach(group => {
    group.thresholds.forEach(threshold => {
      seeds.push({
        title: `${group.prefix} ${threshold}`,
        criteria: group.criteria(threshold),
        icon: `imgs/badges/${iconFiles[seeds.length % iconFiles.length]}`,
        value: Math.max(1, Math.round(Number(threshold) || 1)),
        description: group.description(threshold),
      });
    });
  });

  return seeds.slice(0, 101);
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
  const badgeDir = path.join(__dirname, '..', 'public', 'imgs', 'badges');
  const badgeFiles = fs.readdirSync(badgeDir).filter(file => file.endsWith('.svg')).sort();
  const badgeSeeds = buildBadgeSeeds(badgeFiles);

  await Badge.deleteMany({ criteria: /^Unlock / });

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

  const badges = await Badge.find().sort({ title: 1 }).limit(8).select('_id');
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
        badges: badges.map(badge => badge._id),
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

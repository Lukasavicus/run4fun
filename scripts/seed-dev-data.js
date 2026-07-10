const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

require('../app/models/badges');
require('../app/models/collectibles');
require('../app/models/users');

const Badge = mongoose.model('Badge');
const Collectible = mongoose.model('Collectible');
const User = mongoose.model('User');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/run4fun';

const collectibleSeeds = [
  ['stark', 'House Stark', 'Winter is coming.', 120],
  ['lannister', 'House Lannister', 'Hear me roar.', 140],
  ['targaryen', 'House Targaryen', 'Fire and blood.', 160],
  ['baratheon', 'House Baratheon', 'Ours is the fury.', 110],
  ['greyjoy', 'House Greyjoy', 'We do not sow.', 90],
  ['tyrell', 'House Tyrell', 'Growing strong.', 100],
  ['martell', 'House Martell', 'Unbowed, unbent, unbroken.', 130],
  ['arryn', 'House Arryn', 'As high as honor.', 100],
  ['tully', 'House Tully', 'Family, duty, honor.', 95],
  ['houses', 'Great Houses', 'A complete set of Westeros houses.', 250],
];

function titleFromBadgeFile(file) {
  return file
    .replace(/^\d+-?/, '')
    .replace(/\.svg$/, '')
    .split('-')
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

async function upsertBadges() {
  const badgeDir = path.join(__dirname, '..', 'public', 'imgs', 'badges');
  const badgeFiles = fs.readdirSync(badgeDir).filter(file => file.endsWith('.svg')).sort();

  for (const file of badgeFiles) {
    const title = titleFromBadgeFile(file);
    await Badge.updateOne(
      { title },
      {
        $set: {
          title,
          criteria: `Unlock ${title}`,
          icon: `imgs/badges/${file}`,
          value: '0',
          description: `${title} badge`,
        },
      },
      { upsert: true }
    );
  }
}

async function upsertCollectibles() {
  for (const [slug, title, hist, value] of collectibleSeeds) {
    await Collectible.updateOne(
      { title },
      {
        $set: {
          title,
          serie: 'Game of Thrones',
          description: `${title} collectible`,
          value,
          icon: `imgs/collectibles/got/${slug}.png`,
          hist,
        },
      },
      { upsert: true }
    );
  }
}

async function upsertDemoUser() {
  const badges = await Badge.find().sort({ title: 1 }).limit(5).select('_id');
  const collectibles = await Collectible.find({ title: { $in: ['House Stark', 'House Lannister'] } }).select('_id');

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

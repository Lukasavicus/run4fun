const base = process.env.BASE_URL || 'http://localhost:3000';

async function json(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch (err) {
    return text;
  }
}

async function main() {
  const login = await fetch(base + '/autenticar', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({login: 'demo', password: 'demo'}),
  });

  if (!login.ok) throw new Error('login failed ' + login.status);

  const token = login.headers.get('x-access-token');
  const headers = {'Content-Type': 'application/json', 'x-access-token': token};
  const userBefore = await json(await fetch(base + '/v1/user', {headers}));

  const activityRes = await fetch(base + '/v1/activities', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      date: new Date().toISOString(),
      physical_activity: 'running',
      place: 'Smoke Test Track',
      route_distance: 300,
      time: '05:00:00',
    }),
  });

  if (!activityRes.ok) throw new Error('create activity failed ' + activityRes.status);

  const created = await json(activityRes);
  const activityId = created.activity._id;
  const collectibles = await json(await fetch(base + '/v1/users/collectibles', {headers}));
  const userAfterRun = await json(await fetch(base + '/v1/user', {headers}));
  let availableBalance = userAfterRun.balance;
  const buyTargets = [];

  collectibles.filter(c => !c.owned).sort((a, b) => b.value - a.value).forEach(collectible => {
    if (collectible.value <= availableBalance) {
      buyTargets.push(collectible);
      availableBalance -= collectible.value;
    }
  });

  for (const collectible of buyTargets) {
    const res = await fetch(base + '/v1/collectible/purchase/' + collectible._id, {headers});
    if (!res.ok && res.status !== 403 && res.status !== 409) throw new Error('purchase failed ' + res.status);
  }

  const editRes = await fetch(base + '/v1/activities/' + activityId, {
    method: 'PUT',
    headers,
    body: JSON.stringify({route_distance: 1}),
  });

  if (!editRes.ok) throw new Error('edit activity failed ' + editRes.status + ' ' + await editRes.text());

  const userAfter = await json(await fetch(base + '/v1/user', {headers}));
  const txs = await json(await fetch(base + '/v1/transactions', {headers}));
  const reversedPurchases = txs.filter(t => t.status === 'reverted').length;

  console.log(JSON.stringify({
    login: userBefore.login,
    balanceBefore: userBefore.balance,
    balanceAfter: userAfter.balance,
    transactions: txs.length,
    reversedPurchases,
  }, null, 2));

  if (userAfter.balance < 0) throw new Error('balance stayed negative after purchase undo');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

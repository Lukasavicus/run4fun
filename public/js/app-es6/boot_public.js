function dateToText(dateText) {
    const date = new Date(dateText);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}/${date.getFullYear()}`;
}

function grouped(items, field) {
    return items.reduce((groups, item) => {
        const key = item[field] || 'General';
        groups[key] = groups[key] || [];
        groups[key].push(item);
        return groups;
    }, {});
}

function renderCards(items, field) {
    const groups = grouped(items, field);
    return Object.keys(groups).map(group => `
        <div class="collectible-group">
            <h3>${group}</h3>
            <div class="collectible-grid">
                ${groups[group].map(item => `
                    <div class="collectible owned">
                        <img src="${item.icon}" class="collectible-img" alt="${item.title}">
                        <p class="collectible-title">${item.title}</p>
                        <p class="collectible-description">${item.description || item.hist || ''}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function renderProfile(profile) {
    document.querySelector("#public-profile").innerHTML = `
        <section class="section-title">
            <div class="section-header">
                <p>${profile.name}</p>
                <span class="muted">@${profile.login}</span>
            </div>

            ${profile.kpis ? `
                <div class="admin-kpis">
                    <div><span>Total distance</span><strong>${profile.kpis.total_distance} km</strong></div>
                    <div><span>Total time</span><strong>${profile.kpis.total_time}</strong></div>
                    <div><span>Longest run</span><strong>${profile.kpis.max_distance} km</strong></div>
                    <div><span>Activities</span><strong>${profile.kpis.activities_count}</strong></div>
                </div>
            ` : ''}

            ${profile.runs && profile.runs.length ? `
                <table>
                    <thead>
                        <tr><th>Date</th><th>Activity</th><th>Place</th><th>Distance</th><th>Time</th></tr>
                    </thead>
                    <tbody>
                        ${profile.runs.map(run => `
                            <tr>
                                <td>${dateToText(run.date)}</td>
                                <td>${run.physical_activity}</td>
                                <td>${run.place}</td>
                                <td>${run.route_distance} km</td>
                                <td>${run.time}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            ` : ''}
        </section>

        ${profile.badges && profile.badges.length ? `
            <section class="section-title">
                <div class="section-header"><p>Badges</p></div>
                ${renderCards(profile.badges, 'group')}
            </section>
        ` : ''}

        ${profile.collectibles && profile.collectibles.length ? `
            <section class="section-title">
                <div class="section-header"><p>Collectibles</p></div>
                ${renderCards(profile.collectibles, 'serie')}
            </section>
        ` : ''}
    `;
}

function search(login) {
    const profile = document.querySelector("#public-profile");
    if(!login) return;

    profile.innerHTML = `
        <section class="section-title">
            <div class="empty-state">
                <p>Loading profile...</p>
            </div>
        </section>
    `;

    fetch(`/public/${encodeURIComponent(login)}`)
        .then(res => {
            if(!res.ok) throw new Error('Profile not found');
            return res.json();
        })
        .then(renderProfile)
        .catch(error => {
            profile.innerHTML = `
                <section class="section-title">
                    <div class="empty-state">
                        <p>${error.message}</p>
                        <span>Check the runner login and try again.</span>
                    </div>
                </section>
            `;
        });
}

document.querySelector("#public-search-form").addEventListener('submit', event => {
    event.preventDefault();
    search(document.querySelector("#public-login").value.trim());
});

const params = new URLSearchParams(window.location.search);
if(params.get('login')) {
    document.querySelector("#public-login").value = params.get('login');
    search(params.get('login'));
}

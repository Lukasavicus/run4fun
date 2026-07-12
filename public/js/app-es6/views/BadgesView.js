import {View} from './View';

export class BadgesView extends View {

    constructor(HTMLElement){
        super(HTMLElement);
    }

    template(model){
        const earnedBadges = model.badgeList.badges.filter(badge => badge.earned);
        const groups = model.badgeList.badges.reduce((badgesByGroup, badge) => {
            const group = badge.group || 'General';
            badgesByGroup[group] = badgesByGroup[group] || [];
            badgesByGroup[group].push(badge);
            return badgesByGroup;
        }, {});

        return `
            <div class="badge-toolbar">
                <button class="badge-filter active" type="button" onclick="this.closest('#badges').dataset.filter='all'; this.parentNode.querySelectorAll('.badge-filter').forEach(button => button.classList.remove('active')); this.classList.add('active')">All</button>
                <button class="badge-filter" type="button" onclick="this.closest('#badges').dataset.filter='earned'; this.parentNode.querySelectorAll('.badge-filter').forEach(button => button.classList.remove('active')); this.classList.add('active')">Earned</button>
            </div>

            ${earnedBadges.length == 0 ? `
                <div class="empty-state">
                    <p>No badges earned yet.</p>
                    <span>Register runs to unlock the colored versions of these badges.</span>
                </div>
            ` : ''}

            ${Object.keys(groups).map(group => `
                <div class="badge-group">
                    <h3>${group}</h3>
                    <div class="badge-grid">
                        ${groups[group]
                            .sort((a, b) => Number(b.earned) - Number(a.earned) || a.title.localeCompare(b.title))
                            .map(badge => `
                                <div class="badge ${badge.earned ? 'earned' : 'blocked'}">
                                    <span class="badge-status">${badge.earned ? 'Earned' : 'Blocked'}</span>
                                    <img src="${badge.icon}" class="badge-img" alt="${badge.title}">
                                    <p class="badge-title">${badge.title}</p>
                                    <p class="badge-description">${badge.description}</p>
                                </div>
                            `).join('')}
                    </div>
                </div>
            `).join('')}
        `;
    }
}

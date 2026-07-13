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
                            .map(badge => {
                                const earnedAt = badge.earnedAt ? new Date(badge.earnedAt).toLocaleDateString() : '';
                                const points = badge.earnedValue || badge.value;

                                return `
                                <button class="badge ${badge.earned ? 'earned' : 'blocked'}" type="button" onclick="document.getElementById('badge-modal-${badge.id}').showModal()">
                                    <span class="badge-status">${badge.earned ? 'Earned' : 'Blocked'}</span>
                                    <img src="${badge.icon}" class="badge-img" alt="${badge.title}">
                                    <span class="badge-title">${badge.title}</span>
                                    <span class="badge-description">${badge.description}</span>
                                </button>
                                <dialog class="badge-modal" id="badge-modal-${badge.id}">
                                    <div class="badge-modal-header">
                                        <img src="${badge.icon}" alt="${badge.title}">
                                        <div>
                                            <h4>${badge.title}</h4>
                                            <p>${badge.group}</p>
                                        </div>
                                    </div>
                                    <p class="badge-modal-text">${badge.description}</p>
                                    <p class="badge-modal-text">${badge.earned ? `Earned on ${earnedAt}. This badge yielded ${points}⚡.` : `Reward: ${badge.value}⚡. Keep training to unlock it.`}</p>
                                    <form method="dialog">
                                        <button type="submit">Close</button>
                                    </form>
                                </dialog>
                            `;
                            }).join('')}
                    </div>
                </div>
            `).join('')}
        `;
    }
}

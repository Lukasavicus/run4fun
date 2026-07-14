import {View} from './View';

export class AdminView extends View {

    constructor(HTMLElement){
        super(HTMLElement);
    }

    _list(items){
        if(!items || items.length == 0) return '<p class="muted">No data yet.</p>';

        return `
            <ul class="admin-list">
                ${items.slice(0, 12).map(item => `<li><span>${item.title}</span><strong>${item.count}</strong></li>`).join('')}
            </ul>
        `;
    }

    template(model){
        if(model.role != 'admin') {
            return `
                <div class="empty-state">
                    <p>Admin area</p>
                    <span>Login with an admin account to see app-wide metrics.</span>
                </div>
            `;
        }

        if(!model.adminSummary) {
            return `
                <div class="empty-state">
                    <p>Admin data not loaded yet.</p>
                    <span>Use the refresh button to load the app summary.</span>
                </div>
                <button id="refresh-admin" type="button">Refresh admin data</button>
            `;
        }

        const summary = model.adminSummary;

        return `
            <div class="admin-kpis">
                <div><span>Users</span><strong>${summary.totals.users}</strong></div>
                <div><span>Activities</span><strong>${summary.totals.activities}</strong></div>
                <div><span>Distance</span><strong>${summary.totals.distance} km</strong></div>
                <div><span>Badges</span><strong>${summary.totals.badges_unlocked}</strong></div>
                <div><span>Collectibles</span><strong>${summary.totals.collectibles_bought}</strong></div>
            </div>

            <button id="refresh-admin" type="button">Refresh admin data</button>

            <div class="admin-columns">
                <div>
                    <h3>Collectibles bought</h3>
                    ${this._list(summary.collectible_purchases)}
                </div>
                <div>
                    <h3>Badges unlocked</h3>
                    ${this._list(summary.badge_unlocks)}
                </div>
            </div>

            <table id="admin-users-table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Role</th>
                        <th>Balance</th>
                        <th>Runs</th>
                        <th>Km</th>
                        <th>Badges</th>
                        <th>Collectibles</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${summary.users.map(user => `
                        <tr>
                            <td>${user.login}<br><span class="muted">${user.email}</span></td>
                            <td>${user.role}</td>
                            <td>${user.balance} ⚡</td>
                            <td>${user.activities_count}</td>
                            <td>${user.total_distance}</td>
                            <td>${user.badges_count}</td>
                            <td>${user.collectibles_count}</td>
                            <td>${user.role == 'admin' ? '' : `<button class="table-action danger admin-delete-user" data-user-id="${user._id}" type="button">delete</button>`}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
}

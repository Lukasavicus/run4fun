import {View} from './View';
import {TimeHelper} from '../helpers/TimeHelper';

export class AnalyticsView extends View {

    constructor(HTMLElement){
        super(HTMLElement);
    }

    _dateKey(date){
        return date.toISOString().slice(0, 10);
    }

    _periodKey(date, period){
        const year = date.getFullYear();
        const month = date.getMonth();

        if(period == 'day') return this._dateKey(date);
        if(period == 'week') {
            const monday = new Date(date);
            monday.setDate(date.getDate() - ((date.getDay() + 6) % 7));
            return `Week of ${this._dateKey(monday)}`;
        }
        if(period == 'bimester') return `${year} B${parseInt(month / 2) + 1}`;
        if(period == 'quarter') return `${year} Q${parseInt(month / 3) + 1}`;
        if(period == 'quadrimester') return `${year} 4M${parseInt(month / 4) + 1}`;
        if(period == 'semester') return `${year} S${parseInt(month / 6) + 1}`;
        if(period == 'year') return `${year}`;

        return `${year}-${String(month + 1).padStart(2, '0')}`;
    }

    _filteredActivities(model){
        const from = model.analyticsFrom ? new Date(`${model.analyticsFrom}T00:00:00`) : null;
        const to = model.analyticsTo ? new Date(`${model.analyticsTo}T23:59:59`) : null;

        return model.activities.filter(activity => {
            const date = activity.date;
            if(from && date < from) return false;
            if(to && date > to) return false;
            return true;
        });
    }

    _monthDays(model, activities){
        const base = model.analyticsTo ? new Date(`${model.analyticsTo}T00:00:00`) : new Date();
        const year = base.getFullYear();
        const month = base.getMonth();
        const lastDay = new Date(year, month + 1, 0).getDate();
        const counts = activities.reduce((days, activity) => {
            const date = activity.date;
            if(date.getFullYear() == year && date.getMonth() == month) {
                const key = date.getDate();
                days[key] = (days[key] || 0) + 1;
            }
            return days;
        }, {});

        return Array.from({length: lastDay}, (_, index) => {
            const day = index + 1;
            return {day, count: counts[day] || 0};
        });
    }

    template(model){
        const activities = this._filteredActivities(model);
        const totals = activities.reduce((periods, activity) => {
            const key = this._periodKey(activity.date, model.analyticsPeriod);
            periods[key] = periods[key] || {distance: 0, seconds: 0};
            periods[key].distance += Number(activity.route_distance || 0);
            periods[key].seconds += TimeHelper.getNumberSeconds(activity.time);
            return periods;
        }, {});
        const rows = Object.keys(totals).sort().map(key => ({
            key,
            distance: totals[key].distance,
            seconds: totals[key].seconds,
        }));
        const maxDistance = rows.reduce((max, row) => row.distance > max ? row.distance : max, 0);
        const maxRuns = this._monthDays(model, activities).reduce((max, day) => day.count > max ? day.count : max, 0);

        return `
            <div class="analytics-controls">
                <label>Group by
                    <select id="analytics-period">
                        ${[
                            ['day', 'Day'],
                            ['week', 'Week'],
                            ['month', 'Month'],
                            ['bimester', 'Bimester'],
                            ['quarter', 'Quarter'],
                            ['quadrimester', 'Quadrimester'],
                            ['semester', 'Semester'],
                            ['year', 'Year'],
                        ].map(([value, label]) => `<option value="${value}" ${model.analyticsPeriod == value ? 'selected' : ''}>${label}</option>`).join('')}
                    </select>
                </label>
                <label>From
                    <input type="date" id="analytics-from" value="${model.analyticsFrom}">
                </label>
                <label>To
                    <input type="date" id="analytics-to" value="${model.analyticsTo}">
                </label>
            </div>

            ${rows.length == 0 ? `
                <div class="empty-state">
                    <p>No activities for this period.</p>
                    <span>Change the filters or add new runs to see analytics.</span>
                </div>
            ` : `
                <div class="analytics-bars">
                    ${rows.map(row => `
                        <div class="analytics-row">
                            <span>${row.key}</span>
                            <div class="analytics-bar-track">
                                <div class="analytics-bar" style="width:${maxDistance ? Math.max(6, row.distance / maxDistance * 100) : 0}%"></div>
                            </div>
                            <strong>${row.distance.toFixed(2)} km</strong>
                            <em>${TimeHelper.timeToText(0, 0, row.seconds)}</em>
                        </div>
                    `).join('')}
                </div>
            `}

            <div class="heatmap">
                <h3>Monthly run calendar</h3>
                <div class="heatmap-grid">
                    ${this._monthDays(model, activities).map(day => `
                        <span class="heatmap-day level-${maxRuns ? Math.ceil(day.count / maxRuns * 4) : 0}" title="${day.count} runs">${day.day}</span>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

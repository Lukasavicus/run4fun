import {View} from './View';

export class SettingsView extends View {

    constructor(HTMLElement){
        super(HTMLElement);
    }

    template(model){
        const settings = model.publicSettings;
        const publicUrl = `${window.location.origin}/public.html?login=${encodeURIComponent(model.login)}`;

        return `
            <form id="public-settings-form" class="settings-form">
                <div>
                    <h3>Public profile</h3>
                    <p>Your public page: <a href="${publicUrl}" target="_blank">${publicUrl}</a></p>
                </div>

                <label><input type="checkbox" id="public-kpis" ${settings.kpis ? 'checked' : ''}> Show KPIs</label>
                <label><input type="checkbox" id="public-runs" ${settings.runs ? 'checked' : ''}> Show runs</label>
                <label><input type="checkbox" id="public-badges" ${settings.badges ? 'checked' : ''}> Show badges</label>
                <label><input type="checkbox" id="public-collectibles" ${settings.collectibles ? 'checked' : ''}> Show collectibles</label>

                <button type="submit">Save settings</button>
            </form>
        `;
    }
}

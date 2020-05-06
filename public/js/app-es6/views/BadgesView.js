import {View} from './View';

export class BadgesView extends View {

    constructor(HTMLElement){
        super(HTMLElement);
    }

    template(model){
        return `
            ${model.badges.map(badge => `
                <div class="badge true">
                    <img src="${badge.icon}" "="" class="badge-img">
                    <p class="badge-title">${badge.title}</p>
                </div>
            `).join('')}
        `;
    }
}
import {View} from './View';

export class CollectiblesView extends View {

    constructor(HTMLElement){
        super(HTMLElement);
    }

    template(model){
        return `
            ${model.collectibleList.collectibles.map(collectible => `
                <div class="collectible">
                    <!--
                        <p class="collectible-description">Stark's House</p>
                        <p class="collectible-description">Winter's comming</p>
                    -->
                    <img src="${collectible.icon}" class="collectible-img">
                    <p class="collectible-description">${collectible.description}</p>
                </div>
            `).join('')}
        `;
    }
}
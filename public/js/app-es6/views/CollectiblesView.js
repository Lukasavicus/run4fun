import {View} from './View';

export class CollectiblesView extends View {

    constructor(HTMLElement){
        super(HTMLElement);
    }

    template(model){
        return `
            ${model.collectibleList.collectibles.map(collectible => `
                <div class="collectible ${collectible.owned ? '' : 'not-purchased'}" title="${collectible.owned ? collectible.description : 'This Collectible costs: '+collectible.price + '⚡'}" >
                    <!--
                        <p class="collectible-description">Stark's House</p>
                        <p class="collectible-description">Winter's comming</p>
                    -->
                    <img src="${collectible.icon}" class="collectible-img">
                    <p class="collectible-description">${collectible.owned ? collectible.hist : ''}</p>
                </div>
            `).join('')}
        `;
    }
}
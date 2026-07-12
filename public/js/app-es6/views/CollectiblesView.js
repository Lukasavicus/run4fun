import {View} from './View';

export class CollectiblesView extends View {

    constructor(HTMLElement){
        super(HTMLElement);
    }

    template(model){
        const ownedCollectibles = model.collectibleList.collectibles.filter(collectible => collectible.owned);

        return `
            ${ownedCollectibles.length == 0 ? `
                <div class="empty-state">
                    <p>No collectibles owned yet.</p>
                    <span>Use your points to buy your first collectible from the shop.</span>
                </div>
            ` : ''}

            ${model.collectibleList.collectibles.map(collectible => `
                <div id="${collectible.id}" data-price=${collectible.price} data-serie=${collectible.serie} class="collectible ${collectible.owned ? '' : 'not-purchased'}" title="${collectible.owned ? collectible.description : 'This Collectible costs: '+collectible.price + '⚡'}" >
                    <img src="${collectible.icon}" class="collectible-img">
                    <p class="collectible-description">${collectible.owned ? collectible.hist : ''}</p>
                </div>
            `).join('')}
        `;
    }
}

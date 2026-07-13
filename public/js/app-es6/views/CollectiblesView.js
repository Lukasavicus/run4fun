import {View} from './View';

export class CollectiblesView extends View {

    constructor(HTMLElement){
        super(HTMLElement);
    }

    template(model){
        const ownedCollectibles = model.collectibleList.collectibles.filter(collectible => collectible.owned);
        const groups = model.collectibleList.collectibles.reduce((collectiblesBySerie, collectible) => {
            const serie = collectible.serie || 'General';
            collectiblesBySerie[serie] = collectiblesBySerie[serie] || [];
            collectiblesBySerie[serie].push(collectible);
            return collectiblesBySerie;
        }, {});

        return `
            <div class="item-toolbar">
                <button class="item-filter active" type="button" onclick="this.closest('#collectibles').dataset.filter='all'; this.parentNode.querySelectorAll('.item-filter').forEach(button => button.classList.remove('active')); this.classList.add('active')">All</button>
                <button class="item-filter" type="button" onclick="this.closest('#collectibles').dataset.filter='bought'; this.parentNode.querySelectorAll('.item-filter').forEach(button => button.classList.remove('active')); this.classList.add('active')">Bought</button>
            </div>

            ${ownedCollectibles.length == 0 ? `
                <div class="empty-state collectible-empty-bought">
                    <p>No collectibles owned yet.</p>
                    <span>Use your points to buy your first collectible from the shop.</span>
                </div>
            ` : ''}

            ${Object.keys(groups).map(serie => `
                <div class="collectible-group ${groups[serie].some(collectible => collectible.owned) ? '' : 'no-owned'}">
                    <h3>${serie}</h3>
                    <div class="collectible-grid">
                        ${groups[serie]
                            .sort((a, b) => Number(b.owned) - Number(a.owned) || a.title.localeCompare(b.title))
                            .map(collectible => `
                                <div id="${collectible.id}" data-title="${collectible.title}" data-icon="${collectible.icon}" data-price="${collectible.price}" data-serie="${collectible.serie}" data-hist="${collectible.hist}" data-description="${collectible.description}" class="collectible ${collectible.owned ? 'owned' : 'not-purchased'}" title="${collectible.owned ? collectible.description : 'This Collectible costs: '+collectible.price + '⚡'}" >
                                    <span class="collectible-status">${collectible.owned ? 'Bought' : `${collectible.price}⚡`}</span>
                                    <img src="${collectible.icon}" class="collectible-img" alt="${collectible.title}">
                                    <p class="collectible-title">${collectible.title}</p>
                                    <p class="collectible-description">${collectible.owned ? collectible.hist : collectible.description}</p>
                                </div>
                            `).join('')}
                    </div>
                </div>
            `).join('')}
        `;
    }
}

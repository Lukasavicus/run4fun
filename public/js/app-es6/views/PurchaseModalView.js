import {View} from './View';

export class PurchaseModalView extends View {

    constructor(HTMLElement){
        super(HTMLElement);
    }

    template(model){
        return `
            <div class="modal-header">
                <p style="display: inline;">Purchase Collectible</p>
                <span class="modal-close">&times</span>
            </div>
            <div class="modal-body">
                <form class="form" action="?" method="post" id="?">
                    <div class="collectible" title="${model.description}" >
                        <img src="${model.icon}" class="collectible-img">
                        <p class="collectible-description">${model.hist}</p>
                    </div>
                    <div class="price-div">
                        <span class="price-content">
                            cost: ${model.price}⚡
                        </span>
                    </div>
                    <div style="text-align: center;">
                        <button type="submit">Purchase</button>
                        <button type="submit">Dismiss</button>
                    </div>
                </form>
            </div>
        `;
    }
}
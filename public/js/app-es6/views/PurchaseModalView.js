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
                <form class="form" action="v1/collectibles/${model.id}" id="purchase-modal-form" >
                    <div class="collectible" title="${model.description}" >
                        <script> console.log('log1'); </script>
                        <img src="${model.icon}" class="collectible-img">
                        <script> console.log('log2'); </script>
                        <p class="collectible-description">${model.hist}</p>
                    </div>
                    <div class="oper-gif">
                        <span>
                            <img src='./imgs/misc/loading.gif' class="disp-n">
                        </span>
                    </div>
                    <div class="price-div">
                        <span class="price-content">
                            cost: ${model.price}⚡
                        </span>
                    </div>
                    <div style="text-align: center;">
                        <button type="submit">Purchase</button>
                        <button type="reset" id="dismiss-modal">Dismiss</button>
                    </div>
                </form>
            </div>
        `;
    }
}
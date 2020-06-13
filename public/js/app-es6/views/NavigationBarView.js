import {View} from './View';

export class NavigationBarView extends View {

    constructor(HTMLElement){
        super(HTMLElement);
    }

    template(model){
        return `<img class="user-img" src="imgs/misc/avatar_test.jpg" title="⚡ is our currency. To won ⚡s you just need to run. As much distance you run more ⚡ you receive!"> ${model.name} • ${model.balance} ⚡`;
    }
}
import {View} from './View';

export class NavigationBarView extends View {

    constructor(HTMLElement){
        super(HTMLElement);
    }

    template(model){
        return `<img class="user-img" src="imgs/misc/avatar_test.jpg"> ${model.name} • ${model.balance}`;
    }
}
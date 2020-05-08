export class Collectible{
    constructor(title, icon, price, description){
        this._title = title;
        this._icon = icon;
        this._price = price;
        this._description = description;

        Object.freeze(this);
    }
    
    get title(){
        return this._title;
    }
    
    get icon(){
        return this._icon;
    }

    get price(){
        return this._price;
    }

    get description(){
     return this._description;
    }
}
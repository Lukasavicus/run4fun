export class Collectible{
    constructor(title, icon, price, serie, hist, owned, description){
        this._title = title;
        this._icon = icon;
        this._price = price;
        this._serie = serie;
        this._hist = hist;
        this._owned = owned;
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

    get serie(){
        return this._serie;
    }

    get hist(){
        return this._hist;
    }

    get owned(){
        return this._owned;
    }

    get description(){
     return this._description;
    }
}
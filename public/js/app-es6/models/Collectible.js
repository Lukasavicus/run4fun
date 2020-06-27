export class Collectible{
    constructor(id, title, icon, price, serie, hist, owned, description){
        this._id = id;
        this._title = title;
        this._icon = icon;
        this._price = price;
        this._serie = serie;
        this._hist = hist;
        this._owned = owned;
        this._description = description;

        Object.freeze(this);
    }
    
    get id(){
        return this._id;
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
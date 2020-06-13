export class CollectibleList {
    constructor(){
        this._collectibles = [];
        this._purchasedCollectibles = [];
    }

    add(collectible){
        this._collectibles.push(collectible);
    }

    purchase(collectible){
        this._purchasedCollectibles.push(collectible);
    }

    get collectibles(){
        return [].concat(this._collectibles);
    }

    get purchasedCollectibles(){
        return [].concat(this._purchasedCollectibles);
    }
}
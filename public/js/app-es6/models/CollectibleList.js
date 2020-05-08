export class CollectibleList {
    constructor(){
        this._collectibles = [];
    }

    add(collectible){
        this._collectibles.push(collectible);
    }

    get collectibles(){
        return [].concat(this._collectibles);
    }
}
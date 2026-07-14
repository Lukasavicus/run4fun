export class CollectibleList {
    constructor(){
        this._collectibles = [];
    }

    add(collectible){
        this._collectibles.push(collectible);
    }

    replace(collectibles){
        this._collectibles = collectibles;
    }

    get collectibles(){
        return [].concat(this._collectibles);
    }
}

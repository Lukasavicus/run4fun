export class BadgeList {
    constructor(){
        this._badges = [];
    }

    add(badge){
        this._badges.push(badge);
    }

    get badges(){
        return [].concat(this._badges);
    }
}
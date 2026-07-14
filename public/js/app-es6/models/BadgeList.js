export class BadgeList {
    constructor(){
        this._badges = [];
    }

    add(badge){
        this._badges.push(badge);
    }

    replace(badges){
        this._badges = badges;
    }

    get badges(){
        return [].concat(this._badges);
    }
}

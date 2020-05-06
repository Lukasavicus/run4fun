export class Badge{
    constructor(title, icon, description){
        this._title = title;
        this._icon = icon;
        this._description = description;

        Object.freeze(this);
    }
    
    get title(){
        return this._title;
    }
    
    get icon(){
        return this._icon;
    }

    get description(){
     return this._description;
    }
}
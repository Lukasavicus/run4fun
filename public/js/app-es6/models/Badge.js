export class Badge{
    constructor(id, title, icon, description, group='General', earned=false, value=0, earnedAt=null, earnedValue=null){
        this._id = id;
        this._title = title;
        this._icon = icon;
        this._description = description;
        this._group = group;
        this._earned = earned;
        this._value = value;
        this._earnedAt = earnedAt;
        this._earnedValue = earnedValue;

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

    get description(){
     return this._description;
    }

    get group(){
        return this._group;
    }

    get earned(){
        return this._earned;
    }

    get value(){
        return this._value;
    }

    get earnedAt(){
        return this._earnedAt;
    }

    get earnedValue(){
        return this._earnedValue;
    }
}

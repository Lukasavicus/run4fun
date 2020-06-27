export class Transaction{
    constructor(date, value, type, description){
        this._date = date;
        this._value = value;
        this._type = type;
        this._description = description;

        Object.freeze(this);
    }
    
    get date(){
        return this._date;
    }
    
    get value(){
        return this._value;
    }

    get type(){
        return this._type;
    }

    get description(){
        return this._description;
    }
}
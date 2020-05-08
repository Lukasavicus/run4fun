export class Transaction{
    constructor(date, value, nature){
        this._date = date;
        this._value = value;
        this._nature = nature;

        Object.freeze(this);
    }
    
    get date(){
        return this._date;
    }
    
    get value(){
        return this._value;
    }

    get nature(){
        return this._nature;
    }
}
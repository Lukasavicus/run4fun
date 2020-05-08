export class TransactionList {
    constructor(){
        this._transactions = [];
    }

    add(transaction){
        this._transactions.push(transaction);
    }

    get transactions(){
        return [].concat(this._transactions);
    }
}
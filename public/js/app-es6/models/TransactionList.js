export class TransactionList {
    constructor(){
        this._transactions = [];
    }

    add(transaction){
        this._transactions.push(transaction);
    }

    replace(transactions){
        this._transactions = transactions;
    }

    get transactions(){
        return [].concat(this._transactions);
    }
}

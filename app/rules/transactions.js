let mongoose = require('mongoose');

let userRules = require('../rules/users');
let transactionModel = mongoose.model('Transaction');

let transactionRules = {
    _set_up_transaction : function(value, type, description, user_id){
        return transactionModel.create({
                'date' : "",
                'value' : value,
                'type' : type,
                'description' : description,
                'user_id' : mongoose.Types.ObjectId(user_id),
            }).then(function(transaction){
                return transaction
            }, function(err){
                console.log("API / Activities -> _set_up_transaction ", err);
                throw new Error(err);
            })
            .then(() => userRules._set_up_user_balance(value, user_id));
    }
}
    
module.exports = transactionRules;

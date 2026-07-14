let mongoose = require('mongoose');

let userRules = require('../rules/users');
let transactionModel = mongoose.model('Transaction');

let transactionRules = {
    _set_up_transaction : function(value, type, description, user_id, source_type, source_id){
        return transactionModel.create({
                'date' : new Date(),
                'value' : value,
                'type' : type,
                'description' : description,
                'user_id' : new mongoose.Types.ObjectId(user_id),
                'source_type' : source_type || 'manual',
                'source_id' : source_id ? new mongoose.Types.ObjectId(source_id) : undefined,
                'status' : 'active',
            }).then(function(transaction){
                return transaction
            }, function(err){
                console.log("API / Activities -> _set_up_transaction ", err);
                throw new Error(err);
            })
            .then(() => userRules._set_up_user_balance(value, user_id));
    },

    undoPurchasesUntilBalanceIsPositive : function(user_id, reason){
        const userId = new mongoose.Types.ObjectId(user_id);

        function undoNextPurchase(){
            return userRules.findById(userId)
                .then(function(user){
                    if(!user || user.balance >= 0) return user;

                    return transactionModel.findOne({
                        user_id: userId,
                        type: 'outcome',
                        source_type: 'collectible_purchase',
                        status: 'active',
                    }).sort({date: -1})
                    .then(function(transaction){
                        if(!transaction) return user;

                        return transactionModel.create({
                            date: new Date(),
                            value: -transaction.value,
                            type: 'income',
                            description: `Undo purchase: ${transaction.description}. ${reason || ''}`,
                            user_id: userId,
                            source_type: 'collectible_purchase_undo',
                            source_id: transaction.source_id,
                            status: 'active',
                        })
                        .then(function(){
                            transaction.status = 'reverted';
                            return transaction.save();
                        })
                        .then(function(){
                            return userRules.undoCollectiblePurchase(transaction.source_id, userId, -transaction.value);
                        })
                        .then(undoNextPurchase);
                    });
                });
        }

        return undoNextPurchase();
    }
}
    
module.exports = transactionRules;

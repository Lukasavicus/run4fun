let mongoose = require('mongoose');

let model = mongoose.model('User');

let userRules = {
    _set_up_user_balance : function(value, user_id){
        return model.findOneAndUpdate(
                { '_id' : new mongoose.Types.ObjectId(user_id)},
                {"$inc" : { "balance" : value } }
            )
            .then(function(updatedUser){
                return updatedUser
            }, function(err){
                console.log("API / userRules -> _set_up_user_balance ", err);
                throw new Error(err);
            });
    },

    purchaseCollectible : function(collectible_id, user_id){
        return model.findOneAndUpdate(
                { '_id' : user_id},
                { "$addToSet" : {"collectibles" : new mongoose.Types.ObjectId(collectible_id) } }
            )
            .then(function(user){
                return user
            }, function(err){
                console.log("API / userRules -> purchaseCollectible ", err);
                throw new Error(err);
            });
    },

    undoCollectiblePurchase : function(collectible_id, user_id, refund_value){
        return model.findOneAndUpdate(
                { '_id' : new mongoose.Types.ObjectId(user_id)},
                {
                    "$pull" : {"collectibles" : new mongoose.Types.ObjectId(collectible_id) },
                    "$inc" : { "balance" : refund_value }
                },
                { new: true }
            )
            .then(function(user){
                return user
            }, function(err){
                console.log("API / userRules -> undoCollectiblePurchase ", err);
                throw new Error(err);
            });
    },

    findById : function(user_id){
        return model.findById(new mongoose.Types.ObjectId(user_id))
            .then(function(user){
                return user
            }, function(err){
                console.log("API / userRules -> findById ", err);
                throw new Error(err);
            });
    },

    findByLogin : function(login){
        return model.findOne({ 'login' : login})
            .then(function(user){
                return user
            }, function(err){
                console.log("API / userRules -> findByLogin ", err);
                throw new Error(err);
            });
    }
}

module.exports = userRules;

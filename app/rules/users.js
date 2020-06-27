let mongoose = require('mongoose');

let model = mongoose.model('User');

let userRules = {
    _set_up_user_balance : function(value, user_id){
        return model.findOneAndUpdate(
                { '_id' : mongoose.Types.ObjectId(user_id)},
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
                { "$push" : {"collectibles" : mongoose.Types.ObjectId(collectible_id) } }
            )
            .then(function(user){
                return user
            }, function(err){
                console.log("API / userRules -> purchaseCollectible ", err);
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
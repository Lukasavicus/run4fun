let mongoose = require('mongoose');

module.exports = function(app){
	let api = {};
	let model = mongoose.model('Transaction');
	let userModel = mongoose.model('User');

	api.list = function(req, res){
		userModel.findOne({login : req.usuario})
		.then(function(user){
			if(!user) throw new Error('None user founded');
			return model.find({user_id : user._id}).sort({date : -1});
		})
		.then(
			function(transactions){
				res.json(transactions);
			},
			function(err){
				console.log("API / Transactions -> list ", err);
				res.sendStatus(500);
			}
		);
	};

	api.findById = function(req, res){
		const _id = req.params.id;
		userModel.findOne({login : req.usuario})
		.then(function(user){
			if(!user) throw new Error('None user founded');
			return model.findOne({_id : _id, user_id : user._id});
		})
		.then(
			function(transaction){
				// check object empty
				if(!transaction) throw new Error('None transaction founded');
				res.json(transaction);
			},
			function(err){
				console.log("API / Transactions -> findById ", err);
				res.sendStatus(500);
			}
		);
	};

	api.removeById = function(req, res){
		model.deleteOne({'_id' : req.params.id})
		.then(function() {
			res.sendStatus(200);
		}, function(err) {
			console.log(err);
			res.sendStatus(500);
		});
	};

	api.create = function(req, res){
		model.create(req.body)
		.then(function(transaction) {
			res.json(transaction);
		}, function(err) {
			console.log("API / Transactions -> create ", err);
			res.sendStatus(500);
		});
	};

	api.update = function(req, res){
		model.findByIdAndUpdate(req.params.id, req.body)
		.then(function(transaction) {
			res.json(transaction);
		}, function(err) {
			console.log("API / Transactions -> update ", err);
			res.sendStatus(500);
		});
	}

	return api;
};

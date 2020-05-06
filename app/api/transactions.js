let mongoose = require('mongoose');

module.exports = function(app){
	let api = {};
	let model = mongoose.model('Transaction');

	api.list = function(req, res){
		model.find()
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
		model.findById(_id)
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
		model.remove({'_id' : req.params.id})
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
let mongoose = require('mongoose');

module.exports = function(app){
	let api = {};
	let model = mongoose.model('Collectible');

	api.list = function(req, res){
		model.find()
		.then(
			function(collectibles){
				res.json(collectibles);
			},
			function(err){
				console.log("API / Collectibles -> list ", err);
				res.sendStatus(500);
			}
		);
	};

	api.findById = function(req, res){
		const _id = req.params.id;
		model.findById(_id)
		.then(
			function(collectible){
				// check object empty
				if(!collectible) throw new Error('None collectible founded');
				res.json(collectible);
			},
			function(err){
				console.log("API / Collectibles -> findById ", err);
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
		.then(function(collectible) {
			res.json(collectible);
		}, function(err) {
			console.log("API / Collectibles -> create ", err);
			res.sendStatus(500);
		});
	};

	api.update = function(req, res){
		model.findByIdAndUpdate(req.params.id, req.body)
		.then(function(collectible) {
			res.json(collectible);
		}, function(err) {
			console.log("API / Collectibles -> update ", err);
			res.sendStatus(500);
		});
	}

	return api;
};
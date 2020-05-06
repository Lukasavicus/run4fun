let mongoose = require('mongoose');

module.exports = function(app){
	let api = {};
	let model = mongoose.model('Collectable');

	api.list = function(req, res){
		model.find()
		.then(
			function(collectables){
				res.json(collectables);
			},
			function(err){
				console.log("API / Collectables -> list ", err);
				res.sendStatus(500);
			}
		);
	};

	api.findById = function(req, res){
		const _id = req.params.id;
		model.findById(_id)
		.then(
			function(collectable){
				// check object empty
				if(!collectable) throw new Error('None collectable founded');
				res.json(collectable);
			},
			function(err){
				console.log("API / Collectables -> findById ", err);
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
		.then(function(collectable) {
			res.json(collectable);
		}, function(err) {
			console.log("API / Collectables -> create ", err);
			res.sendStatus(500);
		});
	};

	api.update = function(req, res){
		model.findByIdAndUpdate(req.params.id, req.body)
		.then(function(collectable) {
			res.json(collectable);
		}, function(err) {
			console.log("API / Collectables -> update ", err);
			res.sendStatus(500);
		});
	}

	return api;
};
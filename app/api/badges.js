let mongoose = require('mongoose');

module.exports = function(app){
	let api = {};
	let model = mongoose.model('Badge');

	api.list = function(req, res){
		model.find()
		.then(
			function(badges){
				res.json(badges);
			},
			function(err){
				console.log("API / Badges -> list ", err);
				res.sendStatus(500);
			}
		);
	};

	api.findById = function(req, res){
		const _id = req.params.id;
		model.findById(_id)
		.then(
			function(badge){
				// check object empty
				if(!badge) throw new Error('None badge founded');
				res.json(badge);
			},
			function(err){
				console.log("API / Badges -> findById ", err);
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
		.then(function(badge) {
			res.json(badge);
		}, function(err) {
			console.log("API / Badges -> create ", err);
			res.sendStatus(500);
		});
	};

	api.update = function(req, res){
		model.findByIdAndUpdate(req.params.id, req.body)
		.then(function(badge) {
			res.json(badge);
		}, function(err) {
			console.log("API / Badges -> update ", err);
			res.sendStatus(500);
		});
	}

	return api;
};
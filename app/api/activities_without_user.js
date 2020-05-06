let mongoose = require('mongoose');

module.exports = function(app){
	let api = {};
	let model = mongoose.model('Activity');

	api.list = function(req, res){
		model.find()
		.then(
			function(activities){
				res.json(activities);
			},
			function(err){
				console.log("API / Activities -> list ", err);
				res.sendStatus(500);
			}
		);
	};

	api.findById = function(req, res){
		const _id = req.params.id;
		model.findById(_id)
		.then(
			function(activity){
				// check object empty
				if(!activity) throw new Error('None activity founded');
				res.json(activity);
			},
			function(err){
				console.log("API / Activities -> findById ", err);
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
		.then(function(activity) {
			res.json(activity);
		}, function(err) {
			console.log("API / Activities -> create ", err);
			res.sendStatus(500);
		});
	};

	api.update = function(req, res){
		model.findByIdAndUpdate(req.params.id, req.body)
		.then(function(activity) {
			res.json(activity);
		}, function(err) {
			console.log("API / Activities -> update ", err);
			res.sendStatus(500);
		});
	}

	return api;
};
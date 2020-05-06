let mongoose = require('mongoose');

module.exports = function(app){
	let api = {};
	let model = mongoose.model('User');

	api.list = function(req, res){
		model.find()
		.then(
			function(users){
				res.json(users);
			},
			function(err){
				console.log("API / Users -> list ", err);
				res.sendStatus(500);
			}
		);
	};

	api.findById = function(req, res){
		const _id = req.params.id;
		model.findById(_id)
		.then(
			function(user){
				// check object empty
				if(!user) throw new Error('None user founded');
				res.json(user);
			},
			function(err){
				console.log("API / Users -> findById ", err);
				res.sendStatus(500);
			}
		);
	};

	api.findByLogin = function(req, res){
		const login = req.params.login;
		model.findOne({login : login})
		.then(
			function(user){
				// check object empty
				if(!user) throw new Error('None user founded');
				res.json(user);
			},
			function(err){
				console.log("API / Users -> findByLogin ", err);
				res.sendStatus(500);
			}
		);
	};

	api.removeById = function(req, res){
		const _id = req.params.id;
		model.remove({'_id' : _id})
		.then(
			function(){
				res.sendStatus(200);
			},
			function(err){
				console.log("API / Users -> findById ", err);
				res.sendStatus(500);
			},
		);
	};

	api.create = function(req, res){
		console.log("User -> create", req.body);
		model.create(req.body)
		.then(function(user) {
			res.json(user);
		}, function(err) {
			console.log("API / Users -> create ", err);
			res.sendStatus(500);
		});
	};

	api.update = function(req, res){
		model.findByIdAndUpdate(req.params.id, req.body)
		.then(function(user) {
			res.json(user);
		}, function(err) {
			console.log("API / Users -> update ", err);
			res.sendStatus(500);
		});
	}

	return api;
};
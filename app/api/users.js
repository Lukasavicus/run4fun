let mongoose = require('mongoose');

module.exports = function(app){
	let api = {};
	let model = mongoose.model('User');
	let badgesModel = mongoose.model('Badge');
	let collectibleModel = mongoose.model('Collectible');

	
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
		//const login = req.params.login;
		const login = req.usuario;
		model.findOne({login : login}, {'password' : 0, 'badges' : 0, 'collectibles' : 0, 'activities' : 0})
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
		//console.log("User -> create", req.body);
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

	//Badges
	api.listBadges = function(req, res){
		//console.log(`Getting badges for ${req.usuario}`);
		model.aggregate([
			{
				$match: {
					login: req.usuario
				}
			},
			{ $lookup : 
				{
					from : "badges",
					localField : "badges",
					foreignField : "_id",
					as : "badges_by_user"
				}
			},
			{
				$project: {
					_id: 0,
					badges_by_user: 1,
				}
			}
		])
		.then(
			function(result){
				res.json(result[0]["badges_by_user"]);
			},
			function(err){
				console.log("API / User -> listBadges ", err);
				res.sendStatus(500);
			}
		);
	};

	// Collectibles
	api.listCollectibles = function(req, res){
		model.aggregate([
			{
				$match: {
					login: req.usuario
				}
			},
			{ $lookup : 
				{
					from : "collectibles",
					localField : "collectibles",
					foreignField : "_id",
					as : "collectibles_by_user"
				}
			},
			{
				$project: {
					_id: 0,
					collectibles_by_user: 1,
				}
			}
		])
		.then(
			function(owned_collectibles_agg){
				return owned_collectibles_agg[0]["collectibles_by_user"];
			},
			function(err){
				console.log("API / Users -> _set_up_badges *", err);
				res.sendStatus(500);
			}
		)
		.then(owned_collectibles => {
			//console.log("colecionaveis: ", owned_collectibles);
			collectibleModel.find({
					"_id" : {"$nin" : owned_collectibles}
			})
			.then(function(collectibles){

				owned_collectibles.forEach(col => col['owned'] = true);

				// As typeof collectibles is 'Document[]' we need to do this in order to add a new property in its elements
				let other_collectibles = collectibles.map(col => col.toObject());
				other_collectibles.forEach(col => col['owned'] = false);

				return {owned_collectibles, other_collectibles};
				
			}, function(err){
				console.log("API / Activities -> _set_up_badges ", err);
				res.sendStatus(500);
			})
			.then(collectibles_result => {
				let all_collectibles = collectibles_result.owned_collectibles.concat(collectibles_result.other_collectibles);
				
				console.log("ALL:", all_collectibles);

				res.json(all_collectibles);
			});
		});
	}

	return api;
};
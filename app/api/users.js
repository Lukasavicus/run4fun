let mongoose = require('mongoose');

module.exports = function(app){
	let api = {};
	let model = mongoose.model('User');
	let collectibleModel = mongoose.model('Collectible');
	let badgeModel = mongoose.model('Badge');
	let transactionModel = mongoose.model('Transaction');

	
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
		model.deleteOne({'_id' : _id})
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
		let earnedBadges = [];
		let badgeTransactions = {};

		model.findOne({ login: req.usuario })
		.then(function(user){
			if(!user) return [];

			earnedBadges = ((user && user.badges) || []).map(function(badgeId){
				return badgeId.toString();
			});

			return transactionModel.find({
				user_id: user._id,
				source_type: 'badge',
				status: 'active',
			});
		})
		.then(function(transactions){
			transactions.forEach(function(transaction){
				if(transaction.source_id) badgeTransactions[transaction.source_id.toString()] = transaction;
			});

			return badgeModel.find().sort({ group: 1, sort_order: 1, title: 1 });
		})
		.then(function(badges){
			res.json(badges
				.map(function(badge){
					let badgeObj = badge.toObject();
					badgeObj.earned = earnedBadges.indexOf(badge._id.toString()) >= 0;
					if(badgeObj.earned && badgeTransactions[badge._id.toString()]) {
						badgeObj.earned_at = badgeTransactions[badge._id.toString()].date;
						badgeObj.earned_value = badgeTransactions[badge._id.toString()].value;
					}
					return badgeObj;
				})
				.sort(function(a, b){
					if(a.earned != b.earned) return a.earned ? -1 : 1;
					if(a.group != b.group) return a.group.localeCompare(b.group);
					return (a.sort_order || 0) - (b.sort_order || 0);
				})
			);
		})
		.catch(function(err){
			console.log("API / User -> listBadges ", err);
			res.sendStatus(500);
		});
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
					from : collectibleModel.collection.name,
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
				console.log("API / Users -> listCollectibles - user", err);
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
				console.log("API / Activities -> listCollectibles - collectible ", err);
				res.sendStatus(500);
			})
			.then(collectibles_result => {
				let all_collectibles = collectibles_result.owned_collectibles.concat(collectibles_result.other_collectibles);
				
				// console.log("ALL:", all_collectibles);

				res.json(all_collectibles);
			});
		});
	}

	return api;
};

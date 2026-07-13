let mongoose = require('mongoose');

module.exports = function(app){
	let api = {};
	let model = mongoose.model('User');
	let collectibleModel = mongoose.model('Collectible');
	let badgeModel = mongoose.model('Badge');
	let transactionModel = mongoose.model('Transaction');
	let activityModel = mongoose.model('Activity');

	function _publicSettings(user){
		let settings = (user && user.public_settings) || {};
		return {
			badges: settings.badges !== false,
			collectibles: settings.collectibles !== false,
			kpis: settings.kpis !== false,
			runs: settings.runs === true,
		};
	}

	function _activitySeconds(time){
		let parts = String(time || '00:00:00').split(':').map(Number);
		return (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);
	}

	function _timeText(seconds){
		let hrs = String(parseInt(seconds / 3600)).padStart(2, '0');
		seconds %= 3600;
		let mins = String(parseInt(seconds / 60)).padStart(2, '0');
		let secs = String(parseInt(seconds % 60)).padStart(2, '0');
		return `${hrs}:${mins}:${secs}`;
	}

	function _kpis(activities){
		let totalDistance = activities.reduce(function(total, activity){
			return total + Number(activity.route_distance || 0);
		}, 0);
		let totalSeconds = activities.reduce(function(total, activity){
			return total + _activitySeconds(activity.time);
		}, 0);
		let maxDistance = activities.reduce(function(max, activity){
			return Number(activity.route_distance || 0) > max ? Number(activity.route_distance || 0) : max;
		}, 0);

		return {
			total_distance: totalDistance.toFixed(2),
			total_time: _timeText(totalSeconds),
			max_distance: maxDistance.toFixed(2),
			activities_count: activities.length,
		};
	}

	function _requireAdmin(login){
		return model.findOne({login: login}).then(function(user){
			if(!user || user.role != 'admin') return null;
			return user;
		});
	}

	
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

	api.publicProfile = function(req, res){
		let profile = null;
		let settings = null;
		let activities = [];

		model.findOne({login : req.params.login}, {'password' : 0})
		.then(function(user){
			if(!user) return null;

			profile = user;
			settings = _publicSettings(user);
			return activityModel.find({_id: {$in: user.activities || []}}).sort({date: -1});
		})
		.then(function(foundActivities){
			if(!profile) return null;
			activities = foundActivities || [];

			return Promise.all([
				settings.badges ? badgeModel.find({_id: {$in: profile.badges || []}}).sort({group: 1, title: 1}) : [],
				settings.collectibles ? collectibleModel.find({_id: {$in: profile.collectibles || []}}).sort({serie: 1, title: 1}) : [],
			]);
		})
		.then(function(results){
			if(!profile) return res.sendStatus(404);

			res.json({
				login: profile.login,
				name: profile.name,
				public_settings: settings,
				kpis: settings.kpis ? _kpis(activities) : null,
				runs: settings.runs ? activities : [],
				badges: results[0] || [],
				collectibles: results[1] || [],
			});
		})
		.catch(function(err){
			console.log("API / Users -> publicProfile ", err);
			res.sendStatus(500);
		});
	};

	api.getPublicSettings = function(req, res){
		model.findOne({login : req.usuario}, {'public_settings' : 1, '_id' : 0})
		.then(function(user){
			if(!user) return res.sendStatus(404);
			res.json(_publicSettings(user));
		})
		.catch(function(err){
			console.log("API / Users -> getPublicSettings ", err);
			res.sendStatus(500);
		});
	};

	api.updatePublicSettings = function(req, res){
		let settings = {
			badges: req.body.badges === true,
			collectibles: req.body.collectibles === true,
			kpis: req.body.kpis === true,
			runs: req.body.runs === true,
		};

		model.findOneAndUpdate(
			{login : req.usuario},
			{$set: {public_settings: settings}},
			{new: true}
		)
		.then(function(user){
			if(!user) return res.sendStatus(404);
			res.json(_publicSettings(user));
		})
		.catch(function(err){
			console.log("API / Users -> updatePublicSettings ", err);
			res.sendStatus(500);
		});
	};

	api.adminSummary = function(req, res){
		_requireAdmin(req.usuario)
		.then(function(admin){
			if(!admin) return null;
			return model.find({}, {'password': 0});
		})
		.then(function(users){
			if(!users) return res.sendStatus(403);

			let activityIds = users.reduce(function(ids, user){
				return ids.concat(user.activities || []);
			}, []);

			return Promise.all([
				Promise.resolve(users),
				activityModel.find({_id: {$in: activityIds}}),
				collectibleModel.find(),
				badgeModel.find(),
			]);
		})
		.then(function(results){
			if(!results) return null;

			let users = results[0];
			let activities = results[1];
			let collectibles = results[2];
			let badges = results[3];
			let activityById = {};
			let collectibleById = {};
			let badgeById = {};

			activities.forEach(function(activity){ activityById[activity._id.toString()] = activity; });
			collectibles.forEach(function(collectible){ collectibleById[collectible._id.toString()] = collectible; });
			badges.forEach(function(badge){ badgeById[badge._id.toString()] = badge; });

			let collectiblePurchases = {};
			let badgeUnlocks = {};
			let totalDistance = 0;
			let totalActivities = 0;

			let userRows = users.map(function(user){
				let userActivities = (user.activities || []).map(function(id){ return activityById[id.toString()]; }).filter(Boolean);
				let kpis = _kpis(userActivities);
				totalDistance += Number(kpis.total_distance);
				totalActivities += userActivities.length;

				(user.collectibles || []).forEach(function(id){
					let collectible = collectibleById[id.toString()];
					let title = collectible ? collectible.title : id.toString();
					collectiblePurchases[title] = (collectiblePurchases[title] || 0) + 1;
				});

				(user.badges || []).forEach(function(id){
					let badge = badgeById[id.toString()];
					let title = badge ? badge.title : id.toString();
					badgeUnlocks[title] = (badgeUnlocks[title] || 0) + 1;
				});

				return {
					_id: user._id,
					login: user.login,
					name: user.name,
					email: user.email,
					role: user.role,
					balance: user.balance,
					activities_count: userActivities.length,
					badges_count: (user.badges || []).length,
					collectibles_count: (user.collectibles || []).length,
					total_distance: kpis.total_distance,
					total_time: kpis.total_time,
				};
			});

			res.json({
				totals: {
					users: users.length,
					activities: totalActivities,
					distance: totalDistance.toFixed(2),
					badges_unlocked: Object.values(badgeUnlocks).reduce((total, count) => total + count, 0),
					collectibles_bought: Object.values(collectiblePurchases).reduce((total, count) => total + count, 0),
				},
				users: userRows,
				collectible_purchases: Object.keys(collectiblePurchases).sort().map(title => ({title, count: collectiblePurchases[title]})),
				badge_unlocks: Object.keys(badgeUnlocks).sort().map(title => ({title, count: badgeUnlocks[title]})),
			});
		})
		.catch(function(err){
			console.log("API / Users -> adminSummary ", err);
			res.sendStatus(500);
		});
	};

	api.adminDeleteUser = function(req, res){
		let deletedUser = null;

		_requireAdmin(req.usuario)
		.then(function(admin){
			if(!admin) return null;
			if(admin._id.toString() == req.params.id) throw new Error('Admin cannot delete itself');
			return model.findById(req.params.id);
		})
		.then(function(user){
			if(!user) return res.sendStatus(403);
			deletedUser = user;
			return Promise.all([
				activityModel.deleteMany({_id: {$in: user.activities || []}}),
				transactionModel.deleteMany({user_id: user._id}),
				model.deleteOne({_id: user._id}),
			]);
		})
		.then(function(){
			if(deletedUser) res.json({deleted: deletedUser.login});
		})
		.catch(function(err){
			console.log("API / Users -> adminDeleteUser ", err);
			res.sendStatus(500);
		});
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

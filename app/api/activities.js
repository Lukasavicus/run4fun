let mongoose = require('mongoose');

let transactionRules = require('../rules/transactions');

module.exports = function(app){
	let api = {};
	let model = mongoose.model('Activity');
	let userModel = mongoose.model('User');
	let badgeModel = mongoose.model('Badge');

	function _activity_points(distance){
		return Number(distance || 0) * 10;
	}

	//Badges
	function _set_up_badges(login){
		return userModel.aggregate([
			{
				$match: {
					login: login
				}
			},
			{ $lookup : 
				{
					from : model.collection.name,
					localField : "activities",
					foreignField : "_id",
					as : "activities_by_user"
				}
			},
			{
				$project: {
					_id: 0,
					badges: 1,
					activities_by_user: 1,
				}
			}
		])
		.then(function(result){
			const user = result[0] || {};
			const activities = user["activities_by_user"] || [];
			const earnedBadgeIds = (user.badges || []).map(function(badgeId){ return badgeId.toString(); });
			return badgeModel.find({}).then(function(badges){
				let badgesByGroup = {};

				badges.forEach(function(badge){
					let earned = false;

					try {
						let f = eval(badge.criteria);
						earned = typeof f == 'function' && f(activities);
					}
					catch(err) {
						console.log("API / Activities -> invalid badge criteria", badge.title, err.message);
					}

					if(!earned || earnedBadgeIds.indexOf(badge._id.toString()) >= 0) return;

					let group = badge.group || badge.title;
					if(!badgesByGroup[group] || (badge.sort_order || 0) > (badgesByGroup[group].sort_order || 0))
						badgesByGroup[group] = badge;
				});

				return Promise.all(Object.keys(badgesByGroup).map(function(group){
					let badge = badgesByGroup[group];
					return userModel.findOneAndUpdate(
						{"$and" : [{"login" : login}, {"badges" : { "$nin" : [new mongoose.Types.ObjectId(badge._id)] } } ] },
						{ "$push" : {"badges" : new mongoose.Types.ObjectId(badge._id) } }
					)
					.then(function(updatedUser){
						if(updatedUser)
							return transactionRules._set_up_transaction(badge.value, "income", `Income: Badge earned: "${badge.title}" +${badge.value}⚡`, updatedUser._id, 'badge', badge._id);
						return null;
					});
				}));
			});
		});
	}

	function _find_user_activity(login, activity_id){
		return userModel.findOne({
			login : login,
			activities : new mongoose.Types.ObjectId(activity_id)
		});
	}

	api.list = function(req, res){
		userModel.aggregate([
			{
				$match: {
					login: req.usuario
				}
			},
			{ $lookup : 
				{
					from : model.collection.name,
					localField : "activities",
					foreignField : "_id",
					as : "activities_by_user"
				}
			},
			{
				$project: {
					_id: 0,
					activities_by_user: 1,
				}
			}
		])
		.then(
			function(result){
				res.json(result[0]["activities_by_user"]);
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
		const _id = req.params.id;
		let user = null;
		let activity = null;

		_find_user_activity(req.usuario, _id)
		.then(function(userFound){
			if(!userFound) {
				res.sendStatus(404);
				return null;
			}

			user = userFound;
			return model.findById(_id);
		})
		.then(function(activityFound){
			if(!activityFound) return null;

			activity = activityFound;
			return model.deleteOne({'_id' : _id});
		})
		.then(function(){
			if(!activity) return null;

			return userModel.findByIdAndUpdate(
				user._id,
				{ "$pull" : {"activities" : new mongoose.Types.ObjectId(activity._id) } }
			);
		})
		.then(function(){
			if(!activity) return null;

			return transactionRules._set_up_transaction(
				-_activity_points(activity.route_distance),
				"outcome",
				`Outcome: Deleted ${activity.physical_activity} -${_activity_points(activity.route_distance)}⚡`,
				user._id,
				'activity_delete',
				activity._id
			);
		})
		.then(function(){
			if(!activity) return null;
			return transactionRules.undoPurchasesUntilBalanceIsPositive(user._id, 'Activity deleted');
		})
		.then(function(){
			if(activity) res.json(activity);
		})
		.catch(function(err){
			console.log("API / Activities -> removeById ", err);
			res.sendStatus(500);
		});
	};

	api.create = function(req, res){
		let activity_created = null;

		model.create(req.body)
		.then(function(activity) {
			
			/**/
			userModel.findOneAndUpdate(
				{"login" : req.usuario},
				{ "$push" : {"activities" : new mongoose.Types.ObjectId(activity._id) } }
			)
			.then(function(user){
				//console.log("User updated ", user);
				const points = _activity_points(activity.route_distance);
				return transactionRules
					._set_up_transaction(points, "income", `Income: ${activity.physical_activity} +${points}⚡`, user._id, 'activity', activity._id)
					.then(function(){
						return _set_up_badges(req.usuario); // badges assignment
					})
					.then(function(){
						res.json({activity, 'user_activities' : user['activities']});
					});
			}, function(){
				console.log("API / Activities -> create (update user)", err);
				res.sendStatus(500);
			})
			.catch(err => {
				console.log("API / Activities -> create (update user) *", err);
				res.sendStatus(500);
			});
			
			//console.log(activity._id);

			//res.json(activity);

		}, function(err) {
			console.log("API / Activities -> create (insert into activities)", err);
			res.sendStatus(500);
		});

	};

	api.update = function(req, res){
		let user = null;
		let oldActivity = null;

		_find_user_activity(req.usuario, req.params.id)
		.then(function(userFound){
			if(!userFound) {
				res.sendStatus(404);
				return null;
			}

			user = userFound;
			return model.findById(req.params.id);
		})
		.then(function(activityFound){
			if(!activityFound) return null;

			oldActivity = activityFound;
			return model.findByIdAndUpdate(req.params.id, req.body, {new: true});
		})
		.then(function(activity) {
			if(!activity) return null;

			const oldValue = Number(oldActivity.route_distance || 0);
			const newValue = Number(activity.route_distance || 0);
			const diff = newValue - oldValue;
			const pointsDiff = _activity_points(diff);

			if(diff == 0) return activity;

			return transactionRules._set_up_transaction(
				pointsDiff,
				diff > 0 ? "income" : "outcome",
				`Adjustment: Edited ${activity.physical_activity} ${pointsDiff > 0 ? '+' : ''}${pointsDiff}⚡`,
				user._id,
				'activity_edit',
				activity._id
			)
			.then(function(){
				return transactionRules.undoPurchasesUntilBalanceIsPositive(user._id, 'Activity edited');
			})
			.then(function(){
				return activity;
			});
		})
		.then(function(activity){
			if(!activity) return null;
			return _set_up_badges(req.usuario).then(function(){ return activity; });
		})
		.then(function(activity){
			if(activity) res.json(activity);
		})
		.catch(function(err) {
			console.log("API / Activities -> update ", err);
			res.sendStatus(500);
		});
	}

	return api;
};

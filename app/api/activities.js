let mongoose = require('mongoose');

module.exports = function(app){
	let api = {};
	let model = mongoose.model('Activity');
	let userModel = mongoose.model('User');
	let badgeModel = mongoose.model('Badge');
	let transactionModel = mongoose.model('Transaction');

	//Badges
	function _set_up_badges(req, res){
		return userModel.aggregate([
			{
				$match: {
					login: req.usuario
				}
			},
			{ $lookup : 
				{
					from : "activities",
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
				const activities = result[0]["activities_by_user"];
				badgeModel.find({})
				.then(function(badges){
					badges.forEach(badge => {
						let f = eval(badge.criteria);
						console.log("Evaluating ", badge.title);
						let result = f(activities);
						console.log("result, ", result);
						if(result){
							console.log("Inserting badge with _id: ", mongoose.Types.ObjectId(badge._id), badge._id);
							userModel.findOneAndUpdate(
								{"$and" : [{"login" : req.usuario}, {"badges" : { "$nin" : [mongoose.Types.ObjectId(badge._id)] } } ] },
								{ "$push" : {"badges" : mongoose.Types.ObjectId(badge._id) } }
							)
							.then(function(updatedUser){
								console.log("updatedUser", updatedUser);
								return {badge, 'user' : updatedUser};
							}, (err) => { throw new Error(err)})
							.then(data => {
								console.log(data);
								let badge = data.badge;
								let user = data.user;
								if(user)
									return _set_up_transaction(badge.value, "income", `Income: Badge earned: "${badge.title}" +${badge.value}⚡`, user._id);
								return null;
							})
							.catch((err) => { throw new Error(err)});
						}
					});
				}, function(err){
					console.log("API / Activities -> _set_up_badges ", err);
					res.sendStatus(500);
				});
			},
			function(err){
				console.log("API / Activities -> _set_up_badges *", err);
				res.sendStatus(500);
			}
		);
	}

	function _set_up_transaction(value, type, description, user_id){
		return transactionModel.create({
				'date' : "",
				'value' : value,
				'type' : type,
				'description' : description,
				'user_id' : mongoose.Types.ObjectId(user_id),
			}).then(function(transaction){
				return transaction
			}, function(err){
				console.log("API / Activities -> _set_up_transaction ", err);
				throw new Error(err);
			})
			.then(() => _set_up_user_balance(value, user_id));
	}

	function _set_up_user_balance(value, user_id){
		return userModel.findOneAndUpdate(
				{ '_id' : mongoose.Types.ObjectId(user_id)},
				{"$inc" : { "balance" : value } }
			)
			.then(function(updatedUser){
				return updatedUser
			}, function(err){
				console.log("API / Activities -> _set_up_user_balance ", err);
				throw new Error(err);
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
					from : "activities",
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
		model.remove({'_id' : req.params.id})
		.then(function() {
			res.sendStatus(200);
		}, function(err) {
			console.log(err);
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
				{ "$push" : {"activities" : mongoose.Types.ObjectId(activity._id) } }
			)
			.then(function(user){
				//console.log("User updated ", user);

				_set_up_badges(req, res); // badges assignment
				//.then(() => {
				_set_up_transaction(activity.route_distance, "income", `Income: ${activity.physical_activity} +${activity.route_distance}⚡`, req.usuario);
				//}).then(() => {
				res.json({activity, 'user_activities' : user['activities']});
				//});
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
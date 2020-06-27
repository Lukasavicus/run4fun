let mongoose = require('mongoose');

let transactionRules = require('../rules/transactions');
const userRules = require('../rules/users');

module.exports = function(app){
	let api = {};
	let model = mongoose.model('Collectible');
	let userModel = mongoose.model('User');

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

	api.purchase = function(req, res){
		console.log("PURCHASE");
		const params = req.url.split('/');
		const _id = params[params.length-1];
		model.findById(_id)
		.then(function(collectible){
				// check object empty
				if(!collectible) throw new Error('None collectible founded');
				userModel.findOne({"login" : req.usuario})
				.then(function(user){
					if(!user) throw new Error('None User founded');

					console.log("PURCHASE Operation", user, collectible);

					if(user.balance > collectible.value ){
						// DO THE PURCHASE OPERATION HERE
						console.log("Set up Transactions");
						transactionRules
						._set_up_transaction(-collectible.value, "outcome", `Outcome: Purchasing ${collectible.name} -${collectible.value}⚡`, user._id)
						.then(() => {
							// ADD COLLECTIBLE TO USER
							userRules
							.purchaseCollectible(collectible._id, user._id)
							.then(() => {
								console.log(`Collectible ${collectible.name} purchase by ${user.login}`);
								res.json({'checkout' : 'ok'});
							})
							.catch(err => {
								throw new Error(err);
							});
						})
						.catch(err => {
							throw new Error(err);
						});
					}
					else{
						console.log('Not enough cash, stranger!');
						res.status(403).send('Not cash')//.json({ msg: 'Not enough cash, stranger!'});
					}
				},
				function(err){
					console.log("API / Collectibles -> userModel find ", err);
					res.sendStatus(500);
				});
			},
			function(err){
				console.log("API / Collectibles -> findById ", err);
				res.sendStatus(500);
			}
		);
	}

	return api;
};
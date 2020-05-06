module.exports = function(app) {
	
	var api = app.api.transactions;

	app.route('/v1/transactions')
		.get(api.list)
		.post(api.create);

	app.route('/v1/transactions/:id')
		.get(api.findById)
		.delete(api.removeById)
		.put(api.update);
};
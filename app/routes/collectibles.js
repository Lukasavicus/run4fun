module.exports = function(app) {
	
	var api = app.api.collectibles;

	app.route('/v1/collectibles')
		.get(api.list)
		.post(api.create);

	app.route('/v1/collectibles/:id')
		.get(api.findById)
		.delete(api.removeById)
		.put(api.update)
		.patch(api.purchase);

	app.route('/v1/collectible/purchase/:id')
		.get(api.purchase);
};
module.exports = function(app) {
	
	var api = app.api.collectables;

	app.route('/v1/collectables')
		.get(api.list)
		.post(api.create);

	app.route('/v1/collectables/:id')
		.get(api.findById)
		.delete(api.removeById)
		.put(api.update);
};
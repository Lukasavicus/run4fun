module.exports = function(app) {
	
	var api = app.api.badges;

	app.route('/v1/badges')
		.get(api.list)
		.post(api.create);

	app.route('/v1/badges/:id')
		.get(api.findById)
		.delete(api.removeById)
		.put(api.update);
};
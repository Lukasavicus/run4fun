module.exports = function(app) {
	
	var api = app.api.activities;

	app.route('/v1/activities')
		.get(api.list)
		.post(api.create);

	app.route('/v1/activities/:id')
		.get(api.findById)
		.delete(api.removeById)
		.put(api.update);
};
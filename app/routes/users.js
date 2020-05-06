module.exports = function(app) {
	
	var api = app.api.users;

	app.route('/v1/users')
		.get(api.list)
		.post(api.create);

	app.route('/v1/users/:id')
		//.get(api.findById)
		.delete(api.removeById)
		.put(api.update);

	app.get('/v1/users/:login', api.findByLogin);
};
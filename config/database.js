module.exports = function(uri) {

	var mongoose = require('mongoose');

	mongoose.connection.on('connected', function() {
		console.log('Conectado ao MongoDB')
	});

	mongoose.connection.on('error', function(error) {
		console.log('Erro na conexão: ' + error);
	});

	// Nunca deixar um Mongo indisponível derrubar o boot (Cloud Run não tem mongo local).
	mongoose.connect(uri).catch(err => console.log('Mongo indisponível, seguindo sem DB:', err.message));

	mongoose.connection.on('disconnected', function() {
		console.log('Desconectado do MongoDB')
	});

	process.on('SIGINT', function() {
		mongoose.connection.close().then(function() {
			console.log('Aplicação terminada, conexão fechada')
			process.exit(0);
		});
		
	})
};


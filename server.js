let http = require('http')
var app = require('./config/express');
require('./config/database')('mongodb://localhost/run4fun');

http
	.createServer(app)
	.listen(3000, function(){
		console.log('Server is listening')
});
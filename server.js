let http = require('http')
var app = require('./config/express');
require('./config/database')('mongodb://localhost/run4fun');

let port = 3000;

http
	.createServer(app)
	.listen(port, function(){
		console.log(`Server is listening on ${port}`)
});
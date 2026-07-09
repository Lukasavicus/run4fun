let http = require('http')
var app = require('./config/express');
require('./config/database')(process.env.MONGODB_URI || 'mongodb://localhost/run4fun');

let port = process.env.PORT || 3000;

http
	.createServer(app)
	.listen(port, function(){
		console.log(`Server is listening on ${port}`)
});
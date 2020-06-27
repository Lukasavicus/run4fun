let express = require('express');
let consign = require('consign');
let bodyParser = require('body-parser');
//var path = require('path');
var cors = require('cors')

let app = express();

app.set('secret', 'homemavestruz');

app.use(express.static('./public'));

app.use(cors());
app.use(bodyParser.json());

consign({cwd: 'app'})
    .include('models')
    .then('api')
    .then('routes/infra.js')
    .then('routes/auth.js')
    .then('routes')
    .into(app);

module.exports = app;
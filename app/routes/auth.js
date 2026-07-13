module.exports = function(app) {

    var api = app.api.auth;
    app.post('/autenticar', api.autentica);
    app.post('/signup', api.signup);
    app.get('/public/:login', app.api.users.publicProfile);
    app.use('/*', api.verificaToken);
};

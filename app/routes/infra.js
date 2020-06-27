module.exports = function(app) {

    var api = app.api.infra;
    app.use('/*', api.checkDBConnection);
};
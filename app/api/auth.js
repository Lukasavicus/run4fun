var mongoose = require('mongoose');
var jwt  = require('jsonwebtoken'); 

module.exports = function(app) {

     var api = {};
     var model = mongoose.model('User');

     api.autentica = function(req, res) {
         console.log('autentica invoked', req.body);
         model.findOne({
             login: req.body.login,
             password: req.body.password
         })
         .then(function(usuario) {
             console.log('analisando usuario', usuario);
             if (!usuario) {
                 console.log('Invalid Login/password');
                 res.sendStatus(401);
             } else {
                console.log(usuario.login)
                 var token = jwt.sign({login: usuario.login}, app.get('secret'), {
                     expiresIn: 84600
                 });
                 console.log('Autenticado: token adicionado na resposta', token, '\n\n');
                 res.set('x-access-token', token); 
                 res.end(); 
             }
         })
         .catch(err => console.log("ERROR", err))
     };

    api.verificaToken = function(req, res, next) {
        //console.log("cabecalho", req.headers);
        let token = req.headers['x-access-token'];
        if (token) {
            console.log('Token recebido, decodificando', token, '\n\n');
            jwt.verify(token, app.get('secret'), function(err, decoded) {
            if (err) {
                    console.log('Token rejeitado');
                    return res.sendStatus(401);
            }
            else {
                console.log('Token aceito');
                // console.log(`TOKEN url:[${req.url}]\nmethod:[${req.method}]\n`, req.params, req.query, req.headers);
                console.log(decoded);
                req.usuario = decoded.login;
                next();
            }
        });
        }
        else {
            console.log('Nenhum token enviado');
            // console.log(`NO-TOKEN url:[${req.url}]\nmethod:[${req.method}]\n`, req.params, req.query, req.headers);
            return res.sendStatus(401);
        }
    }

    return api;
};
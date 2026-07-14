var mongoose = require('mongoose');
var jwt  = require('jsonwebtoken'); 

module.exports = function(app) {

     var api = {};
     var model = mongoose.model('User');

     api.signup = function(req, res) {
         var login = String(req.body.login || '').trim();
         var email = String(req.body.email || '').trim();
         var password = String(req.body.password || '').trim();

         if(!login || !email || !password) return res.status(400).json({message: 'Login, email and password are required'});

         model.create({
             name: login,
             email: email,
             login: login,
             password: password,
             role: 'user',
             balance: 0,
             badges: [],
             collectibles: [],
             activities: [],
         })
         .then(function(user) {
             res.status(201).json({
                 _id: user._id,
                 login: user.login,
                 email: user.email,
                 name: user.name,
             });
         })
         .catch(function(err) {
             console.log("API / Auth -> signup", err);
             if(err.code == 11000) return res.status(409).json({message: 'Login or email already exists'});
             res.sendStatus(500);
         });
     };

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

var mongoose = require('mongoose');

/**
 * 
 * REFS:
 * 1. https://expressjs.com/en/guide/error-handling.html
 * 2. https://gist.github.com/zcaceres/2854ef613751563a3b506fabce4501fd
 */

module.exports = function(app) {

     var api = {};

    api.checkDBConnection = function(req, res, next) {
        const db_state = mongoose.connection.readyState;
        console.log("Connection: ", db_state);

        // 0: disconnected
        // 1: connected
        // 2: connecting
        // 3: disconnecting

        if(db_state == 1)
            next();
        else{
            const err = `Could not connect with database with status: ${db_state}`;
            console.log(`INTERNAL SERVER ERROR - 500 - ${err}`);
            res.status(500).json(err);//.send({statusText : err});
        }
    }

    return api;
};
'use strict';
var config = require('../config');

function users(db, callback) {
    db.collection(config.users).find().toArray(function (err, docs){
        if(err) {
            console.log('ERROR: ' + err);
            db.close();
            return;
        }

        console.log('INFO: Users found');

        callback(docs);
    });
}

function sessions(db, callback) {
    db.collection(config.sessions).find().toArray(function (err, docs){
        if(err) {
            console.log(err);
            db.close();
            return;
        }

        console.log('INFO: Sessions found');

        callback(docs);
    });
}

function boards(db, callback) {
    db.collection(config.boards).find().toArray(function (err, docs){
        if(err) {
            console.log(err);
            db.close();
            return;
        }

        console.log('INFO: Boards found');

        callback(docs);
    });
}

module.exports = {
    users: users,
    sessions: sessions,
    boards: boards
}
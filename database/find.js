'use strict';

var config = require('../config');

function users(db, callback) {
    var users = db.collection(config.users);
    users.find().toArray(function (err, docs){
        if(err) {
            console.log(err);
            db.close();
            return;
        }

        return callback(docs);
    });
}

function sessions(db, callback) {
    var sessions = db.collection(config.sessions);
    sessions.find().toArray(function (err, docs){
        if(err) {
            console.log(err);
            db.close();
            return;
        }

        return callback(docs);
    });
}

function boards(db, callback) {
    var boards = db.collection(config.boards);
    boards.find().toArray(function (err, docs){
        if(err) {
            console.log(err);
            db.close();
            return;
        }

        return callback(docs);
    });
}

module.exports = {
    users: users,
    sessions: sessions,
    boards: boards
}
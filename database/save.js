'use strict';

var config = require('../config');

function users(db, usersNew, callback) {
    var users = db.collection(config.users);
    users.remove({}, function(err, result) {
        if(err) {
            console.log('ERROR: ' + err);
            db.close();
            return;
        }
        users.drop();
        console.log("INFO: Removed users");

        // Insert new user objects
        users.insert(usersNew, function (err, result) {
            if (err)
                console.log('ERROR: ' + err);
            else
                console.log('INFO: New users created');

            callback();
        });
    });
}

function sessions(db, sessionsNew, callback) {
    var sessions = db.collection(config.sessions);
    sessions.remove({}, function(err, result) {
        if(err) {
            console.log('ERROR: ' + err);
            db.close();
            return;
        }
        sessions.drop();
        console.log("INFO: Removed sessions");

        // Insert new user objects
        sessions.insert(sessionsNew, function (err, result) {
            if (err)
                console.log('ERROR: ' + err);
            else
                console.log('INFO: New sessions created');

            callback();
        });
    });
}

function boards(db, boardsNew, callback) {
    var boards = db.collection(config.boards);
    boards.remove({}, function(err, result) {
        if(err) {
            console.log('ERROR: ' + err);
            db.close();
            return;
        }
        boards.drop();
        console.log("INFO: Removed boards");

        // Insert new user objects
        boards.insert(boardsNew, function (err, result) {
            if (err)
                console.log('ERROR: ' + err);
            else
                console.log('INFO: New boards created');

            callback();
        });
    });
}

module.exports = {
    users:    users,
    sessions: sessions,
    boards:   boards
}
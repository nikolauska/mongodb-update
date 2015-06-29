'use strict';

var MongoClient = require('mongodb').MongoClient

var config   = require('./config');
var database = require('./database');
var updater  = require('./updater');


MongoClient.connect(config.url, function(err, db) {
    if(err) {
        console.log('ERROR: ' + err);
        return;
    }
    console.log("INFO: Connected correctly to server");

    database.find.users(db, function(users) {
        database.find.boards(db, function(boards) {
            database.find.sessions(db, function(sessions) {

                updater.sessions.addUserSessions(users, function(sessions) {
                    updater.boards.addUsers(boards, function(boards) {
                        updater.users.updateFromOld(users, function(users) {

                            database.save.sessions(db, sessions, function() {
                                database.save.boards(db, boards, function() {
                                    database.save.users(db, users, function() {

                                        console.log('SUCCESS');
                                        db.close();

                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

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

    // Update users from old to new schema
    database.find.users(db, function(users) {
        updater.users.updateFromOld(users, function(usersNew) {

            // After change we need to add and find users again to get correct new id's
            database.save.users(db, usersNew, function() {
                database.find.users(db, function(usersNew) {

                    // Generate map from old and new user id's (needed with boards)
                    updater.users.idMap(users, usersNew, function(usersMap) {

                        // Add sessions from user info
                        updater.sessions.addUserSessions(usersNew, function(sessions) {
                            database.save.sessions(sessions, function() {

                                // Get boards and add boards to user info and boards
                                database.find.boards(db, function(boards) {

                                    // Update users again with boards
                                    updater.users.addboards(usersNew, boards, usersMap, function(usersBoards) {
                                        database.save.users(db, usersBoards, function() {

                                            // Update boards with users
                                            updater.boards.addUsers(usersNew, boards, usersMap, function(boardsNew) {
                                                database.save.boards(boardsNew, function() {
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
        });
    });


    

    users.find().toArray(function (err, docs){

        // Array for reinserting objects to database
        var newUsers    = [];
        var newSessions = []; 

        for (var i = 0; i < docs.length; i++) {
            var doc = docs[i];

            if(doc.email == null && doc.password == null)
                console.log('ERROR: Invalid user object');
            else {
                console.log('INFO: Adding user document to new collection arrays...');
                newUsers.push(updater.users(doc));
                console.log('INFO: Added user document to new collection arrays');
            }    
        }

        if(newUsers.length == 0) {
            console.log('ERROR: New users array is empty, closing database connection...');
            db.close();
            return;
        }

        console.log("INFO: Removing users collection...");
        // Remove old objects and drop collection
        users.remove({}, function(err, result) {
            if(err) {
                console.log('ERROR: ' + err);
                db.close();
                return;
            }
            users.drop();
            console.log("INFO: Removed users");

            // Insert new user objects
            users.insert(newUsers, function (err, result) {
                if (err)
                    console.log('ERROR: ' + err);
                else
                    console.log('INFO: New users created');

                users.find().toArray(function (err, docs){

                    for (var i = 0; i < docs.length; i++) {
                        var doc = docs[i];

                        if(doc._id == null)
                            console.log('ERROR: Invalid user object');
                        else {
                            console.log('INFO: Adding session document to new collection arrays...');
                            newSessions.push(updater.sessions(doc));
                            console.log('INFO: Added session document to new collection arrays');
                        }    
                    }

                    if(newSessions.length == 0) {
                        console.log('ERROR: New session array is empty, closing database connection...');
                        db.close();
                        return;
                    }

                    // Remove old objects and drop collection
                    sessions.remove({}, function(err, result) {
                        if(err) {
                            console.log('ERROR: ' + err);
                            db.close();
                            return;
                        }
                        sessions.drop();
                        console.log("INFO: Removed sessions");

                        // Insert new user objects
                        sessions.insert(newSessions, function (err, result) {
                            if (err)
                                console.log('ERROR: ' + err);
                            else
                                console.log('INFO: New sessions created');

                            db.close();
                        });
                    });
                });
            });
        });         
    });
});

 

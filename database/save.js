'use strict';

var config = require('../config');

function chunkSave(collection, chunks, index, callback) {
    collection.insert(chunks[index], function (err, result) {
        if (err) {
            console.log('ERROR: ' + err);
            return
        }

        index++;

        console.log('INFO: Chunk ' + index + '/' + chunks.length + ' saved');

        if(index < chunks.length) {
            chunkSave(collection, chunks, index, callback)
        } else {
            callback();
        }
    });
}

function chunkSlice (array) {
    var chunks = [],
        i = 0,
        n = array.length;

    while (i < n) {
        chunks.push(array.slice(i, i += 999));
    }

    return chunks;
}

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

        if(usersNew.length > 1000) {

            console.log("INFO: Creating users in chunks");
            chunkSave(users, chunkSlice(usersNew), 0, callback)

        } else {

            // Insert new user objects
            users.insert(usersNew, function (err, result) {
                if (err) {
                    console.log('ERROR: ' + err);
                    return
                }

                console.log('INFO: New users created');

                callback();
            });
        }
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

        if(sessionsNew.length > 1000) {

            console.log("INFO: Creating sessions in chunks");
            chunkSave(sessions, chunkSlice(sessionsNew), 0, callback)

        } else {

            // Insert new user objects
            sessions.insert(sessionsNew, function (err, result) {
                if (err) {
                    console.log('ERROR: ' + err);
                    return;
                }

                console.log('INFO: New sessions created');

                callback();
            });
        }
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

        if(boardsNew.length > 1000) {

            console.log("INFO: Creating boards in chunks");
            chunkSave(boards, chunkSlice(boardsNew), 0, callback)

        } else {
            // Insert new user objects
            boards.insert(boardsNew, function (err, result) {
                if (err){
                    console.log('ERROR: ' + err);
                    return;
                }

                console.log('INFO: New boards created');

                callback();
            });
        }
    });
}

module.exports = {
    users:    users,
    sessions: sessions,
    boards:   boards
}

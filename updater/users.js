'use strict';

/**
 * Updates old user schema to new (without boards)
 *
 * @param {array} old users
 * @param {function} callback
 */
function updateFromOld(users, callback) {
    var usersNew =  []

    for (var i = 0; i < users.length; i++) {
        var doc = docs[i];

        if(doc.email == null && doc.password == null)
            console.log('ERROR: Invalid user object');
        else {
            // Copy doc so original won't change
            var doc = JSON.parse(JSON.stringify(doc));

            doc.account_type = 'standard';
            doc.name = doc.email;
            doc.providers = { basic: { email: doc.email, password: doc.password } };
            doc.created_at = new Date();
            doc.edited_at = new Date();

            // Remove old properties
            delete doc._id;
            delete doc.email;
            delete doc.password;
            delete doc.token;

            // Save user
            usersNew.push(doc);
        }    
    }

    if(usersNew.length == 0) {
        console.log('ERROR: New users array is empty, closing database connection...');
        return;
    }

    callback(usersNew);
}

/**
 * Adds boards to user schema
 *
 * @param {array} old users
 * @param {array} boards
 * @param {function} callback
 */
function addBoards(users, boards, callback) {
    for (var i = 0; i < users.length; i++) {
        var user = users[i];

        user.boards = [];

        for (var j = 0; j < boards.length; j++) {
            var board = boards[i];

            if(board.created_by == userMap[user._id]) {
                user.boards.push(board._id);
            } 
        }
    }

    callback(users);
}

/**
 * Generates map from old user id's to new user id's
 *
 * @param {array} old users
 * @param {array} new users
 * @param {function} callback
 */
function idMap(users, usersNew, callback) {
    var map = {};

    for (var i = 0; i < users.length; i++) {
        var user = users[i];

        for (var j = 0; j < usersNew.length; j++) {
            var userNew = usersNew[i];

            if(user.email == userNew.providers.basic.email){
                map[userNew._id] = user._id;
            }
        }
    }

    callback(map);
}

module.exports = {
    updateFromOld: updateFromOld,
    addBoards:     addBoards,
    idMap:         idMap 
}
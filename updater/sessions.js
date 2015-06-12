'use strict';

function addUserSessions(users, callback) {
    var sessions =  []

    for (var i = 0; i < users.length; i++) {
        var user = users[i];

        if(user.email == null && user.password == null)
            console.log('ERROR: Invalid user object');
        else {
            // Copy so original won't be replaced
            var user = JSON.parse(JSON.stringify(user));

            user.user = user._id;
            user.user_agent = 'unknown';
            user.created_at = new Date();

            // Remove old properties
            delete user._id;
            delete user.account_type;
            delete user.name;
            delete user.providers;
            delete user.edited_at;

            // Save user
            sessions.push(user);
        }    
    }

    if(sessions.length == 0) {
        console.log('ERROR: New users array is empty, closing database connection...');
        return;
    }

    callback(sessions);
}

module.exports = {
    addUserSessions: addUserSessions
}
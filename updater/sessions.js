'use strict';

function addUserSessions(users, callback) {
    callback(users.map(function(user) {
        return {
            user: user._id,
            user_agent: 'unknown',
            created_at: new Date()
        }
    }));
}

module.exports = {
    addUserSessions: addUserSessions
}

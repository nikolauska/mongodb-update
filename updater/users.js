'use strict';

/**
 * Updates old user schema to new (without boards)
 *
 * @param {array} old users
 * @param {function} callback
 */
function updateFromOld(users, callback) {
    callback(users.map(function(user) {
        return {
            _id: user._id,
            account_type: 'standard',
            name: user.email,
            avatar: '',
            providers: {
                basic: {
                    email: user.email,
                    password: user.password
                }
            },
            created_at: new Date(),
            edited_at: new Date()
        };
    }));
}

module.exports = {
    updateFromOld: updateFromOld
}

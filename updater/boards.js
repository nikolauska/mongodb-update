'use strict';

function addUsers(boards, callback) {
    callback(boards.map(function(board) {
        return {
            _id: board._id,
            name: board.name,
            size: board.size,
            background: board.background,
            customBackground: board.customBackground,
            accessCode: board.accessCode,
            members: [{
                user: board.createdBy,
                role: 'admin',
                isActive: false,
                lastSeen: new Date()
            }]
        };
    }));
}

module.exports = {
    addUsers: addUsers
}

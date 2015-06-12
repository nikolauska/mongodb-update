'use strict';

function addUsers(users, boards, userMap, callback) {
    for (var i = 0; i < boards.length; i++) {
        var board = boards[i];

        boards.members = {};

        for (var j = 0; j < users.length; j++) {
            var user = users[i];

            if(board.created_by == userMap[user._id]) {
                boards.members[user._id] = 'admin';
            } 
        }
    }

    callback(boards);
}

module.exports = {
    addUsers: addUsers
}
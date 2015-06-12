'use strict';

module.exports = {
    url:      process.env.MONGODB_URL || 'mongodb://localhost/test',
    users:    process.env.MONGODB_USERS || 'users',
    sessions: process.env.MONGODB_SESSIONS || 'sessions',
    boards:   process.env.MONGODB_BOARDS || 'boards'
}
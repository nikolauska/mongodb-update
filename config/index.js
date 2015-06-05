'use strict';

module.exports = {
    mongo: {
        opts: {
            safe: true
        },
        url:     process.env.MONGODB_URL     || 'mongodb://localhost/test1',
        timeout: process.env.MONGODB_TIMEOUT || 5000
    }
    mongo2: {
        opts: {
            safe: true
        },
        url:     process.env.MONGODB_URL     || 'mongodb://localhost/test2',
        timeout: process.env.MONGODB_TIMEOUT || 5000
    }
}
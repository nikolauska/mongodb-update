'use strict';

var mongoose = require('mongoose');

mongoose.model('userNew', require('./schemas/userNew'));
mongoose.model('userOld', require('./schemas/userOld'));

module.exports = mongoose;

'use strict';

var mongoose = require('mongoose');

mongoose.model('userNew', require('./schemas/new'));
mongoose.model('userOld', require('./schemas/old'));

module.exports = mongoose;

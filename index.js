'use strict';

var config   = require('./config');
var mongoose = require('./config/mongoose');

var newSchema = mongoose.model('userNew');
var oldSchema = mongoose.model('userOld');
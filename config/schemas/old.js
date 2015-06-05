'use strict';

var mongoose = require('mongoose');

/**
 * Schema defining the 'user' model. Note that there is no model for 'guest'.
 */
module.exports = new mongoose.Schema({

	/**
	 * The email of the user. Basically the 'username' equivalent.
	 *
	 * TODO Improve validation.
	 */
	email: {
		type:     String,
		match:    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
		unique:   true,
		required: true
	},

	/**
	 * The password of the user.
	 */
	password: {
		type:     String,
		required: true
	},

	/**
	 * The 'access-token' of the user. In a sense, it indicates whether there
	 * is a valid session available.
	 */
	token: {
		type: String
	}
});
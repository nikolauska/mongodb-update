'use strict';

var mongoose = require('mongoose');

/**
 * Schema defining the 'user' model. Note that there is no model for 'guest'.
 */
module.exports = new mongoose.Schema({

	/**
	 * User type. Either temporary (guest) or standard (authenticated with a provider).
	 */
	account_type: {
		type:     String,
		enum:     ['temporary', 'standard'],
		required: true,
		default:  'temporary'
	},

	/**
	 * Nickname of the user.
	 */
	name: {
		type:     String,
		required: true
	},


	/**
	 * User's different possible authentication providers
	 */
	providers: {
		basic:  {
			email: {
				type:   String,
				unique: true,
				match:  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
			},

			password: {
				type: String
			}
		},
		github: {
			name:     String,
			email:    String,
			avatar:   String
		}
	},

	/**
	 * Array of different device sessions of the user.
	 */
	sessions:[{
		user_agent:  String,
		token:       String,
		created_at:  Date
	}],

	/**
	 * Timestamp for the user creation date
	 */
	created_at: {
		type:    Date
	},

	/**
	 * Timestamp for the last time the user was edited
	 */
	edited_at: {
		type:    Date
	}

});
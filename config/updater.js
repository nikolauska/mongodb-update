'use strict';

/**
 * Updates user document
 * @param {object} document - document to be edited.
 * @returns {object} document edited
 */
module.exports.users = function (doc) {
	var doc = JSON.parse(JSON.stringify(doc));

	doc.account_type = 'standard';
    doc.name = doc.email;
    doc.providers = { basic: { email: doc.email, password: doc.password } };
    doc.created_at = new Date();
    doc.edited_at = new Date();

    // Remove old properties
    delete doc._id;
    delete doc.email;
    delete doc.password;
    delete doc.token;

    return doc;
}

/**
 * Updates session from user info document
 * @param {object} document - document to be edited.
 * @returns {object} document edited
 */
module.exports.sessions = function (doc) {
	var doc = JSON.parse(JSON.stringify(doc));

	doc.user = doc._id;
	doc.user_agent = 'unknown';
    doc.created_at = new Date();

    // Remove old properties
    delete doc._id;
    delete doc.account_type;
    delete doc.name;
    delete doc.providers;
    delete doc.edited_at;

    return doc;
}
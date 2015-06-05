var MongoClient = require('mongodb').MongoClient
var assert = require('assert');
 
// Connection URL 
var url = 'mongodb://localhost/test';
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  var collection = db.collection('users');

  console.log(collection);

  function callback(err, docs){
  	for (var i = 0; i < docs.length; i++) {
  		var doc = docs[i]
	        doc.account_type = 'standard';
	        doc.name = doc.email;
	        doc.providers = { basic: { email: doc.email, password: doc.password } };
	        doc.sessions = [ { user_agent: '', token: doc.token, created_at: new Date() } ];
	        doc.created_at = new Date();
	        doc.edited_at = new Date();

	        // Remove old properties
	        delete doc.email;
	        delete doc.password;
	        delete doc.token;

	        // Save the updated document
	        collection.save(doc);

	        console.log(doc);
	};
  	db.close();
  }

  collection.find({}).toArray(callback);
});

 

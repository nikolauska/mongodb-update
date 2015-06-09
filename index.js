var MongoClient = require('mongodb').MongoClient
 
// Connection URL 
var url = 'mongodb://localhost/test';
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  	if(err) {
  		console.log(err);
  		return;
  	}
  	console.log("Connected correctly to server");

  	var collection = db.collection('users');

  	collection.find().toArray(function (err, docs){
  		var newColl = []; 
  		for (var i = 0; i < docs.length; i++) {
  			var doc = docs[i];

  			console.log('------------------OLD DOC--------------------');
  			console.log(doc);
  			console.log('---------------------------------------------');
	        doc.account_type = 'standard';
	        doc.name = doc.email;
	        doc.providers = { basic: { email: doc.email, password: doc.password } };
	        //doc.sessions = [ { user_agent: '', token: doc.token, created_at: new Date() } ];
	        doc.sessions = [];
	        doc.created_at = new Date();
	        doc.edited_at = new Date();

	        // Remove old properties
	        delete doc._id;
	        delete doc.email;
	        delete doc.password;
	        delete doc.token;

	        newColl.push(doc);
	        console.log('------------------NEW DOC--------------------');
		    console.log(doc);
		    console.log('---------------------------------------------');     
		}

		console.log(doc);

		collection.remove({}, function(err, result) {
			if(err) {
				console.log(err);
				return;
				db.close();
			}

		    console.log("Removed the documents");

		    collection.drop();

		    // Insert some users
		    collection.insert(newColl, function (err, result) {
			    if (err) {
			    	console.log(err);
			   	} else {
			        console.log('Inserted documents into the "users" collection');
			    }
			    //Close connection
			    db.close();
		    });
		}); 

  		
  	});
});

 

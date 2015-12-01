module.exports = {
	getConnection: getConnection
};

function getConnection(opts, cb) {
    var mongodb = require('mongodb');
    var MongoClient = mongodb.MongoClient;
	MongoClient.connect(opts.connection, function (err, db) {
		if (err) {
			return cb(err);
		}

		var collection;
		if (typeof db.collection !== 'undefined') {
			// for mongodb 2.x
			collection = db.collection('migrations');
		} else {
			collection = new mongodb.Collection(db, 'migrations');
		}

		cb(null, {
			connection: db,
			migrationCollection: collection
		});
	});
}

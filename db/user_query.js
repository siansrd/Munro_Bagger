var MongoClient = require('mongodb').MongoClient;
//var ObjectID = require('mongodb').ObjectID;

var UserQuery = function() {
  this.url = 'mongodb://localhost:27017/munro_bagger';
}

UserQuery.prototype.oneById = function(id, onQueryFinished) {
  MongoClient.connect(this.url, function(err, db) {
    if (db) {
      var collection = db.collection('users');
      collection.findOne({ "_id": id }, function(err, user) {
        // Only return the public information about the user
        // Like huis name and the mountains he has climbed
        var returnValue = user ? user.public : undefined;
        onQueryFinished(returnValue);
        db.close();
      })
    }
  });
}

module.exports = UserQuery;
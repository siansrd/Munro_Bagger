var MongoClient = require('mongodb').MongoClient;

var MountainQuery = function() {
  this.url = 'mongodb://localhost:27017/munro_bagger';
}

MountainQuery.prototype.all = function(onQueryFinished) {
  MongoClient.connect(this.url, function(err, db) {
    if (db) {
      var collection = db.collection('mountains');
      collection.find().toArray(function(err, docs) {
        onQueryFinished(docs);
      })
    }
  });
}

module.exports = MountainQuery;
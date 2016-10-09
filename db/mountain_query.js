var MongoClient = require('mongodb').MongoClient;
//var ObjectID = require('mongodb').ObjectID;

var MountainQuery = function() {
  this.url = 'mongodb://localhost:27017/munro_bagger';
}

MountainQuery.prototype.all = function(onQueryFinished) {
  MongoClient.connect(this.url, function(err, db) {
    if (db) {
      var collection = db.collection('mountains');
      collection.find().toArray(function(err, docs) {
        onQueryFinished(docs);
        db.close();
      })
    }
  });
}

MountainQuery.prototype.byId = function(id, onQueryFinished) {
  MongoClient.connect(this.url, function(err, db) {
    if (db) {
      var collection = db.collection('mountains');
      collection.findOne({ "_id": id }, function(err, mtn) {
        onQueryFinished(mtn);
        db.close();
      })
    }
  });
}

module.exports = MountainQuery;
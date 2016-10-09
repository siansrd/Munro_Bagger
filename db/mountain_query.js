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

MountainQuery.prototype.oneById = function(id, onQueryFinished) {
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

MountainQuery.prototype.allByUserId = function(userId, onQueryFinished) {
  MongoClient.connect(this.url, function(err, db) {
    if (db) {
      var collection = db.collection('user_mountains');
      collection.findOne({ "_id": userId }, function(err, userMtns) {
        onQueryFinished(userMtns.mountains);
        db.close();
      })
    }
  });
}

MountainQuery.prototype.oneByUserId = function(userId, mtnId, onQueryFinished) {
  MongoClient.connect(this.url, function(err, db) {
    if (db) {
      var collection = db.collection('user_mountains');
      collection.findOne({ "_id": userId }, function(err, userMtns) {
        var mountain = userMtns.mountins.find(function(mtn) {
          mtn.mtn_id == id;
        })
        onQueryFinished(mountain);
        db.close();
      })
    }
  });
}

module.exports = MountainQuery;
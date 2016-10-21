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

UserQuery.prototype.updateBaggedList = function(userId, mtnList, onQueryFinished) {
  MongoClient.connect(this.url, function(err, db) {
    if (db) {
      var collection = db.collection('users');
      collection.findOne({ "_id": userId }, function(err, user) {
        var userMtns = user.public.mountains;
        for (var mtn of mtnList) {
          for (var c = 0; c < userMtns.length; c++) {
            if (mtn.mtn_id === userMtns[c].mtn_id) {
              userMtns[c] = mtn;
            }
          }
        }
        collection.save(user, {w:1}, function(err, result) {
          onQueryFinished();
          db.close();
        })
      })
    }
  })
}

module.exports = UserQuery;
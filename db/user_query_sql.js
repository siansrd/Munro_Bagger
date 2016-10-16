var sqlite3 = require('sqlite3').verbose();

var quote = function (str) {
  return "'" + str.toString() + "'";
}

var UserQuery = function() {
  this._db = new sqlite3.Database('usersDB.db');
  this._db.each("SELECT * FROM users", function (err, row) {
    console.log(row);
  });
  this._db.each("SELECT * FROM bagged", function (err, row) {
    console.log(row);
  });
}

UserQuery.prototype.oneById = function(username, onQueryFinished) {

  var sql = "SELECT bagged.mountain_id, bagged.has_bagged " +
    "FROM users JOIN bagged ON users.id = bagged.user_id WHERE users.username = " + quote(username);
    console.log(sql);
  this._db.each(sql, function (err, row) {
    console.log(row);
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
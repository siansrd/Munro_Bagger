var sqlite3 = require('sqlite3').verbose();

var quote = function (str) {
  return "'" + str.toString() + "'";
}

var UserQuery = function() {
}

UserQuery.prototype.oneById = function(username, onCompleted) {
  var db = new sqlite3.Database(__dirname + '/users.db');
  var sql = "SELECT bagged.mtn_id, bagged.bagged " +
    "FROM users INNER JOIN bagged ON users.id = bagged.user_id WHERE users.username = " +
    quote(username) + " ORDER BY bagged.mtn_id ASC";
  db.all(sql, function (err, rows) {
    if (rows) {
      rows.forEach(function(row) {
        console.log(row.bagged)
        row.bagged = (row.bagged) ? row.bagged = true : row.bagged = false;
        row.mtn_id = row.mtn_id.toString();
      });
    }
    onCompleted(rows);
  });
  db.close();
}

UserQuery.prototype.updateBaggedList = function(userName, mtnList, onCompleted) {
  var db = new sqlite3.Database(__dirname + '/users.db');
  var sql = "SELECT id FROM users WHERE username = " + quote(userName);
  console.log(mtnList);
  db.get(sql, function(err, row) {
    var user_id = row.id;
    for (var mtn of mtnList) {
      sql = "INSERT OR REPLACE INTO bagged (id, user_id, mtn_id, bagged) VALUES " +
        "((SELECT id FROM bagged WHERE user_id = " + quote(user_id) + " AND mtn_id = " +
        quote(mtn.mtn_id) + "), " + quote(user_id) + ", " + quote(mtn.mtn_id) + ", " +
        quote((mtn.bagged) ? 1 : 0) + ")";
      console.log(sql);
      db.run(sql);
    }
  })
  db.close();
  onCompleted();
}

module.exports = UserQuery;
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('users.db');

var quote = function (str) {
  return "'" + str.toString() + "'";
}

db.serialize(function () {
  var sql;
  var mtnId;
  var userId = 1;
  for (; userId <= 11; userId++) {
    // console.log("Creating user", userId);
    sql = "INSERT INTO users VALUES ( " + quote(userId) + ", " + quote("user" + userId + "@codeclan.com") + " )";
    // console.log(sql);
    db.run(sql);
    for (mtnId = 1 ; mtnId <= 282; mtnId++) {
      if ((mtnId-1) % 10 < userId-1) {
        // console.log("User", userId, "has bagged mountain", mtnId);
        sql = "INSERT INTO bagged (user_id, mtn_id, bagged) VALUES ( " + quote(userId) + ", " + quote(mtnId) + ", '1' )";
        // console.log(sql);
        db.run(sql);
      }
    }
  }

  db.each("SELECT * FROM users", function (err, row) {
    console.log(row);
  });
  db.each("SELECT * FROM bagged", function (err, row) {
    console.log(row);
  });
  // var sql = "SELECT bagged.mtn_id, bagged.bagged " +
  //   "FROM users INNER JOIN users_bagged ON users.id = users_bagged.user_id WHERE users.username = 'user7@codeclan.com'";
  var sql = "SELECT bagged.mtn_id, bagged.bagged " +
    "FROM users INNER JOIN bagged ON users.id = bagged.user_id WHERE users.username = 'user2@codeclan.com'";
  // db.each(sql, function (err, row) {
  //   row.bagged = (row.bagged) ? row.bagged = true : row.bagged = false;
  //   console.log(row);
  // });
  db.all(sql, function (err, row) {
    console.log(row);
  });
});

db.close();


var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('usersDB.db');

var quote = function (str) {
  return "'" + str.toString() + "'";
}

db.serialize(function () {
  db.run("DROP TABLE users");
  db.run("DROP TABLE users_bagged");
  db.run("CREATE TABLE users (id, username)");
  db.run("CREATE TABLE users_bagged (user_id, mtn_id, bagged)");
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
        sql = "INSERT INTO users_bagged VALUES ( " + quote(userId) + ", " + quote(mtnId) + ", " + quote(true) + " )";
        // console.log(sql);
        db.run(sql);
      }
    }
  }
  db.each("SELECT * FROM users", function (err, row) {
    console.log(row);
  });
  db.each("SELECT * FROM users_bagged", function (err, row) {
    console.log(row);
  });
  // var sql = "SELECT bagged.mtn_id, bagged.bagged " +
  //   "FROM users INNER JOIN users_bagged ON users.id = users_bagged.user_id WHERE users.username = 'user7@codeclan.com'";
  var sql = "SELECT users_bagged.mtn_id, users_bagged.bagged " +
    "FROM users INNER JOIN users_bagged ON users.id = users_bagged.user_id WHERE users.username = 'user2@codeclan.com'";
  db.each(sql, function (err, row) {
    console.log(row);
  });
});

db.close();
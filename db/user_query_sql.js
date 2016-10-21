var sqlite3 = require('mysql');

var quote = function (str) {
  return "'" + str.toString() + "'";
}

var UserQuery = function() {
  this._db = new sqlite3.Database('usersDB.db');
  var this._db = mysql.createConnection({
    host     : 'localhost',
    user     : 'me',
    password : 'secret',
    database : 'usersDB'
  });
}

UserQuery.prototype.oneById = function(username) {
  var sql = "SELECT users_bagged.mtn_id, users_bagged.bagged " +
    "FROM users INNER JOIN users_bagged ON users.id = users_bagged.user_id WHERE users.username = " +
    quote(username) + ";";
    console.log(sql)
  var sql = "SELECT * FROM users;"
  console.log(sql)  
  this._db.each(sql, function (err, row) {
    console.log(row);
  });
}

UserQuery.prototype.updateBaggedList = function(userId, mtnList) {

}

module.exports = UserQuery;
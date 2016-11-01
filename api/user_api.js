// var UserQuery = require('../db/user_query_sql');
var bagged_munros = require('./bagged')

var UserApi = function(app) {

  // var query = new UserQuery();

  app.get('/bagged_munros', function(req, res) {
    // no security at the moment
    res.json( bagged_munros );
  });

  app.post('/bagged_munros', function(req, res) {
    // console.log("Received Post");
    // console.log(req.body.mountains);
    res.sendStatus(200);
  });
}

module.exports = UserApi;
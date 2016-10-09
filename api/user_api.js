var UserQuery = require('../db/user_query');

var UserApi = function(app) {

  var query = new UserQuery();

  app.get('/api/users/:userId', function(req, res) {
    // no security at the moment
    query.oneById(req.params.userId, function(data) {
      res.json( { user: data } );
    });
  });
}

module.exports = UserApi;
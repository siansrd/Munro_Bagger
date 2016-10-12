var UserQuery = require('../db/user_query');

var UserApi = function(app) {

  var query = new UserQuery();

  app.get('/api/users/:userId', function(req, res) {
    // no security at the moment
    query.oneById(req.params.userId, function(data) {
      res.json( { user: data } );
    });
  });

  app.post('/api/users/:userId', function(req, res) {
    // console.log("Received Post");
    // console.log(req.body.mountains);
    query.updateBaggedList(req.params.userId, req.body.mountains, function(){
      res.sendStatus(200);
    })
  });
}

module.exports = UserApi;
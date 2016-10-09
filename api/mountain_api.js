var MountainQuery = require('../db/mountain_query');

var MountainApi = function(app) {

  var query = new MountainQuery();

  //mountain index
  app.get('/api/mountains', function(req, res) {
    query.all(function(data) {
      res.json( { mountains: data } );
    });
  });

  app.get('/api/mountains/:userid', function(req, res) {
    query.all(function(data) {
      res.json( { mountains: data } );
    });
  });

  app.get('/api/mountains/:userId/:mountainId', function(req, res) {
    query.all(function(data) {
      res.json( { mountains: data } );
    });
  });
}

module.exports = MountainApi;
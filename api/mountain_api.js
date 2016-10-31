var getMountains = require('./mountains');

var MountainApi = function(app) {
  var mountains = getMountains();

  //mountain index
  app.get('/api/mountains', function(req, res) {
    // would like to be able to JSON.stringify(mountains) one and return many times.
    res.json( { mountains: mountains });
  });
}

module.exports = MountainApi;

var mountains = require('./mountains');

var MountainApi = function(app) {

  //mountain index
  app.get('/api/mountains', function(req, res) {
    // would like to be able to JSON.stringify(mountains) one and return many times.
    res.json( mountains );
  });
}

module.exports = MountainApi;
var jsonMountains = require('./mountains');

var MountainApi = function(app) {

  //mountain index
  app.get('/api/mountains', function(req, res) {
    res.json( jsonMountains );
  });
}

module.exports = MountainApi;
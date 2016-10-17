var mountainsObj = require('./mountains');

var MountainApi = function(app) {
  var mountains = mountainsObj.mountains.map(function(mtn) {
    return {
      id: mtn.id,
      name: mtn.name,
      height: mtn.height,
      gridRef: mtn.gridRef,
      latLng: mtn.latLng
    }
  })

  //mountain index
  app.get('/api/mountains', function(req, res) {
    // would like to be able to JSON.stringify(mountains) one and return many times.
    res.json( { mountains: mountains });
  });
}

module.exports = MountainApi;

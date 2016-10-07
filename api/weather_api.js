var WeatherQuery = require('../db/weather_query');

var WeatherApi = function(app) {

  var query = new WeatherQuery();

  //weather
  //req.params - holds lat & lng for location search
  app.get('/api/weather', function(req, res) {
    query.all(function(data) {
      res.json( { weather: data } );
    });
  });
}

module.exports = MountainApi;

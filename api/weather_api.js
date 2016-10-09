var MountainQuery = require('../db/mountain_query')
//var WeatherQuery = require('../db/weather_query');

var WeatherApi = function(app) {
  //weather
  //req.params - holds lat & lng for location search
  app.get('/api/weather', function(req, res) {
    if (req.query.m) {
      // req.query.m is a string
      var mquery = new MountainQuery();
      mquery.byId(req.query.m, function(mtn) {
        if (mtn) {
          console.log(mtn);
          var weatherStn = mtn.weatherStation;
          console.log(weatherStn);
          // var wquery = new WeatherQuery();
          // wquery.get(function(data) {
          //   res.json( { weather: data } );
          // });
        }
        else {
          console.log("No mountains returned");
        }
      })
    }
  });
}

module.exports = WeatherApi;
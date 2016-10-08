var MountainQuery = require('../db/mountain_query')
//var WeatherQuery = require('../db/weather_query');

var WeatherApi = function(app) {
  //weather
  //req.params - holds lat & lng for location search
  app.get('/api/weather', function(req, res) {
    if (req.query.m) {
      console.log(req.query.m);
      var mquery = new MountainQuery();
      mquery.byId(req.query.m, function(mtns) {
        var weatherStn = mtns[0].weatherStation;
        console.log(weatherStn);
        // var wquery = new WeatherQuery();
        // wquery.get(function(data) {
        //   res.json( { weather: data } );
        // });
      })

    }


  });
}

module.exports = WeatherApi;
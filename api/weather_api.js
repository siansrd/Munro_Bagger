var MountainQuery = require('../db/mountain_query');
var WeatherQuery = require('../db/weather_query');
var WeatherCall = require("./weather_call");

var thirtyMinutes = 30 * 60 * 1000;

var expired = function(time){
  var dif = Date.now() - time;
  return ( dif > thirtyMinutes )
};

var WeatherApi = function(app) {
  //weather
  //req.params - holds lat & lng for location search
  app.get('/api/weather', function(req, res) {
    if (req.query.m) {
      // req.query.m is a string
      var mquery = new MountainQuery();
      mquery.oneById(req.query.m, function(mtn) {
        if (mtn) {
          // console.log(mtn);
          var weatherStn = mtn.weatherStation;
          // console.log(weatherStn);
          var wquery = new WeatherQuery();
          wquery.getCachedForecast(weatherStn, function(weather) {
            // res.json( { weather: data } );
            if(weather && !expired(weather.timeOfRequest)){
              //work out data to be returned
            }
            else{
              
            }
            // Date.now()
          });
        }
        else {
          console.log("No mountains returned");
        }
      })
    }
  });
}

module.exports = WeatherApi;

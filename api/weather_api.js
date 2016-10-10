var MountainQuery = require('../db/mountain_query');
var WeatherQuery = require('../db/weather_query');
var apiKey = require("./weather_api_key");

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

var makeRequest = function(url, callback) {
 var request = new XMLHttpRequest()
 request.open("GET", url);
 request.onload = function() {
   if (this.status !== 200) return;
   var jsonString = this.responseText;
   var results = JSON.parse(jsonString);
   callback(results);
 };
 request.send();
}

var thirtyMins = 30 * 60 * 1000;

var expired = function(time){
  var dif = Date.now() - time;
  return ( dif > thirtyMins );
};

var urlGenerator = function(latLng){
  var lat = latLng.lat;
  var lng = latLng.lng;
  var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lng + "&appid=" + apiKey;
  return url;
};

var filterWeather = function(forecast) {

}

var WeatherApi = function(app) {
  //weather
  //req.params - holds lat & lng for location search
  app.get('/api/weather', function(req, res) {
    if (req.query.m) {
      // req.query.m is a string
      var mquery = new MountainQuery();
      mquery.oneById(req.query.m, function(mtn) {
        if (mtn) {
          var weatherStn = mtn.weatherStation;
          var wquery = new WeatherQuery();
          wquery.getCachedForecast(weatherStn, function(cachedForecast) {
            if (cachedForecast && !expired(cachedForecast.timeOfRequest)){
              // return cachedForecast.forecast;
              console.log("returning the cached version");
              res.json(cachedForecast.forecast);
            }
            else {
              makeRequest(urlGenerator(weatherStn.latLng), function(newForecast) {
                // got the weather back
                // now save it
                var wquery = new WeatherQuery();
                wquery.cacheForecast(weatherStn.id, newForecast, function() {
                  res.json(newForecast);
                });
              })
            }
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

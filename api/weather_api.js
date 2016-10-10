var MountainQuery = require('../db/mountain_query');
var WeatherQuery = require('../db/weather_query');
var ForecastTime = require('../client/src/models/forecast_time')
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var apiKey = require("./weather_api_key");

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

// var filterWeather = function(forecast) {
//   // this is the weather for now
//   // really need the forecasts for now, tomorrow and the day after
//   return {
//     weather: {
//       id: forecast.list[0].weather[0].id,
//       description: forecast.list[0].weather[0].description,
//       main: forecast.list[0].weather[0].main,
//       temperature: forecast.list[0].main.temp - 273.15,
//       wind: {
//         speed: forecast.list[0].wind.speed,
//         direction: forecast.list[0].wind.deg
//       }
//     }
//   }
// }

var filterWeather = function(forecast) {
  // this is the weather for now
  // really need the forecasts for now, tomorrow and the day after
  return {
    dt: forecast.dt,
    dt_txt: forecast.dt_txt,
    id: forecast.weather[0].id,
    description: forecast.weather[0].description,
    main: forecast.weather[0].main,
    temperature: forecast.main.temp - 273.15,
    wind: {
      speed: forecast.wind.speed,
      direction: forecast.wind.deg
    }
  }
}

var buildWeather = function(forecasts) {
  var weathers = [];
  weathers.push(filterWeather(forecasts.list[0]));

  var t = new ForecastTime();

  var targetT = t.midTomorrow();
  var weather = forecasts.list.find(function(forecast){
    return forecast.dt === targetT;
  });
  weathers.push(filterWeather(weather));

  targetT = t.midDayAfter();
  var weather = forecasts.list.find(function(forecast){
    return forecast.dt === targetT;
  });
  weathers.push(filterWeather(weather));

  return weathers;
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
              res.json(buildWeather(cachedForecast.forecast));
            }
            else {
              // Don't have a valid cached entry so need to get the weather
              makeRequest(urlGenerator(weatherStn.latLng), function(newForecast) {
                // got the weather back
                // now save it
                var wquery = new WeatherQuery();
                wquery.cacheForecast(weatherStn.id, newForecast, function() {
                  res.json(buildWeather(newForecast));
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

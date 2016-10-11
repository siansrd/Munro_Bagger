var MountainQuery = require('../db/mountain_query');
var WeatherQuery = require('../db/weather_query');
var ForecastTime = require('../client/src/models/forecast_time')
var makeRequest = require('./utility').makeRequest;
var apiKey = require("./weather_api_key");
var thirtyMins = 30 * 60 * 1000;
var DEBUG = true;

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

var filterForecast = function(forecast) {
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

var buildForecast = function(fullForecast) {

  var forecastFor = function(targetT) {
    var forecast = fullForecast.list.find(function(item){
      return item.dt === targetT;
    });
    return filterForecast(forecast);
  }

  var forecasts = [];
  var t = new ForecastTime();
  forecasts.push(filterForecast(fullForecast.list[0]));
  forecasts.push(forecastFor(t.midTomorrow()));
  forecasts.push(forecastFor(t.midDayAfter()));

  return forecasts;
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
          if (DEBUG) console.log("Getting weather for \"" + mtn.name + "\" (" + mtn.id + ")");
          var weatherStn = mtn.weatherStation;
          if (DEBUG) console.log("Using the weather station at", weatherStn.name);
          var wquery = new WeatherQuery();
          wquery.getCachedForecast(weatherStn, function(cachedForecast) {
            if (cachedForecast && !expired(cachedForecast.timeOfRequest)){
              // return cachedForecast.forecast;
              if (DEBUG) console.log("Using cached forecast. Timestamped",
                new Date(cachedForecast.timeOfRequest).toString());
              res.json(buildForecast(cachedForecast.forecast));
            }
            else {
              // Don't have a valid cached entry so need to get the weather
              if (DEBUG && cachedForecast) console.log("Cached forecast expired. Timestamped",
                new Date(cachedForecast.timeOfRequest).toString());
              makeRequest(urlGenerator(weatherStn.latLng), function(newForecast) {
                // got the weather back
                // now save it
                if (DEBUG) console.log("Received updated forecast.");
                if (DEBUG && cachedForecast) console.log("Must overwrite existing cache entry.");
                var wquery = new WeatherQuery();
                wquery.cacheForecast(weatherStn.id, newForecast, function() {
                  res.json(buildForecast(newForecast));
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

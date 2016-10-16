var WeatherStore = require('./weather_store')
var ForecastTime = require('../client/src/models/forecast_time')
var makeRequest = require('./utility').makeRequest;
var mountainSearch = require('./utility').mountainSearch;
var mountainObj = require('./mountains');
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
  var weatherStore = new WeatherStore();

  if (DEBUG) console.log("********** Weather API starting **********");
  app.get('/api/weather', function(req, res) {
    if (req.query.m) {
      // req.query.m is a string
      var mtn = mountainSearch(mountainObj.mountains, req.query.m);
      if (mtn) {
        if (DEBUG) console.log("Getting weather for \"" + mtn.name + "\" (" + mtn.id + ")");
        var weatherStn = mtn.station;
        if (DEBUG) console.log("Using the weather station at", weatherStn.name);
        var cachedForecast = weatherStore.getCachedForecast(weatherStn);
        if (cachedForecast && !expired(cachedForecast.timeOfRequest)){
          // return cachedForecast.forecast;
          if (DEBUG) console.log("Using cached forecast for",  weatherStn.name + ": Timestamped",
            new Date(cachedForecast.timeOfRequest).toString());
          res.json(buildForecast(cachedForecast.forecast));
        }
        else {
          // Don't have a valid cached entry so need to get the weather
          // Need to deal with the situation where the required weather has already been requested
          if (DEBUG && cachedForecast) console.log("Cached forecast for",  weatherStn.name,
              "expired: Timestamped", new Date(cachedForecast.timeOfRequest).toString());
          makeRequest(urlGenerator(weatherStn.latLng), function(newForecast) {
            // got the weather back
            // now save it
            if (DEBUG) console.log("Received updated forecast for", weatherStn.name);
            if (DEBUG) console.log("Saving to Cache");
            if (DEBUG && cachedForecast) console.log("Must overwrite existing cache entry");
            weatherStore.cacheForecast(weatherStn, newForecast);
            res.json(buildForecast(newForecast));
          })
        }
      }
      else {
        console.log("No mountains returned");
      }
    }
  });
}

module.exports = WeatherApi;

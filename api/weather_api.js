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

var existingRequest = function(weatherStn, requests) {
  for (var c = 0; c < requests.length; c++) {
    if (requests[c].station.id === weatherStn.id) {
      // already have a request outstanding to this destination
      return requests[c];
    }
  }
  return undefined;
}

var WeatherApi = function(app) {
  var weatherStore = new WeatherStore();
  var requests = [];

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
          if (DEBUG && cachedForecast) console.log("Cached forecast for",  weatherStn.name,
              "expired: Timestamped", new Date(cachedForecast.timeOfRequest).toString());
          var request = existingRequest(weatherStn, requests);
          if (request) {
            // a request is outstanding so resgister interest in the response
            request.responses.push(res);
            if (DEBUG) console.log("There are", request.responses.length, "requests outstanding for", weatherStn.name);
          }
          else {
            // No request has been made to this weatherstation yet so make it now
            requests.push({ station: weatherStn, responses: [res] });
            makeRequest(urlGenerator(weatherStn.latLng), function(newForecast) {
              // got the weather back
              // now save it
              if (DEBUG) console.log("Received updated forecast for", weatherStn.name);
              if (DEBUG && cachedForecast) console.log("Must overwrite existing cache entry for", weatherStn.name);
              weatherStore.cacheForecast(weatherStn, newForecast);
              var forecast = buildForecast(newForecast);
              for (var c = 0; c < requests.length; c++) {
                if (requests[c].station.id === weatherStn.id) {
                  if (DEBUG) console.log("Replying to", requests[c].responses.length, "requests for", weatherStn.name);
                  for (var res of requests[c].responses) {
                    // reply to all the requests to the same weather station
                    res.json(forecast);
                  }
                  // delete the record of the request
                  requests.splice(c, 1)
                }
              }
            })
          }
        }
      }
      else {
        console.log("No mountains returned");
      }
    }
  });
}

module.exports = WeatherApi;

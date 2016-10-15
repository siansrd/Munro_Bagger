var fs = require('fs');

var findCachedForecast = function(id, forecasts) {
  //if (forecasts.length === 0) return -1;
  for (var i = 0; i < forecasts.length; i++) {
    if (forecasts[i]._id === id) return i;
  }
  return -1;
}

var WeatherStore = function() {
  this._forecasts = []
  // read cache from file
}

WeatherStore.prototype.cacheForecast = function(weatherStation, forecast) {
  var doc = {
    _id: weatherStation.id,
    timeOfRequest: Date.now(),
    forecast: forecast
  };
  var index = findCachedForecast(weatherStation.id, this._forecasts);
  if (index < 0)
    this._forecasts.push(doc);
  else
    this._forecasts[index] = forecast;

  // write cache to file
}

WeatherStore.prototype.getCachedForecast = function(weatherStation) {
  var index = findCachedForecast(weatherStation.id, this._forecasts);
  if (index < 0) return undefined;
  return this._forecasts[index];
}

module.exports = WeatherStore;